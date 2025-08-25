"use client"

import React from "react";
import Link from "next/link";

import { ServiceCardProps } from "@/types";

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
    return (
        <div key={index} className={"service-card"}>
            <div className={"service-card-inner"}>
                <div className={"service-category"}>
                    <span>
                        { service.category }
                    </span>
                </div>
                <div className={"service-icon-placeholder"}></div>
                <h5 className={"service-title"}>
                    <span>
                        { service.title }
                    </span>
                </h5>
                <div className={"service-description"}>
                    <p>
                        { service.description}
                    </p>
                </div>
                <Link href={"/"}>
                    <span className={"service-link"}>
                        More information
                    </span>
                </Link>
                <div className={"service-card-pattern"}></div>
            </div>
        </div>
    );
};

export default ServiceCard;
