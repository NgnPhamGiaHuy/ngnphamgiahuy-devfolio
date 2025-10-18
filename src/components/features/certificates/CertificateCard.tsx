"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import type { Certificate } from "@/types";

import { ArrowLink } from "@/components";
import { processImage } from "@/utils";
import { StandardAnimations } from "@/config";

const CertificateCard = ({
    index,
    item,
}: {
    index: number;
    item: Certificate;
}) => {
    const { url: imageUrl, alt: imageAlt } = processImage(
        item.image,
        { width: 400, height: 250, fallbackImage: "/images/profile2.png" },
        item.title
    );

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });
    };
    const cardVariants = StandardAnimations.scaleIn(0.95);

    return (
        <motion.div
            key={index}
            className="card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="card-inner">
                <div className="h-full flex flex-col justify-between">
                    {/* Image Section */}
                    <div className="mt-[30px] order-2">
                        <Link href={item.credentialUrl || "#"}>
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full h-[180px] object-cover rounded-[20px]"
                                width={400}
                                height={250}
                            />
                        </Link>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col justify-between order-1">
                        <div className="flex flex-1 flex-col justify-between">
                            {/* Header */}
                            <div>
                                <div className="mt-[15px] mb-[4px] text-[13px] text-inverse! font-medium uppercase tracking-wider">
                                    <span>{formatDate(item.issueDate)}</span>
                                    {item.expiryDate && (
                                        <>
                                            <span className="mx-2">-</span>
                                            <span>
                                                {formatDate(item.expiryDate)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h5 className="text-[24px] text-inverse!">
                                    <Link href={item.credentialUrl || "#"}>
                                        {item.title}
                                    </Link>
                                </h5>
                            </div>

                            {/* Description */}
                            <div className="opacity-80">
                                {item.description && (
                                    <p className="mb-2 line-clamp-3">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action */}
                        <div className="mt-[10px] opacity-80">
                            <ArrowLink href={item.credentialUrl || "#"}>
                                View Certificate
                            </ArrowLink>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CertificateCard;
