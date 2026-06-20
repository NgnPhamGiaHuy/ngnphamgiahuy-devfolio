"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ServiceCardProps } from "@/shared/types";

import { SERVICE_CARD_VARIANTS } from "@/infrastructure/config";

const ServiceCard: React.FC<ServiceCardProps> = ({
    item,
    index,
    isActive = false,
    ...props
}) => {
    const serviceTitle = item.title || "Service";
    const serviceCategory = item.category || "General";
    const serviceDescription = item.description || "";

    return (
        <motion.article
            className="card"
            variants={SERVICE_CARD_VARIANTS.card(0.95)}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            data-testid="service-card"
            {...props}
        >
            <div className="card-inner">
                {/* Service Category */}
                <motion.div
                    className="card-category"
                    variants={SERVICE_CARD_VARIANTS.content(10)}
                >
                    <span>{serviceCategory}</span>
                </motion.div>

                {/* Service Icon */}
                <motion.div
                    className="card-icon"
                    variants={SERVICE_CARD_VARIANTS.content(10)}
                    aria-hidden="true"
                />

                {/* Service Title */}
                <motion.header
                    className="card-title"
                    variants={SERVICE_CARD_VARIANTS.content(10)}
                >
                    <h3>
                        <span>{serviceTitle}</span>
                    </h3>
                </motion.header>

                {/* Service Description */}
                <motion.div
                    className="card-description"
                    variants={SERVICE_CARD_VARIANTS.content(10)}
                >
                    <p>{serviceDescription}</p>
                </motion.div>

                {/* Call to Action */}
                <motion.div variants={SERVICE_CARD_VARIANTS.content(10)}>
                    <Link
                        href="/contact"
                        aria-label={`More information about ${serviceTitle}`}
                        prefetch={false}
                        className="inline-block"
                    >
                        <span className="card-link">More information</span>
                    </Link>
                </motion.div>

                {/* Decorative Pattern */}
                <motion.div
                    className="card-pattern"
                    variants={SERVICE_CARD_VARIANTS.pattern()}
                    animate={isActive ? "visible" : "hidden"}
                    aria-hidden="true"
                />
            </div>
        </motion.article>
    );
};

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
