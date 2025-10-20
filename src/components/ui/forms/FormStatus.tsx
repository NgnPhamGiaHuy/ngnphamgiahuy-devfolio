"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { FormStatusProps } from "@/types";

const FormStatus: React.FC<FormStatusProps> = ({ submitStatus }) => {
    const isSuccess = submitStatus?.type === "success";

    const statusClass = useMemo(() => {
        return isSuccess ? "status-message-success" : "status-message-error";
    }, [isSuccess]);

    const icon = useMemo(() => {
        return isSuccess ? (
            <svg
                className={"mr-3 size-5"}
                fill={"currentColor"}
                viewBox={"0 0 20 20"}
                aria-hidden={"true"}
                focusable={"false"}
            >
                <path
                    fillRule={"evenodd"}
                    d={
                        "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    }
                    clipRule={"evenodd"}
                />
            </svg>
        ) : (
            <svg
                className={"mr-3 size-5"}
                fill={"currentColor"}
                viewBox={"0 0 20 20"}
                aria-hidden={"true"}
                focusable={"false"}
            >
                <path
                    fillRule={"evenodd"}
                    d={
                        "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    }
                    clipRule={"evenodd"}
                />
            </svg>
        );
    }, [isSuccess]);

    const liveLabel = isSuccess ? "Success" : "Error";

    if (!submitStatus) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={`status-message ${statusClass}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                role={"alert"}
                aria-live={"polite"}
                aria-atomic={true}
                aria-label={`${liveLabel} message`}
                data-status={isSuccess ? "success" : "error"}
            >
                <div className={"flex-start"}>
                    {icon}
                    <span>{submitStatus.message}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

FormStatus.displayName = "FormStatus";

export default FormStatus;
