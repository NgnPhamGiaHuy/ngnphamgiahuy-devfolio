import React from "react";

import type { ArchitectureEdge, ArchitectureNode } from "@/schemas";

interface ArchitectureDiagramProps {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
}

const LAYER_ORDER: ArchitectureNode["layer"][] = [
    "source",
    "ingest",
    "storage",
    "transform",
    "consumption",
];

const LAYER_COLOR: Record<ArchitectureNode["layer"], string> = {
    source: "var(--layer-source)",
    ingest: "var(--layer-ingest)",
    storage: "var(--layer-storage)",
    transform: "var(--layer-transform)",
    consumption: "var(--layer-consumption)",
};

const VIEW_W = 680;
const NODE_W = 122;
const NODE_H = 40;

/**
 * ArchitectureDiagram — renders a project's typed architecture as a layered
 * left-to-right SVG (source -> consumption), colour-coded by layer. Pure,
 * deterministic, accessible (text in DOM). The packet/draw flourish is CSS,
 * reusing the graph cascade keyframes, so it degrades to a static diagram.
 */
const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
    nodes,
    edges,
}) => {
    if (!nodes.length) return null;

    const layersUsed = LAYER_ORDER.filter((l) =>
        nodes.some((n) => n.layer === l)
    );
    const colCount = Math.max(1, layersUsed.length);
    const colW = VIEW_W / colCount;

    const perLayer = new Map<string, ArchitectureNode[]>();
    nodes.forEach((n) => {
        if (!perLayer.has(n.layer)) perLayer.set(n.layer, []);
        perLayer.get(n.layer)!.push(n);
    });

    const maxRows = Math.max(...layersUsed.map((l) => perLayer.get(l)!.length));
    const rowH = 70;
    const height = Math.max(140, maxRows * rowH + 40);

    const pos = new Map<string, { x: number; y: number }>();
    layersUsed.forEach((layer, ci) => {
        const list = perLayer.get(layer)!;
        const cx = ci * colW + colW / 2;
        list.forEach((n, ri) => {
            const top = 36;
            const bottom = height - 24;
            const y =
                list.length === 1
                    ? (top + bottom) / 2
                    : top + (ri * (bottom - top)) / (list.length - 1);
            pos.set(n.id, { x: cx, y });
        });
    });

    const edgePath = (from: string, to: string): string | null => {
        const a = pos.get(from);
        const b = pos.get(to);
        if (!a || !b) return null;
        const x1 = a.x + NODE_W / 2;
        const x2 = b.x - NODE_W / 2;
        const cx = (x1 + x2) / 2;
        return `M ${x1} ${a.y} C ${cx} ${a.y} ${cx} ${b.y} ${x2} ${b.y}`;
    };

    return (
        <div className="career-graph" data-animate="true">
            <svg
                className="career-graph__svg"
                viewBox={`0 0 ${VIEW_W} ${height}`}
                role="img"
                aria-label="Architecture diagram showing data flow from source to consumption"
            >
                {layersUsed.map((layer, ci) => (
                    <text
                        key={`hdr-${layer}`}
                        x={ci * colW + colW / 2}
                        y={18}
                        textAnchor="middle"
                        className="graph-node__sub arch-node arch-column-header"
                        fontSize={9}
                    >
                        {layer}
                    </text>
                ))}

                <g>
                    {edges.map((e, i) => {
                        const d = edgePath(e.from, e.to);
                        if (!d) return null;
                        return (
                            <path
                                key={`${e.from}-${e.to}-${i}`}
                                d={d}
                                pathLength={1}
                                className="graph-edge graph-edge--lit"
                                style={{ animationDelay: `${i * 0.18}s` }}
                                aria-hidden="true"
                            />
                        );
                    })}
                </g>

                <g>
                    {nodes.map((n, i) => {
                        const p = pos.get(n.id)!;
                        const color = LAYER_COLOR[n.layer];
                        return (
                            <g
                                key={n.id}
                                className="graph-node"
                                style={{ animationDelay: `${i * 0.05}s` }}
                            >
                                <rect
                                    x={p.x - NODE_W / 2}
                                    y={p.y - NODE_H / 2}
                                    width={NODE_W}
                                    height={NODE_H}
                                    rx={7}
                                    fill="var(--graph-surface)"
                                    stroke={color}
                                    strokeWidth={1.5}
                                />
                                <text
                                    x={p.x}
                                    y={p.y + 1}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="graph-node__label"
                                    fontSize={11}
                                    fontWeight={500}
                                >
                                    {n.label.length > 16
                                        ? `${n.label.slice(0, 15)}…`
                                        : n.label}
                                </text>
                                <title>{`${n.label} (${n.layer})`}</title>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

ArchitectureDiagram.displayName = "ArchitectureDiagram";

export default ArchitectureDiagram;
