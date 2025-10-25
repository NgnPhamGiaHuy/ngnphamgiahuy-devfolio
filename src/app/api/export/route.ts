// ============================================================
// API Route: Export
// Purpose: Data export API endpoints with validation and error handling
// ============================================================

import { NextRequest, NextResponse } from "next/server";

import type { ExportOptions, ExportContentType } from "@/types";

import { exportPortfolioData, exportContentType } from "@/lib";

// ============================================================
// Constants
// ============================================================

/** Valid content types for export */
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

/** Default export options */
const DEFAULT_EXPORT_OPTIONS = {
    includeAssets: true,
    includeMetadata: true,
    format: "json" as const,
    contentTypes: ["all"] as string[],
} as const;

/** HTTP status codes */
const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/** Error messages */
const ERROR_MESSAGES = {
    INVALID_CONTENT_TYPE: "Invalid content type",
    EXPORT_FAILED: "Failed to export data",
    UNKNOWN_ERROR: "Unknown error",
} as const;

// ============================================================
// Types
// ============================================================

/** Export API response interface */
interface ExportApiResponse {
    success: boolean;
    data?: any;
    contentType?: string;
    exportedAt?: string;
    error?: string;
    message?: string;
}

/** Query parameters interface for GET requests */
interface ExportQueryParams {
    type?: string;
    assets?: string;
    metadata?: string;
    format?: string;
}

/** Request body interface for POST requests */
interface ExportRequestBody {
    contentTypes?: string[];
    includeAssets?: boolean;
    includeMetadata?: boolean;
    format?: "json" | "ndjson";
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Validates content type against allowed values.
 *
 * @param contentType - Content type to validate
 * @returns True if valid, false otherwise
 */
const isValidContentType = (
    contentType: string
): contentType is ExportContentType => {
    return VALID_CONTENT_TYPES.includes(contentType as ExportContentType);
};

/**
 * Parses query parameters from request URL.
 *
 * @param searchParams - URL search parameters
 * @returns Parsed query parameters
 */
const parseQueryParams = (searchParams: URLSearchParams): ExportQueryParams => {
    return {
        type: searchParams.get("type") || undefined,
        assets: searchParams.get("assets") || undefined,
        metadata: searchParams.get("metadata") || undefined,
        format: searchParams.get("format") || undefined,
    };
};

/**
 * Creates error response with consistent structure.
 *
 * @param message - Error message
 * @param status - HTTP status code
 * @param details - Additional error details
 * @returns NextResponse with error data
 */
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

/**
 * Creates success response with consistent structure.
 *
 * @param data - Exported data
 * @param contentType - Content type (optional)
 * @returns NextResponse with success data
 */
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

// ============================================================
// API Route Handlers
// ============================================================

/**
 * GET /api/export - Export data via query parameters
 * Supports single content type export or full portfolio export
 *
 * @param request - Next.js request object
 * @returns Export data or error response
 *
 * @example
 * ```typescript
 * // Export specific content type
 * GET /api/export?type=projects&assets=true&metadata=true
 *
 * // Export all data
 * GET /api/export?type=all
 * ```
 */
export async function GET(
    request: NextRequest
): Promise<NextResponse<ExportApiResponse>> {
    try {
        // ============================================================
        // Parse Query Parameters
        // ============================================================

        const { searchParams } = new URL(request.url);
        const queryParams = parseQueryParams(searchParams);

        const {
            type: contentType,
            assets,
            metadata,
            format = DEFAULT_EXPORT_OPTIONS.format,
        } = queryParams;

        // Parse boolean parameters with defaults
        const includeAssets = assets !== "false";
        const includeMetadata = metadata !== "false";

        // ============================================================
        // Handle Single Content Type Export
        // ============================================================

        if (contentType && contentType !== "all") {
            // Validate content type
            if (!isValidContentType(contentType)) {
                return createErrorResponse(
                    ERROR_MESSAGES.INVALID_CONTENT_TYPE,
                    HTTP_STATUS.BAD_REQUEST,
                    `Content type '${contentType}' is not supported`
                );
            }

            // Export specific content type
            const data = await exportContentType(
                contentType as ExportContentType
            );
            return createSuccessResponse(data, contentType);
        }

        // ============================================================
        // Handle Full Portfolio Export
        // ============================================================

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
        // ============================================================
        // Error Handling
        // ============================================================

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

/**
 * POST /api/export - Export data via request body
 * Supports bulk export with custom options
 *
 * @param request - Next.js request object
 * @returns Export data or error response
 *
 * @example
 * ```typescript
 * // Export with custom options
 * POST /api/export
 * {
 *   "contentTypes": ["projects", "skills"],
 *   "includeAssets": true,
 *   "includeMetadata": false,
 *   "format": "json"
 * }
 * ```
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse<ExportApiResponse>> {
    try {
        // ============================================================
        // Parse Request Body
        // ============================================================

        const body: ExportRequestBody = await request.json();
        const {
            contentTypes = DEFAULT_EXPORT_OPTIONS.contentTypes,
            includeAssets = DEFAULT_EXPORT_OPTIONS.includeAssets,
            includeMetadata = DEFAULT_EXPORT_OPTIONS.includeMetadata,
            format = DEFAULT_EXPORT_OPTIONS.format,
        } = body;

        // ============================================================
        // Validate Content Types
        // ============================================================

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

        // ============================================================
        // Export Data
        // ============================================================

        const options: ExportOptions = {
            includeAssets,
            format,
            contentTypes: contentTypes || DEFAULT_EXPORT_OPTIONS.contentTypes,
            includeMetadata,
        };

        const exportedData = await exportPortfolioData(options);
        return createSuccessResponse(exportedData);
    } catch (error) {
        // ============================================================
        // Error Handling
        // ============================================================

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
