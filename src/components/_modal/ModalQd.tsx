import styles from "./ModalQd.module.scss";
import Title from "../texts/_title/Title";
import React, { useEffect, useState } from "react";
import xmarkSolidPurple from "../../assets/images/icons/xmark-solid-purple.svg";

interface IBorder {
   left?: boolean;
   right?: boolean;
   top?: boolean;
   bottom?: boolean;
   color?: string,
   size?: number 
}

interface IShadow {
   color: string,
   size: number,
   opacity: "0.1" | "0.2" | "0.3" | "0.4" | "0.5" | "0.6" | "0.7" | "0.8" | "0.9" | "1"
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
   border?: IBorder,
   shadow?: IShadow
}

const ModalQd: React.FC<IModalQdProps> = ({
   width,
   height,
   title = "",
   open,
   onClose = () => null,
   onOpen = () => null,
   navContent,
   bodyContent = <></>,
   backgroundExit = true,
   border,
   shadow
}) => {

   const borderSpread = {color: "black", size: 1, bottom: false, left: false, right: false, top: false, ...border};
   const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
   const [modalOldQty, setModalOldQty] = useState<number>(0);

   useEffect(() => {
      const modalQty = document.getElementsByClassName(styles["background-area-click"]);
      setModalOldQty(modalQty.length);

      if (open === true) {
         onOpen();
         document.body.classList.add(styles["overflow-hidden"]);
         return
      }

      if(!open){
         onClose();
         document.body.classList.remove(styles["overflow-hidden"]);
         return
      }
      
      if(isFirstRender){
         setIsFirstRender(false);
         return
      }

      if(modalOldQty === 1){
         document.body.classList.remove(styles["overflow-hidden"]);
         onClose();
      }
   }, [open]);

   const hexToRgb = (hex: string): string => {
      hex = hex.replace(/^#/, '');
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `RGB(${r}, ${g}, ${b}, ${shadow?.opacity})`;
   }

   return (
      <>
         {
            open &&
            <div 
            id={styles["background"]}
            className={open? styles["open"]:styles[""]}
            >
               {backgroundExit && <div onClick={() => {
                  const modalQty = document.getElementsByClassName(styles["background-area-click"]);
                  setModalOldQty(modalQty.length);
                  onClose();
               }} className={styles["background-area-click"]} />}
               <div
                  className={styles["content-box"]}
                  style={{
                     padding: "0",
                     margin: "1rem",
                     maxWidth: `${width}rem`,
                     width: width? `${width}rem`:"fit-content",
                     borderTop: borderSpread.top? `${borderSpread.size}px solid ${borderSpread.color}`:"",
                     borderBottom: borderSpread.bottom? `${borderSpread.size}px solid ${borderSpread.color}`:"",
                     borderLeft: borderSpread.left? `${borderSpread.size}px solid ${borderSpread.color}`:"",
                     borderRight: borderSpread.right? `${borderSpread.size}px solid ${borderSpread.color}`:"",
                     boxShadow: shadow? `0px 0px ${shadow.size}px 0px ${hexToRgb(shadow?.color)}`:"",
                  }}
                  >
                     {
                        title.length > 0 &&
                        <div className={styles["header"]}>
                           <Title text={title} color="#9B4DEE" size={18} />
                           <img
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                 const modalQty = document.getElementsByClassName(styles["background-area-click"]);
                                 setModalOldQty(modalQty.length);
                                 onClose();
                              }}
                              src={xmarkSolidPurple}
                              alt="close"
                           />
                        </div>
                     }
                     <div className={styles["body"]} style={{
                        height: height? `${height}rem`:"auto",/* 
                        display: navContent === undefined && title.length === 0? "flex":"", */
                     }}>{bodyContent}</div>
                     {navContent !== undefined && <div className={styles["nav"]}>{navContent}</div>}
                  </div>
               </div>
         }
      </>
   );
};

export default ModalQd;
