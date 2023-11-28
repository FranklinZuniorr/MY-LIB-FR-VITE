import { Tabs } from "@radix-ui/themes";
import styles from "./TabQd.module.scss";
import React, { useState } from "react";
import Title from "../texts/_title/Title";

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

const TabQd: React.FC<ITabQdProps> = ({
   tabsData = [],
   activeTabIndex = -1,
   onTabChange = () => null,
   type = "background",
}) => {
   const [indexActiveTab, setIndexActiveTab] = useState<number>(0);

   return (
      <>
         <Tabs.Root
            className={styles["TabsRoot"]}
            defaultValue="tab0"
            value={activeTabIndex > -1 ? `tab${activeTabIndex}` : `tab${indexActiveTab}`}
            onValueChange={(value) => {
               setIndexActiveTab(+value.replace("tab", ""));
               onTabChange({ index: +value.replace("tab", "") });
            }}
         >
            <div className={styles["scroll-horizontal"]}>
               <Tabs.List className="TabsList" aria-label="Manage your account">
                  {tabsData.length > 0 &&
                     tabsData.map((item, index) => {
                        if(item.active || item.active === undefined){
                           return <Tabs.Trigger
                           onClick={item.onClick}
                           key={index}
                           className={styles["TabsTrigger"]}
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
                  <Tabs.Content key={index} id={styles["TabsContent"]} className={styles[type]} value={`tab${index}`}>
                     {item.tabContent}
                  </Tabs.Content>
               ))}
         </Tabs.Root>
      </>
   );
};

export default TabQd;
