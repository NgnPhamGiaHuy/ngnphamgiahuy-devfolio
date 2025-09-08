import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
    try {
        const secret = request.headers.get("x-webhook-secret");
        const expectedSecret = process.env.WEBHOOK_SECRET;

        if (expectedSecret && secret !== expectedSecret) {
            return NextResponse.json(
                { message: "Invalid webhook secret" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const { _type, _id } = body;

        console.log(`Revalidating content: ${_type} (ID: ${_id})`);

        if (_type) {
            revalidateTag(_type);
        }

        revalidatePath("/");

        if (_type === "project") {
            revalidatePath("/portfolio");
        } else if (_type === "blogPost") {
            revalidatePath("/blog");
            if (body.slug?.current) {
                revalidatePath(`/blog/${body.slug.current}`);
            }
        }

        return NextResponse.json({
            revalidated: true,
            message: `Revalidated ${_type} content`,
            now: Date.now()
        });
    } catch (err) {
        console.error("Revalidation error:", err);
        return NextResponse.json(
            { message: "Error revalidating content", error: (err as Error).message },
            { status: 500 }
        );
    }
}
