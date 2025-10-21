export interface ExportButtonProps {
    className?: string;
    variant?: "primary" | "secondary";
    children?: React.ReactNode;
}

export interface ExportPanelProps {
    className?: string;
}

export interface ExportProgressOverlayProps {
    isVisible: boolean;
    progress?: number;
    message?: string;
    onComplete?: () => void;
}

export interface CustomCheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    id: string;
    className?: string;
}

export interface ExportCardProps {
    category: string;
    icon: string;
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

export interface ExportContainerProps {
    children: React.ReactNode;
    className?: string;
}

export interface ExportContentProps {
    children: React.ReactNode;
    className?: string;
}

export interface ExportGridProps {
    children: React.ReactNode;
    className?: string;
}

export interface ExportErrorProps {
    error: string;
    className?: string;
}

// Export Hook Types
export interface UseExportOptions {
    includeAssets?: boolean;
    includeMetadata?: boolean;
    format?: "json" | "ndjson";
}

export interface ExportState {
    isExporting: boolean;
    error: string | null;
    lastExport: string | null;
}
