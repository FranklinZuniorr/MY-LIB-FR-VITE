import React from "react";
interface IBorder {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    color?: string;
    size?: number;
}
interface IShadow {
    color: string;
    size: number;
    opacity: "0.1" | "0.2" | "0.3" | "0.4" | "0.5" | "0.6" | "0.7" | "0.8" | "0.9" | "1";
}
interface IModalQdProps {
    width?: number;
    height?: number;
    title?: string;
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    navContent?: React.ReactNode;
    bodyContent?: React.ReactNode;
    backgroundExit?: boolean;
    border?: IBorder;
    shadow?: IShadow;
}
declare const ModalQd: React.FC<IModalQdProps>;
export default ModalQd;
