import React from "react";

import type { TableValue } from "@/types/portable-text.types";

// ============================================================
// Component: TableBlock
// Purpose: Renders a responsive, accessible table from Portable Text value
// ============================================================

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "pt-table-block",
    table: "pt-table",
} as const;

// ============================================================
// Types
// ============================================================
interface TableBlockProps {
    value: TableValue;
}

// ============================================================
// Helpers
// ============================================================
const getCellText = (cell: any): React.ReactNode => {
    if (cell == null) return null;
    if (typeof cell === "string") return cell;
    // @sanity/table stores cells as portable text arrays
    if (Array.isArray(cell)) {
        return cell
            .map((block: any) =>
                Array.isArray(block?.children)
                    ? block.children.map((c: any) => c?.text).join("")
                    : ""
            )
            .join(" ");
    }
    return String(cell);
};

// ============================================================
// Component Definition
// ============================================================
/**
 * TableBlock renders a horizontally scrollable table with optional headers
 * from a Sanity Portable Text table value. Typography aligns with prose styles.
 *
 * @param props - Component props
 * @param props.value - Table value containing headers and row cells
 * @returns JSX.Element | null - Rendered table or null when no data
 */
const TableBlock: React.FC<TableBlockProps> = ({ value }) => {
    const headers = (value as any)?.headers || [];
    const rows = (value as any)?.rows || [];

    if (!headers.length && !rows.length) return null;

    return (
        <div
            className="my-[28px] w-full overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
            data-testid={TEST_IDS.root}
        >
            <table
                className="min-w-full border-collapse text-[15px] leading-[1.7]"
                data-testid={TEST_IDS.table}
            >
                {headers.length > 0 && (
                    <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
                            {headers.map((h: string, idx: number) => (
                                <th
                                    key={`${h}-${idx}`}
                                    scope="col"
                                    className="text-left font-medium text-neutral-900 dark:text-neutral-100 px-4 py-2.5 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows.map((row: any, rIdx: number) => (
                        <tr
                            key={`row-${rIdx}`}
                            className="border-b last:border-b-0 border-neutral-200 dark:border-neutral-800"
                        >
                            {(row?.cells || []).map(
                                (cell: any, cIdx: number) => (
                                    <td
                                        key={`cell-${rIdx}-${cIdx}`}
                                        className="align-top px-4 py-2.5 text-neutral-800 dark:text-neutral-200"
                                    >
                                        {getCellText(cell)}
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// ============================================================
// Export
// ============================================================
export default TableBlock;

// DX: Explicit display name for clearer React DevTools identification
TableBlock.displayName = "TableBlock";
