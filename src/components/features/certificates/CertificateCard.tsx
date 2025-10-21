"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import type { Certificate } from "@/types";

import { ArrowLink } from "@/components";
import { COMMON_ANIMATIONS } from "@/config";
import { processImage, formatDate } from "@/utils";

const cardVariants = COMMON_ANIMATIONS.scaleIn95;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 250;

interface CertificateCardProps {
    index: number;
    item: Certificate;
    isActive?: boolean;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
    item,
    isActive = false,
}) => {
    const { imageUrl, imageAlt } = useMemo(() => {
        const { url, alt } = processImage(
            item.image,
            {
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                fallbackImage: "/images/profile2.png",
            },
            item.title
        );
        return { imageUrl: url, imageAlt: alt };
    }, [item.image, item.title]);

    const issuedDate = useMemo(
        () => formatDate(item.issueDate),
        [item.issueDate]
    );
    const expiryDate = useMemo(
        () => (item.expiryDate ? formatDate(item.expiryDate) : null),
        [item.expiryDate]
    );

    const credentialHref = item.credentialUrl || "#";

    return (
        <motion.div
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
        >
            <div className="card-inner">
                <div className="h-full flex flex-col justify-between">
                    {/* Image Section */}
                    <div className="mt-[30px] order-2">
                        <Link
                            href={credentialHref}
                            aria-label={`Open certificate: ${item.title}`}
                            prefetch
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

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col justify-between order-1">
                        <div className="flex flex-1 flex-col justify-between">
                            {/* Header */}
                            <div>
                                <div className="mt-[15px] mb-[4px] text-[13px] text-inverse! font-medium uppercase tracking-wider">
                                    <span>{issuedDate}</span>
                                    {expiryDate && (
                                        <>
                                            <span className="mx-2">-</span>
                                            <span>{expiryDate}</span>
                                        </>
                                    )}
                                </div>
                                <h5 className="text-[24px] text-inverse!">
                                    <Link
                                        href={credentialHref}
                                        aria-label={`View certificate details for: ${item.title}`}
                                        prefetch
                                    >
                                        {item.title}
                                    </Link>
                                </h5>
                            </div>

                            {/* Description */}
                            <div className="opacity-80">
                                {item.description && (
                                    <p className="mb-2 line-clamp-4">
                                        {item.description}
                                    </p>
                                )}
                            </div>
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
        </motion.div>
    );
};

CertificateCard.displayName = "CertificateCard";

export default CertificateCard;
