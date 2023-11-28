import React from "react";
interface ITabQdList {
    tabName: string;
    active?: boolean;
    tabIcon?: string;
    tabContent: any;
    onClick?: () => void;
}
interface IIndexTab {
    index: number;
}
interface ITabQdProps {
    tabsData: Array<ITabQdList>;
    activeTabIndex?: number;
    onTabChange?: (indexTab: IIndexTab) => void;
    type: "default" | "background";
}
declare const TabQd: React.FC<ITabQdProps>;
export default TabQd;
