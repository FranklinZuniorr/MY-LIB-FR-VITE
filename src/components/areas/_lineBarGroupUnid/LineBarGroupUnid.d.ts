import React, { CSSProperties } from "react";
interface IUnid {
    unid: any;
    style?: string;
}
interface ILineBarGroupUnidProps {
    unidGroups: Array<IUnid>;
    positionGroups?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    style?: CSSProperties;
}
declare const LineBarGroupUnid: React.FC<ILineBarGroupUnidProps>;
export default LineBarGroupUnid;
