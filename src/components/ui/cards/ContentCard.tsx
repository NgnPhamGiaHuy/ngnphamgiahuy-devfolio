"use client"

import React from "react";
import Link from "next/link";

import { ContentCardProps } from "@/types";

const ContentCard: React.FC<ContentCardProps> = ({ item, index }) => {
    return (
        <div key={index} className={"content-card"}>
            <div className={"content-card-inner"}>
                <div className={"content-card-category"}>
                    <span>
                        { item.category }
                    </span>
                </div>
                <div className={"content-card-icon"}></div>
                <h5 className={"content-card-title"}>
                    <span>
                        { item.title }
                    </span>
                </h5>
                <div className={"content-card-description"}>
                    <p>
                        { item.description }
                    </p>
                </div>
                <Link href={"/src/public"}>
                    <span className={"content-card-link"}>
                        More information
                    </span>
                </Link>
                <div className={"content-card-pattern"}></div>
            </div>
        </div>
    );
};

export default ContentCard;


