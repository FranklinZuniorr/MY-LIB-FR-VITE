import { Tabs } from "@radix-ui/themes";
import React, { useState } from "react";
import Title from "../texts/_title/Title";
import styled from "styled-components";

interface ITabQdList {
   tabName: string,
   active?: boolean,
   tabIcon?: string,
   tabContent: any,
   onClick?: () => void,
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

const Div = styled.div`
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

const TabQd: React.FC<ITabQdProps> = ({
   tabsData = [],
   activeTabIndex = -1,
   onTabChange = () => null,
   type = "background",
}) => {
   const [indexActiveTab, setIndexActiveTab] = useState<number>(0);

   return (
      <Div>
         <Tabs.Root
            defaultValue="tab0"
            value={activeTabIndex > -1 ? `tab${activeTabIndex}` : `tab${indexActiveTab}`}
            onValueChange={(value) => {
               setIndexActiveTab(+value.replace("tab", ""));
               onTabChange({ index: +value.replace("tab", "") });
            }}
         >
            <div className={"scroll-horizontal"}>
               <Tabs.List className="TabsList" aria-label="Manage your account">
                  {tabsData.length > 0 &&
                     tabsData.map((item, index) => {
                        if(item.active || item.active === undefined){
                           return <Tabs.Trigger
                           onClick={item.onClick}
                           key={index}
                           className={"TabsTrigger"}
                           value={`tab${index}`}
                        >
                           {
                              item.tabIcon && <img src={item.tabIcon} width={30} height={30} alt="icon"/>
                           }
                           <Title 
                           fontWeight={index === indexActiveTab? 700:500} 
                           marginLeft={item.tabIcon? 1:0} 
                           text={item.tabName} 
                           size={18} 
                           color="#707070" 
                           />
                        </Tabs.Trigger>
                        }
                     })}
               </Tabs.List>
            </div>

            {tabsData.length > 0 &&
               tabsData.map((item, index) => (
                  <Tabs.Content key={index} id={"TabsContent"} className="type" value={`tab${index}`}>
                     {item.tabContent}
                  </Tabs.Content>
               ))}
         </Tabs.Root>
      </Div>
   );
};

export default TabQd;
