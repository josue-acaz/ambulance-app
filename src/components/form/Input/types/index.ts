import React from "react";

interface InputProps {
    error?: boolean;
    adorment?: React.ReactNode;
    adormentPosition?: "start" | "end";
    onAdormentClick?(): void;
};

interface AdormentProps {
    hover?: boolean;
    position?: "start" | "end";
};

export type {InputProps, AdormentProps};