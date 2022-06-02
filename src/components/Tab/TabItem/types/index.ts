import React from "react";

interface TabItemProps {
    index: number;
    title: string;
    subtitle?: string;
    active: boolean;
    activeColor?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick(tab: number): void;
};

interface TabItemActiveBarProps {
    active: boolean;
    activeColor?: string;
};

export type {
    TabItemProps, 
    TabItemActiveBarProps,
};