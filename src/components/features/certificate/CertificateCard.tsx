// ============================================================
// Component: CertificateCard
// Purpose: Individual certificate preview card with image, title, and details
// ============================================================

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import type { Certificate } from "@/types";

import { ArrowLink } from "@/components";
import { CERTIFICATE_CARD_VARIANTS } from "@/config";
import { processImage, formatDate } from "@/utils";

// ============================================================
// Constants
// ============================================================

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 250;
const FALLBACK_IMAGE = "/images/profile2.png";

// ============================================================
// Types
// ============================================================

interface CertificateCardProps {
    index: number;
    item: Certificate;
    isActive?: boolean;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * CertificateCard component renders an individual certificate preview card.
 * Displays certificate image, issue/expiry dates, title, description, and view link.
 * Features hover effects and optimized image loading for better UX.
 *
 * @param props - Component props
 * @param props.item - Certificate data object
 * @param props.index - Index of the certificate in the carousel
 * @param props.isActive - Whether the certificate is currently active in carousel
 * @returns Certificate preview card component
 */
const CertificateCard: React.FC<CertificateCardProps> = ({
    item,
    isActive = false,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const { url: imageUrl, alt: imageAlt } = processImage(
        item.image,
        {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            fallbackImage: FALLBACK_IMAGE,
        },
        { fallbackAlt: item.title }
    );

    const issuedDate = formatDate(item.issueDate);
    const expiryDate = item.expiryDate ? formatDate(item.expiryDate) : null;
    const credentialHref = item.credentialUrl || "#";

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.article
            className="card"
            variants={CERTIFICATE_CARD_VARIANTS.card(0.95)}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            data-testid="certificate-card"
            {...props}
        >
            <div className="card-inner">
                <div className="h-full flex flex-col justify-between">
                    {/* Certificate Image */}
                    <div className="mt-[30px] order-2">
                        <Link
                            href={credentialHref}
                            aria-label={`View certificate: ${item.title}`}
                            prefetch={false}
                        >
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full h-[180px] object-cover rounded-[20px]"
                                width={IMAGE_WIDTH}
                                height={IMAGE_HEIGHT}
                                sizes="(max-width: 768px) 100vw, 400px"
                                loading="lazy"
                                decoding="async"
                                fetchPriority="auto"
                            />
                        </Link>
                    </div>

                    {/* Certificate Content */}
                    <div className="flex flex-1 flex-col justify-between order-1">
                        <div className="flex flex-1 flex-col justify-between">
                            {/* Header */}
                            <div>
                                {/* Issue/Expiry Date */}
                                <time
                                    className="mt-[15px] mb-[4px] text-[13px] text-inverse! font-medium uppercase tracking-wider block"
                                    dateTime={item.issueDate}
                                >
                                    <span>{issuedDate}</span>
                                    {expiryDate && (
                                        <>
                                            <span
                                                className="mx-2"
                                                aria-label="to"
                                            >
                                                -
                                            </span>
                                            <span>{expiryDate}</span>
                                        </>
                                    )}
                                </time>

                                {/* Certificate Title */}
                                <h3 className="text-[24px] text-inverse!">
                                    <Link
                                        href={credentialHref}
                                        aria-label={`View certificate details: ${item.title}`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                </h3>
                            </div>

                            {/* Description */}
                            {item.description && (
                                <div className="opacity-80">
                                    <p className="mb-2 line-clamp-4">
                                        {item.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action */}
                        <div className="mt-[10px] opacity-80">
                            <ArrowLink href={credentialHref}>
                                View Certificate
                            </ArrowLink>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

CertificateCard.displayName = "CertificateCard";

export default CertificateCard;
