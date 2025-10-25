// ============================================================
// API Route: Revalidate
// Purpose: Cache revalidation webhook for Sanity CMS integration
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// ============================================================
// Constants
// ============================================================

/** HTTP status codes */
const HTTP_STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/** Response messages */
const RESPONSE_MESSAGES = {
    INVALID_SECRET: "Invalid webhook secret",
    HEALTH_CHECK_FAILED: "Health check failed",
    REVALIDATION_ERROR: "Error revalidating content",
    HEALTHY: "Revalidate endpoint healthy",
    REVALIDATED: "Revalidated content",
} as const;

/** Content type mappings for path revalidation */
const CONTENT_TYPE_PATHS = {
    project: "/portfolio",
    blogPost: "/blog",
} as const;

/** Default paths to revalidate */
const DEFAULT_REVALIDATE_PATHS = ["/"] as const;

// ============================================================
// Types
// ============================================================

/** Revalidation webhook payload interface */
interface RevalidationPayload {
    /** Content type from Sanity */
    _type?: string;
    /** Content ID from Sanity */
    _id?: string;
    /** Blog post slug for specific page revalidation */
    slug?: {
        current?: string;
    };
}

/** API response interface */
interface RevalidationResponse {
    ok?: boolean;
    revalidated?: boolean;
    message: string;
    now?: number;
    error?: string;
}

/** Health check response interface */
interface HealthCheckResponse {
    ok: boolean;
    message: string;
    now: number;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Validates webhook secret for authentication.
 *
 * @param request - Next.js request object
 * @returns True if secret is valid or not required
 */
const validateWebhookSecret = (request: NextRequest): boolean => {
    const secret = request.headers.get("x-webhook-secret");
    const expectedSecret = process.env.WEBHOOK_SECRET;

    // If no secret is configured, allow all requests (development mode)
    if (!expectedSecret) {
        return true;
    }

    return secret === expectedSecret;
};

/**
 * Creates error response with consistent structure.
 *
 * @param message - Error message
 * @param status - HTTP status code
 * @param error - Additional error details (optional)
 * @returns NextResponse with error data
 */
const createErrorResponse = (
    message: string,
    status: number,
    error?: string
): NextResponse<RevalidationResponse> => {
    const response: RevalidationResponse = { message };

    if (error) {
        response.error = error;
    }

    return NextResponse.json(response, { status });
};

/**
 * Creates success response with consistent structure.
 *
 * @param message - Success message
 * @param revalidated - Whether content was revalidated (optional)
 * @returns NextResponse with success data
 */
const createSuccessResponse = (
    message: string,
    revalidated?: boolean
): NextResponse<RevalidationResponse | HealthCheckResponse> => {
    const response: RevalidationResponse | HealthCheckResponse = {
        message,
        now: Date.now(),
    };

    if (revalidated !== undefined) {
        (response as RevalidationResponse).revalidated = revalidated;
    } else {
        (response as HealthCheckResponse).ok = true;
    }

    return NextResponse.json(response);
};

/**
 * Handles content-specific path revalidation.
 *
 * @param payload - Revalidation payload
 */
const handleContentSpecificRevalidation = (
    payload: RevalidationPayload
): void => {
    const { _type, slug } = payload;

    if (!_type) return;

    // Handle project-specific revalidation
    if (_type === "project") {
        revalidatePath(CONTENT_TYPE_PATHS.project);
    }

    // Handle blog post-specific revalidation
    if (_type === "blogPost") {
        revalidatePath(CONTENT_TYPE_PATHS.blogPost);

        // Revalidate specific blog post page if slug is provided
        if (slug?.current) {
            revalidatePath(`/blog/${slug.current}`);
        }
    }
};

// ============================================================
// API Route Handlers
// ============================================================

/**
 * GET /api/revalidate - Health check endpoint
 * Validates webhook secret and returns endpoint status
 *
 * @param request - Next.js request object
 * @returns Health check response
 *
 * @example
 * ```typescript
 * // Health check request
 * GET /api/revalidate
 * Headers: { "x-webhook-secret": "your-secret" }
 * ```
 */
export async function GET(
    request: NextRequest
): Promise<NextResponse<HealthCheckResponse | RevalidationResponse>> {
    try {
        // ============================================================
        // Authentication
        // ============================================================

        if (!validateWebhookSecret(request)) {
            return createErrorResponse(
                RESPONSE_MESSAGES.INVALID_SECRET,
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        // ============================================================
        // Health Check Response
        // ============================================================

        return createSuccessResponse(RESPONSE_MESSAGES.HEALTHY);
    } catch (error) {
        // ============================================================
        // Error Handling
        // ============================================================

        console.error("Health check error:", error);

        return createErrorResponse(
            RESPONSE_MESSAGES.HEALTH_CHECK_FAILED,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

/**
 * POST /api/revalidate - Content revalidation webhook
 * Handles Sanity CMS webhook for cache invalidation
 *
 * @param request - Next.js request object
 * @returns Revalidation response
 *
 * @example
 * ```typescript
 * // Revalidation webhook payload
 * POST /api/revalidate
 * Headers: { "x-webhook-secret": "your-secret" }
 * Body: {
 *   "_type": "project",
 *   "_id": "project-123",
 *   "slug": { "current": "my-project" }
 * }
 * ```
 */
export async function POST(
    request: NextRequest
): Promise<NextResponse<RevalidationResponse>> {
    try {
        // ============================================================
        // Authentication
        // ============================================================

        if (!validateWebhookSecret(request)) {
            return createErrorResponse(
                RESPONSE_MESSAGES.INVALID_SECRET,
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        // ============================================================
        // Parse Request Body
        // ============================================================

        const payload: RevalidationPayload = await request.json();
        const { _type, _id } = payload;

        // ============================================================
        // Log Revalidation Request
        // ============================================================

        console.log(`Revalidating content: ${_type} (ID: ${_id})`);

        // ============================================================
        // Perform Revalidation
        // ============================================================

        // Revalidate by content type tag
        if (_type) {
            revalidateTag(_type);
        }

        // Revalidate default paths
        DEFAULT_REVALIDATE_PATHS.forEach((path) => {
            revalidatePath(path);
        });

        // Handle content-specific path revalidation
        handleContentSpecificRevalidation(payload);

        // ============================================================
        // Success Response
        // ============================================================

        return createSuccessResponse(
            `${RESPONSE_MESSAGES.REVALIDATED} ${_type} content`,
            true
        );
    } catch (error) {
        // ============================================================
        // Error Handling
        // ============================================================

        console.error("Revalidation error:", error);

        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        return createErrorResponse(
            RESPONSE_MESSAGES.REVALIDATION_ERROR,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            errorMessage
        );
    }
}
