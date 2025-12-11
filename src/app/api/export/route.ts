import { NextRequest, NextResponse } from "next/server";

import type { ExportContentType, ExportOptions } from "@/shared";

import { exportContentType, exportPortfolioData } from "@/application";

const VALID_CONTENT_TYPES: ExportContentType[] = [
    "profile",
    "skills",
    "projects",
    "experience",
    "education",
    "services",
    "testimonials",
    "pricing",
    "blogs",
    "certificates",
    "settings",
] as const;

const DEFAULT_EXPORT_OPTIONS = {
    includeAssets: true,
    includeMetadata: true,
    format: "json" as const,
    contentTypes: ["all"] as string[],
} as const;

const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
} as const;

const ERROR_MESSAGES = {
    INVALID_CONTENT_TYPE: "Invalid content type",
    EXPORT_FAILED: "Failed to export data",
    UNKNOWN_ERROR: "Unknown error",
} as const;

interface ExportApiResponse {
    success: boolean;
    data?: any;
    contentType?: string;
    exportedAt?: string;
    error?: string;
    message?: string;
}

interface ExportQueryParams {
    type?: string;
    assets?: string;
    metadata?: string;
    format?: string;
}

interface ExportRequestBody {
    contentTypes?: string[];
    includeAssets?: boolean;
    includeMetadata?: boolean;
    format?: "json" | "ndjson";
}

const isValidContentType = (
    contentType: string
): contentType is ExportContentType => {
    return VALID_CONTENT_TYPES.includes(contentType as ExportContentType);
};

const parseQueryParams = (searchParams: URLSearchParams): ExportQueryParams => {
    return {
        type: searchParams.get("type") || undefined,
        assets: searchParams.get("assets") || undefined,
        metadata: searchParams.get("metadata") || undefined,
        format: searchParams.get("format") || undefined,
    };
};

const createErrorResponse = (
    message: string,
    status: number,
    details?: string
): NextResponse<ExportApiResponse> => {
    return NextResponse.json(
        {
            success: false,
            error: message,
            message: details || message,
        },
        { status }
    );
};

const createSuccessResponse = (
    data: any,
    contentType?: string
): NextResponse<ExportApiResponse> => {
    return NextResponse.json({
        success: true,
        data,
        contentType,
        exportedAt: new Date().toISOString(),
    });
};

export async function GET(
    request: NextRequest
): Promise<NextResponse<ExportApiResponse>> {
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = parseQueryParams(searchParams);

        const {
            type: contentType,
            assets,
            metadata,
            format = DEFAULT_EXPORT_OPTIONS.format,
        } = queryParams;

        const includeAssets = assets !== "false";
        const includeMetadata = metadata !== "false";

        if (contentType && contentType !== "all") {
            if (!isValidContentType(contentType)) {
                return createErrorResponse(
                    ERROR_MESSAGES.INVALID_CONTENT_TYPE,
                    HTTP_STATUS.BAD_REQUEST,
                    `Content type '${contentType}' is not supported`
                );
            }

            const data = await exportContentType(
                contentType as ExportContentType
            );
            return createSuccessResponse(data, contentType);
        }

        const contentTypes = contentType === "all" ? ["all"] : ["all"];
        const options: ExportOptions = {
            includeAssets,
            format: format as "json" | "ndjson",
            contentTypes,
            includeMetadata,
        };

        const exportedData = await exportPortfolioData(options);
        return createSuccessResponse(exportedData);
    } catch (error) {
        console.error("Export GET error:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : ERROR_MESSAGES.UNKNOWN_ERROR;

        return createErrorResponse(
            ERROR_MESSAGES.EXPORT_FAILED,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            errorMessage
        );
    }
}

export async function POST(
    request: NextRequest
): Promise<NextResponse<ExportApiResponse>> {
    try {
        const body: ExportRequestBody = await request.json();
        const {
            contentTypes = DEFAULT_EXPORT_OPTIONS.contentTypes,
            includeAssets = DEFAULT_EXPORT_OPTIONS.includeAssets,
            includeMetadata = DEFAULT_EXPORT_OPTIONS.includeMetadata,
            format = DEFAULT_EXPORT_OPTIONS.format,
        } = body;

        if (contentTypes && contentTypes.length > 0) {
            const invalidTypes = contentTypes.filter(
                (type) => type !== "all" && !isValidContentType(type)
            );

            if (invalidTypes.length > 0) {
                return createErrorResponse(
                    ERROR_MESSAGES.INVALID_CONTENT_TYPE,
                    HTTP_STATUS.BAD_REQUEST,
                    `Invalid content types: ${invalidTypes.join(", ")}`
                );
            }
        }

        const options: ExportOptions = {
            includeAssets,
            format,
            contentTypes: contentTypes || DEFAULT_EXPORT_OPTIONS.contentTypes,
            includeMetadata,
        };

        const exportedData = await exportPortfolioData(options);
        return createSuccessResponse(exportedData);
    } catch (error) {
        console.error("Export POST error:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : ERROR_MESSAGES.UNKNOWN_ERROR;

        return createErrorResponse(
            ERROR_MESSAGES.EXPORT_FAILED,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            errorMessage
        );
    }
}
