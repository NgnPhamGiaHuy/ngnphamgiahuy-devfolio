import type {
    EducationType,
    ExperienceType,
    ProfileType,
    ProjectType,
    SkillType,
} from "@/schemas";
import type {
    CareerGraphData,
    GraphEdge,
    GraphNode,
} from "@/shared/types";
import { projectSlug } from "@/shared/utils/project";

/**
 * buildCareerGraph — deterministic DAG layout for the COMMIT HISTORY section.
 *
 * Edge discipline (the main change from v1):
 *  - role → primary project only (not all projects — avoids the 7-line fan)
 *  - skill → project: at most 1 edge per project, from the most *distinctive*
 *    skill (lowest cross-project frequency).  Common skills (API Design in 5/7
 *    projects) add noise without information; they're visible in SkillsDependency.
 *  - Projects are Y-sorted by primary-skill position so all skill edges travel
 *    in the same direction (horizontal or downward).  This gives ≈0 crossings.
 *  - Fallback: a project with zero skill edges gets a lineage edge from role so
 *    no node is ever visually stranded.
 */

const VIEW_WIDTH = 1120;
const NODE_HEIGHT = 44;
const HALF_H = NODE_HEIGHT / 2;
const BAND_TOP = 96;
const ROW_HEIGHT = 96;

// Column order: origin → education → role → skill → project.
// Roles precede skills because the career narrative reads as
// "studied → got a role → applied skills → shipped projects."
// Skill edges now go to the adjacent column (col3→col4), eliminating
// the crossing that occurred when skills sat between education and roles.
const COLUMNS: Record<
    Exclude<GraphNode["kind"], never>,
    { x: number; width: number; col: number }
> = {
    origin:    { x: 90,  width: 148, col: 0 },
    education: { x: 295, width: 175, col: 1 },
    role:      { x: 508, width: 168, col: 2 },
    skill:     { x: 718, width: 148, col: 3 },
    project:   { x: 950, width: 210, col: 4 },
};

const CAPS = { education: 3, skill: 8, role: 4, project: 8 };

const distribute = (count: number, top: number, bottom: number): number[] => {
    if (count <= 0) return [];
    if (count === 1) return [(top + bottom) / 2];
    const step = (bottom - top) / (count - 1);
    return Array.from({ length: count }, (_, i) => top + i * step);
};

/**
 * Cubic bezier between two nodes.
 * For cross-column edges the "arm" length scales with column distance so
 * the S-bend is centred in the gap rather than fanning at the node faces.
 * Longer arms = less crossing when many edges share the same X corridor.
 */
const edgePath = (from: GraphNode, to: GraphNode): string => {
    if (from.col === to.col) {
        const x  = from.x;
        const y1 = from.y + HALF_H;
        const y2 = to.y   - HALF_H;
        const cy = (y1 + y2) / 2;
        return `M ${x} ${y1} C ${x + 36} ${cy} ${x + 36} ${cy} ${x} ${y2}`;
    }
    const x1   = from.x + from.width / 2;
    const x2   = to.x   - to.width  / 2;
    const span = x2 - x1;
    const colDiff = Math.abs(to.col - from.col);
    // Single-column gap: 38% arm  |  Two-column gap: 44% arm
    // Floor at 28px so short adjacent edges still curve visibly.
    const arm = Math.max(28, span * (colDiff === 1 ? 0.38 : 0.44));
    return `M ${x1} ${from.y} C ${x1 + arm} ${from.y} ${x2 - arm} ${to.y} ${x2} ${to.y}`;
};

export const buildCareerGraph = (input: {
    profile?:    ProfileType   | null;
    education?:  EducationType[] | null;
    experience?: ExperienceType[] | null;
    skills?:     SkillType[]   | null;
    projects?:   ProjectType[] | null;
}): CareerGraphData => {
    const education  = (input.education  ?? []).slice(0, CAPS.education);
    const experience = (input.experience ?? []).slice(0, CAPS.role);
    const skills     = (input.skills     ?? []).slice(0, CAPS.skill);
    // Featured projects first, then by authored order — so the lit path always
    // lands on the most prominent work regardless of CMS insertion order.
    const rawProjects = [...(input.projects ?? [])]
        .sort((a, b) => {
            if (!!b.featured !== !!a.featured) return a.featured ? -1 : 1;
            return (a.order ?? 99) - (b.order ?? 99);
        })
        .slice(0, CAPS.project);

    const maxRows = Math.max(1, education.length, skills.length, experience.length, rawProjects.length);
    const height     = Math.max(480, maxRows * ROW_HEIGHT + 150);
    const bandBottom = height - 84;

    // ── Skill Y positions (computed first; used for project sorting) ─────────
    const skillY = distribute(skills.length, BAND_TOP, bandBottom);
    const skillYByName = new Map<string, number>();
    skills.forEach((s, i) => skillYByName.set(s.name.toLowerCase(), skillY[i]));

    // How often each skill appears across all projects (lower = more distinctive)
    const skillFreq = new Map<string, number>();
    rawProjects.forEach((p) =>
        (p.technologies ?? []).forEach((t) => {
            const k = t.toLowerCase();
            skillFreq.set(k, (skillFreq.get(k) ?? 0) + 1);
        })
    );

    /**
     * Sort projects so that Y-positions align with their primary (most
     * distinctive) skill's Y-position.  When skill nodes and their project
     * targets share approximately the same vertical band the edges travel
     * horizontally or downward — eliminating the crossing web.
     */
    const withMeta = rawProjects.map((p, origIdx) => {
        let bestY    = Infinity;
        let bestFreq = Infinity;
        (p.technologies ?? []).forEach((t) => {
            const k    = t.toLowerCase();
            const freq = skillFreq.get(k) ?? 1;
            const y    = skillYByName.get(k);
            if (y !== undefined && freq < bestFreq) { bestFreq = freq; bestY = y; }
        });
        return { p, origIdx, bestY };
    });
    // Sort by primary-skill Y (top → bottom); no featured-first exception so
    // the visual alignment is geometrically correct.
    withMeta.sort((a, b) =>
        a.bestY !== Infinity && b.bestY !== Infinity
            ? a.bestY - b.bestY
            : a.origIdx - b.origIdx
    );
    const projects = withMeta.map((d) => d.p);

    // ── Build nodes ───────────────────────────────────────────────────────────
    const nodes: GraphNode[] = [];
    let step = 0;

    const origin: GraphNode = {
        id: "origin", kind: "origin",
        label: "student", sublabel: "IT graduate",
        step: step++,
        x: COLUMNS.origin.x, y: (BAND_TOP + bandBottom) / 2,
        col: 0, width: COLUMNS.origin.width,
    };
    nodes.push(origin);

    const eduY   = distribute(education.length,  BAND_TOP, bandBottom);
    const eduNodes = education.map((e, i) => {
        const node: GraphNode = {
            id: e._id || `edu-${i}`, kind: "education",
            label: e.degree, sublabel: e.year,
            step: step++, x: COLUMNS.education.x, y: eduY[i],
            col: 1, width: COLUMNS.education.width,
        };
        nodes.push(node); return node;
    });

    const skillNodes = skills.map((s, i) => {
        const node: GraphNode = {
            id: s._id || `skill-${i}`, kind: "skill",
            label: s.name, sublabel: s.category,
            step: step++, x: COLUMNS.skill.x, y: skillY[i],
            col: 3, width: COLUMNS.skill.width, skillName: s.name,
        };
        nodes.push(node); return node;
    });

    const roleY   = distribute(experience.length, BAND_TOP, bandBottom);
    const roleNodes = experience.map((r, i) => {
        const node: GraphNode = {
            id: r._id || `role-${i}`, kind: "role",
            label: r.title, sublabel: r.year || r.company,
            step: step++, x: COLUMNS.role.x, y: roleY[i],
            col: 2, width: COLUMNS.role.width,
        };
        nodes.push(node); return node;
    });

    const projectY = distribute(projects.length, BAND_TOP, bandBottom);
    const slugById = new Map<string, string>();
    const projectNodes = projects.map((p, i) => {
        const slug = projectSlug(p, withMeta[i].origIdx);
        const node: GraphNode = {
            id: `proj-${slug}`, kind: "project",
            label: p.name, sublabel: p.category,
            step: step++, x: COLUMNS.project.x, y: projectY[i],
            col: 4, width: COLUMNS.project.width, projectSlug: slug,
        };
        slugById.set(slug, node.id); nodes.push(node); return node;
    });

    // ── Edges ─────────────────────────────────────────────────────────────────
    const edges: GraphEdge[] = [];
    const byId = new Map(nodes.map((n) => [n.id, n] as const));
    const push = (from: GraphNode, to: GraphNode, kind: GraphEdge["kind"]) =>
        edges.push({
            id: `${from.id}->${to.id}`,
            from: from.id, to: to.id, kind,
            d: edgePath(from, to), step: 0,
        });

    const primaryEdu  = eduNodes[0];
    const primaryRole = roleNodes[0];
    const projectParent = primaryRole ?? primaryEdu ?? origin;

    // ── Primary skill bridge ─────────────────────────────────────────────────
    // Pre-computed as const (not let + closure) so TypeScript CFA can infer
    // GraphNode | null without narrowing to 'never' at use sites.
    // Finds the rarest skill shared between skill nodes and project[0]'s
    // technologies — identical ranking to what the per-project forEach uses.
    const primaryProjTechs = new Set(
        (projects[0]?.technologies ?? []).map((t) => t.toLowerCase())
    );
    const primaryRouteSkill =
        skillNodes
            .filter((sn) => sn.skillName && primaryProjTechs.has(sn.skillName.toLowerCase()))
            .sort((a, b) => {
                const fa = skillFreq.get(a.skillName!.toLowerCase()) ?? 1;
                const fb = skillFreq.get(b.skillName!.toLowerCase()) ?? 1;
                return fa - fb;
            })[0] ?? null;

    // Lineage spine: origin → education → role
    eduNodes.forEach((e) => push(origin, e, "lineage"));
    if (roleNodes.length) {
        if (primaryEdu) roleNodes.forEach((r) => push(primaryEdu, r, "lineage"));
        else roleNodes.forEach((r) => push(origin, r, "lineage"));
    }

    // Lineage spine → project.
    // When a skill bridges the primary project, route through it:
    //   role (col 2) → skill (col 3) → project (col 4)   ← single-column hops, no crossing
    // The skill→project[0] edge is added in the loop below; onPath is set via
    // pathNodeIds so it lights up automatically — no second edge needed here.
    if (primaryRouteSkill) {
        push(projectParent, primaryRouteSkill, "lineage");
    } else {
        push(projectParent, projectNodes[0], "lineage");
    }

    // ── Skill → project edges ─────────────────────────────────────────────────
    // "Most distinctive" = lowest cross-project frequency.
    const hasSkillEdge = new Set<string>();
    projects.forEach((p, i) => {
        const sorted = (p.technologies ?? [])
            .map((t) => ({ t, freq: skillFreq.get(t.toLowerCase()) ?? 1 }))
            .sort((a, b) => a.freq - b.freq);

        const target = projectNodes[i];
        for (const { t } of sorted) {
            const sn = skillNodes.find(
                (s) => s.skillName?.toLowerCase() === t.toLowerCase()
            );
            if (sn) { push(sn, target, "skill"); hasSkillEdge.add(target.id); break; }
        }
    });

    // Fallback: any project that has no skill edge gets a lineage edge from role
    // so it's never visually stranded (covers projects with no technologies[]).
    projectNodes.forEach((pn, i) => {
        if (i > 0 && !hasSkillEdge.has(pn.id)) {
            push(projectParent, pn, "lineage");
        }
    });

    // Pipeline edges between projects (authored dependsOn[] only)
    projects.forEach((p, i) => {
        (p.dependsOn ?? []).forEach((dep) => {
            const fromId = slugById.get(dep);
            if (fromId && byId.get(fromId)) push(byId.get(fromId)!, projectNodes[i], "pipeline");
        });
    });

    // ── Lit lineage path ──────────────────────────────────────────────────────
    // Primary project = first in sorted order (skill-aligned top of graph).
    const primaryProjectNode = projectNodes[0];
    const pathNodeIds = new Set<string>(["origin"]);
    if (primaryEdu)         pathNodeIds.add(primaryEdu.id);
    if (primaryRole)        pathNodeIds.add(primaryRole.id);
    if (primaryRouteSkill)  pathNodeIds.add(primaryRouteSkill.id);
    pathNodeIds.add(primaryProjectNode.id);

    // All skills feeding the primary project join the lit subgraph (they get
    // lit arrows into project[0] without the spine highlight).
    // primaryProjTechs is already computed above — no duplicate Set needed.
    skillNodes.forEach((sn) => {
        if (sn.skillName && primaryProjTechs.has(sn.skillName.toLowerCase()))
            pathNodeIds.add(sn.id);
    });

    nodes.forEach((n) => { if (pathNodeIds.has(n.id)) n.onPath = true; });

    // spineOrder drives the draw-animation cascade: each entry is one step.
    // primaryRouteSkill at index 3 ensures role→skill animates at step 2
    // and skill→project animates at step 3 (sequential, no gap).
    const spineOrder = [
        "origin",
        primaryEdu?.id,
        primaryRole?.id,
        primaryRouteSkill?.id,
    ].filter(Boolean) as string[];
    let cascade = 0;
    edges.forEach((e) => {
        const onPath = pathNodeIds.has(e.from) && pathNodeIds.has(e.to);
        e.onPath = onPath;
        if (onPath) {
            const spineIdx = spineOrder.indexOf(e.from);
            e.step = spineIdx >= 0 ? spineIdx : spineOrder.length + cascade++;
        } else {
            e.step = 99;
        }
    });

    // Drop disconnected skill nodes (no technologies[] authored yet)
    const connected = new Set<string>();
    edges.forEach((e) => { connected.add(e.from); connected.add(e.to); });
    const finalNodes = nodes.filter(
        (n) => n.kind !== "skill" || connected.has(n.id)
    );

    return {
        nodes: finalNodes, edges,
        width: VIEW_WIDTH, height,
        counts: { nodes: finalNodes.length, edges: edges.length },
    };
};

export default buildCareerGraph;
