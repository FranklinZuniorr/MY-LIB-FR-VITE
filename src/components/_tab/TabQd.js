import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs } from "@radix-ui/themes";
import { useState } from "react";
import Title from "../texts/_title/Title";
import styled from "styled-components";
const Div = styled.div `
.TabsTrigger {
   color: $partners-neutral-color-600;
   font-feature-settings:
      "clig" off,
      "liga" off;
   font-family: Montserrat;
   font-size: 18px !important;
   font-style: normal;
   font-weight: 500;
   line-height: 28px;
   letter-spacing: 0.15px;
   cursor: pointer;

   margin-right: 2rem;

   &::before {
      background-color: #9b4dee !important;
      height: 0.2rem !important;
   }

   span:nth-child(1) {
      &:hover {
         background-color: #f0e2ff !important;
      }
   }
}

div[role="tablist"] {
   width: fit-content !important;
   height: 3.5rem !important;

   button{
      padding-right: 2rem !important;
      padding-left: 1rem !important;
      padding-bottom: 1rem !important;
      padding-top: 1rem !important;
   }
}

#TabsContent {
   margin-top: 1rem;
   padding: 1rem;

   &.default {
   }

   &.background {
      background-color: #f6f6f6;
      border-radius: 0.5rem;
      border: 2px solid #ebebeb;
   }
}

.scroll-horizontal {
   overflow-x: auto;
   padding: 0.5rem;
   border-bottom: 1px solid #e9e9ed;
   padding-bottom: 0;

   &::-webkit-scrollbar {
      height: 6px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 1rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
   }
}
`;
const TabQd = ({ tabsData = [], activeTabIndex = -1, onTabChange = () => null, type = "background", }) => {
    const [indexActiveTab, setIndexActiveTab] = useState(0);
    return (_jsx(Div, { children: _jsxs(Tabs.Root, { defaultValue: "tab0", value: activeTabIndex > -1 ? `tab${activeTabIndex}` : `tab${indexActiveTab}`, onValueChange: (value) => {
                setIndexActiveTab(+value.replace("tab", ""));
                onTabChange({ index: +value.replace("tab", "") });
            }, children: [_jsx("div", { className: "scroll-horizontal", children: _jsx(Tabs.List, { className: "TabsList", "aria-label": "Manage your account", children: tabsData.length > 0 &&
                            tabsData.map((item, index) => {
                                if (item.active || item.active === undefined) {
                                    return _jsxs(Tabs.Trigger, { onClick: item.onClick, className: "TabsTrigger", value: `tab${index}`, children: [item.tabIcon && _jsx("img", { src: item.tabIcon, width: 30, height: 30, alt: "icon" }), _jsx(Title, { fontWeight: index === indexActiveTab ? 700 : 500, marginLeft: item.tabIcon ? 1 : 0, text: item.tabName, size: 18, color: "#707070" })] }, index);
                                }
                            }) }) }), tabsData.length > 0 &&
                    tabsData.map((item, index) => (_jsx(Tabs.Content, { id: "TabsContent", className: "type", value: `tab${index}`, children: item.tabContent }, index)))] }) }));
};
export default TabQd;
