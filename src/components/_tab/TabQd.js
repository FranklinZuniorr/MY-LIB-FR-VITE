import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tabs } from "@radix-ui/themes";
import styles from "./TabQd.module.scss";
import { useState } from "react";
import Title from "../texts/_title/Title";
const TabQd = ({ tabsData = [], activeTabIndex = -1, onTabChange = () => null, type = "background", }) => {
    const [indexActiveTab, setIndexActiveTab] = useState(0);
    return (_jsx(_Fragment, { children: _jsxs(Tabs.Root, { className: styles["TabsRoot"], defaultValue: "tab0", value: activeTabIndex > -1 ? `tab${activeTabIndex}` : `tab${indexActiveTab}`, onValueChange: (value) => {
                setIndexActiveTab(+value.replace("tab", ""));
                onTabChange({ index: +value.replace("tab", "") });
            }, children: [_jsx("div", { className: styles["scroll-horizontal"], children: _jsx(Tabs.List, { className: "TabsList", "aria-label": "Manage your account", children: tabsData.length > 0 &&
                            tabsData.map((item, index) => {
                                if (item.active || item.active === undefined) {
                                    return _jsxs(Tabs.Trigger, { onClick: item.onClick, className: styles["TabsTrigger"], value: `tab${index}`, children: [item.tabIcon && _jsx("img", { src: item.tabIcon, width: 30, height: 30, alt: "icon" }), _jsx(Title, { fontWeight: index === indexActiveTab ? 700 : 500, marginLeft: item.tabIcon ? 1 : 0, text: item.tabName, size: 18, color: "#707070" })] }, index);
                                }
                            }) }) }), tabsData.length > 0 &&
                    tabsData.map((item, index) => (_jsx(Tabs.Content, { id: styles["TabsContent"], className: styles[type], value: `tab${index}`, children: item.tabContent }, index)))] }) }));
};
export default TabQd;
