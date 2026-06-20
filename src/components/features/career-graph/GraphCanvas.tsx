"use client";

import clsx from "clsx";
import React from "react";
import { useInView } from "framer-motion";

import type { CareerGraphData, GraphNode } from "@/shared/types";

interface GraphCanvasProps {
    data: CareerGraphData;
    onSelectProject: (slug: string) => void;
}

const NODE_H = 44;

const KIND_LABEL: Record<GraphNode["kind"], string> = {
    origin: "origin",
    education: "education",
    skill: "skill",
    role: "role",
    project: "project",
};

const truncate = (label: string, width: number): string => {
    const max = Math.max(6, Math.floor((width - 18) / 7.2));
    return label.length > max ? `${label.slice(0, max - 1)}…` : label;
};

/**
 * GraphCanvas — the inline-SVG career lineage graph.
 *
 * SSR-rendered (a normal client component, so its markup ships in the initial
 * HTML). Project nodes are real <g role="button"> elements with a logical tab
 * order; decorative nodes are aria-hidden because their relationships are
 * exposed as text in the parent's screen-reader list. Highlight is one React
 * state change toggling CSS classes — no per-frame work.
 */
const GraphCanvas: React.FC<GraphCanvasProps> = ({ data, onSelectProject }) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    // Cascade fires when the graph is read, not on mount. SSR/no-JS shows the
    // fully-drawn static graph (data-animate stays "false" until in view).
    const inView = useInView(rootRef, { once: true, amount: 0.25 });

    const adjacency = React.useMemo(() => {
        const map = new Map<string, Set<string>>();
        const add = (a: string, b: string) => {
            if (!map.has(a)) map.set(a, new Set());
            map.get(a)!.add(b);
        };
        data.edges.forEach((e) => {
            add(e.from, e.to);
            add(e.to, e.from);
        });
        return map;
    }, [data.edges]);

    const activeSet = React.useMemo(() => {
        if (!activeId) return null;
        const seen = new Set<string>([activeId]);
        const queue = [activeId];
        while (queue.length) {
            const cur = queue.shift()!;
            adjacency.get(cur)?.forEach((n) => {
                if (!seen.has(n)) {
                    seen.add(n);
                    queue.push(n);
                }
            });
        }
        return seen;
    }, [activeId, adjacency]);

    const isNodeActive = (id: string) => !activeSet || activeSet.has(id);
    const isEdgeActive = (from: string, to: string) =>
        !activeSet || (activeSet.has(from) && activeSet.has(to));

    const renderNode = (node: GraphNode) => {
        const interactive = node.kind === "project" && !!node.projectSlug;
        const w = node.width;
        const x = node.x - w / 2;
        const y = node.y - NODE_H / 2;

        const handlers = interactive
            ? {
                  role: "button",
                  tabIndex: 0,
                  "aria-label": `${node.label} — ${node.sublabel ?? "project"}. Open case study.`,
                  "data-interactive": "true",
                  onClick: () => onSelectProject(node.projectSlug!),
                  onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectProject(node.projectSlug!);
                      }
                  },
                  onFocus: () => setActiveId(node.id),
                  onBlur: () => setActiveId(null),
              }
            : { "aria-hidden": true as const };

        return (
            <g
                key={node.id}
                className={clsx(
                    "graph-node",
                    node.kind === "origin" && "graph-node--origin",
                    node.onPath && "graph-node--lit",
                    isNodeActive(node.id) && "is-active"
                )}
                style={{ animationDelay: `${node.step * 0.06}s` }}
                onMouseEnter={() => setActiveId(node.id)}
                {...handlers}
            >
                <rect
                    x={x}
                    y={y}
                    width={w}
                    height={NODE_H}
                    rx={8}
                    className="graph-node__box"
                />
                <text
                    x={node.x}
                    y={node.sublabel ? node.y - 3 : node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="graph-node__label"
                    fontSize={14}
                    fontWeight={500}
                >
                    {truncate(node.label, w)}
                </text>
                {node.sublabel && (
                    <text
                        x={node.x}
                        y={node.y + 13}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="graph-node__sub"
                        fontSize={10}
                    >
                        {truncate(node.sublabel, w)}
                    </text>
                )}
                <title>{`${node.label}${node.sublabel ? ` (${node.sublabel})` : ""}`}</title>
            </g>
        );
    };

    return (
        <div
            ref={rootRef}
            className="career-graph"
            data-animate={inView ? "true" : "false"}
            data-focus={activeId ? "true" : "false"}
            onMouseLeave={() => setActiveId(null)}
        >
            <svg
                className="career-graph__svg"
                viewBox={`0 0 ${data.width} ${data.height}`}
                role="group"
                aria-label="Interactive career lineage graph: education and skills feeding roles and projects. Use the project buttons to open a case study."
            >
                <g>
                    {data.edges.map((edge) => (
                        <path
                            key={edge.id}
                            d={edge.d}
                            pathLength={edge.onPath ? 1 : undefined}
                            className={clsx(
                                "graph-edge",
                                edge.onPath && "graph-edge--lit",
                                edge.kind === "pipeline" && "graph-edge--pipeline",
                                isEdgeActive(edge.from, edge.to) && "is-active"
                            )}
                            style={{
                                animationDelay: `${
                                    edge.onPath ? edge.step * 0.18 : 0.2
                                }s`,
                            }}
                            aria-hidden="true"
                        />
                    ))}
                </g>
                <g>{data.nodes.map(renderNode)}</g>
            </svg>

            {/* Mobile: a first-class vertical spine — the landscape SVG can't
                shrink to a phone, so the same nodes stack as a tappable timeline. */}
            <ol className="career-spine" aria-label="Career timeline">
                {[...data.nodes]
                    .sort((a, b) => a.step - b.step)
                    .map((node, i, arr) => {
                        const interactive =
                            node.kind === "project" && !!node.projectSlug;
                        return (
                            <li
                                key={node.id}
                                className="relative pb-6 pl-7 last:pb-0"
                            >
                                {i < arr.length - 1 && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute left-[5px] top-3 -bottom-1 w-px"
                                        style={{ background: "var(--graph-line)" }}
                                    />
                                )}
                                <span
                                    aria-hidden="true"
                                    className="absolute left-0 top-1.5 size-2.5 rounded-full border"
                                    style={{
                                        borderColor: node.onPath
                                            ? "var(--graph-accent)"
                                            : "var(--graph-line)",
                                        background: node.onPath
                                            ? "var(--graph-accent)"
                                            : "var(--graph-surface)",
                                    }}
                                />
                                <p className="eyebrow mb-1">
                                    {KIND_LABEL[node.kind]}
                                </p>
                                {interactive ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onSelectProject(node.projectSlug!)
                                        }
                                        className="text-left font-medium underline-offset-2 hover:underline"
                                    >
                                        {node.label}
                                    </button>
                                ) : (
                                    <p className="font-medium">{node.label}</p>
                                )}
                                {node.sublabel && (
                                    <p className="text-sm text-[color:var(--graph-muted)]">
                                        {node.sublabel}
                                    </p>
                                )}
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
};

GraphCanvas.displayName = "GraphCanvas";

export default GraphCanvas;
