import { NextRequest, NextResponse } from "next/server";

import type { ExportOptions, ExportContentType } from "@/types";

import { exportPortfolioData, exportContentType } from "@/lib";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const contentType = searchParams.get("type");
        const includeAssets = searchParams.get("assets") !== "false";
        const includeMetadata = searchParams.get("metadata") !== "false";
        const format =
            (searchParams.get("format") as "json" | "ndjson") || "json";

        if (contentType && contentType !== "all") {
            const validContentTypes: ExportContentType[] = [
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
            ];

            if (!validContentTypes.includes(contentType as ExportContentType)) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Invalid content type",
                        message: `Content type '${contentType}' is not supported`,
                    },
                    { status: 400 }
                );
            }

            const data = await exportContentType(
                contentType as ExportContentType
            );

            return NextResponse.json({
                success: true,
                data: data,
                contentType,
                exportedAt: new Date().toISOString(),
            });
        }

        const contentTypes = contentType === "all" ? ["all"] : ["all"];
        const options: ExportOptions = {
            includeAssets,
            format,
            contentTypes,
            includeMetadata,
        };

        const exportedData = await exportPortfolioData(options);

        return NextResponse.json({
            success: true,
            data: exportedData,
            exportedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to export data",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            contentTypes,
            includeAssets = true,
            includeMetadata = true,
            format = "json",
        } = body;

        const options: ExportOptions = {
            includeAssets,
            format,
            contentTypes: contentTypes || ["all"],
            includeMetadata,
        };

        const exportedData = await exportPortfolioData(options);

        return NextResponse.json({
            success: true,
            data: exportedData,
            exportedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to export data",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
