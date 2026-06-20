/**
 * Career lineage graph — the data model behind the COMMIT HISTORY concept.
 * A deterministic, laid-out DAG derived from profile/education/experience/
 * skills/projects. No runtime physics: coordinates are computed once, so the
 * SVG is stable across SSR and client and stays accessible (real DOM nodes).
 */

export type GraphNodeKind = "origin" | "education" | "skill" | "role" | "project";

export type GraphEdgeKind = "lineage" | "skill" | "pipeline";

export interface GraphNode {
    id: string;
    kind: GraphNodeKind;
    label: string;
    sublabel?: string;
    /** Chronological build order — drives accretion + tab order. */
    step: number;
    /** Layout coordinate (viewBox units), node centre. */
    x: number;
    y: number;
    col: number;
    width: number;
    /** Project node -> its case study. */
    projectSlug?: string;
    /** Skill node -> its name (for the dependency filter). */
    skillName?: string;
    /** On the lit lineage path (the signature cascade). */
    onPath?: boolean;
}

export interface GraphEdge {
    id: string;
    from: string;
    to: string;
    kind: GraphEdgeKind;
    /** Precomputed SVG path "d" (cubic bezier). */
    d: string;
    /** Cascade order along the lit path. */
    step: number;
    onPath?: boolean;
}

export interface CareerGraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
    width: number;
    height: number;
    counts: { nodes: number; edges: number };
}
