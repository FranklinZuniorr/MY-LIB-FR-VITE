import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from "../texts/_title/Title";
import { useEffect, useState } from "react";
import xmarkSolidPurple from "../../assets/images/icons/xmark-solid-purple.svg";
import styled from "styled-components";
const Div = styled.div `
   position: fixed;
   top: 0;
   bottom: 0;
   width: 100%;
   left: 0;
   height: auto;
   background-color: rgba(0, 0, 0, 0.3);
   backdrop-filter: blur(3px);
   z-index: 99999;
   padding: 1rem;
   display: flex;
   justify-content: center;
   align-items: center;

   .background-area-click{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      cursor: pointer;
   }
   
   .content-box {
      overflow-y: hidden;
      overflow-x: hidden;
      max-height: 99%;
      border-radius: 2rem !important;
      border: inset;
      background-color: $off-white;

      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &::-webkit-scrollbar {
         width: 7px;
      }

      &::-webkit-scrollbar-track {
         border-radius: 1rem;
         margin-top: 2rem;
         margin-bottom: 2rem;
      }

      &::-webkit-scrollbar-thumb {
         background: #888; 
      }

      @media only screen and (max-width: 1020px) {
         margin: 0.5rem !important;
      }
   
      .header {
         top: 0;


         background-color: rgba(255, 255, 255, 0.786);
         backdrop-filter: blur(3px);
         width: 100%;
         border-bottom: 1px solid #e1e1e1;
         padding: 1.5rem;
         padding-right: 2rem;
         display: flex;
         align-items: center;
         justify-content: space-between;
         z-index: 1;
         border-top-right-radius: 2rem !important;
         border-top-left-radius: 2rem !important;
      }
   
      .body {
         position: relative;
         height: max-content;


         background-color: $partners-base-color-white;
         width: 100%;
         padding: 1rem;
         overflow-y: auto;
         overflow-x: hidden;
         /* max-height: 40rem; */
   
         @media only screen and (max-width: 1020px) {
            padding: 0.5rem;
         }
      }
   
      .nav {
         bottom: 0;


         background-color: rgba(255, 255, 255, 0.786);
         backdrop-filter: blur(3px);
         width: 100%;
         padding: 1rem;
         display: flex;
         align-items: center;
         justify-content: flex-end;
         flex-direction: row;
         flex-wrap: wrap;
         gap: 0.5rem;
         border-top: 1px solid #e1e1e1;
         z-index: 1;

         border-radius: 2rem !important;
   
         @media only screen and (max-width: 1020px) {
            flex-direction: column-reverse;
   
            button {
               width: 100% !important;
            }
         }
      }
   }
`;
const ModalQd = ({ width, height, title = "", open, onClose = () => null, onOpen = () => null, navContent, bodyContent = _jsx(_Fragment, {}), backgroundExit = true, border, shadow }) => {
    const borderSpread = { color: "black", size: 1, bottom: false, left: false, right: false, top: false, ...border };
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [modalOldQty, setModalOldQty] = useState(0);
    useEffect(() => {
        const modalQty = document.getElementsByClassName("background-area-click");
        setModalOldQty(modalQty.length);
        if (open === true) {
            onOpen();
            document.body.classList.add("overflow-hidden");
            return;
        }
        if (!open) {
            onClose();
            document.body.classList.remove("overflow-hidden");
            return;
        }
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        if (modalOldQty === 1) {
            document.body.classList.remove("overflow-hidden");
            onClose();
        }
    }, [open]);
    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `RGB(${r}, ${g}, ${b}, ${shadow?.opacity})`;
    };
    return (_jsx(_Fragment, { children: open &&
            _jsxs(Div, { className: open ? "open" : "", children: [backgroundExit && _jsx("div", { onClick: () => {
                            const modalQty = document.getElementsByClassName("background-area-click");
                            setModalOldQty(modalQty.length);
                            onClose();
                        }, className: "background-area-click" }), _jsxs("div", { className: "content-box", style: {
                            padding: "0",
                            margin: "1rem",
                            maxWidth: `${width}rem`,
                            width: width ? `${width}rem` : "fit-content",
                            borderTop: borderSpread.top ? `${borderSpread.size}px solid ${borderSpread.color}` : "",
                            borderBottom: borderSpread.bottom ? `${borderSpread.size}px solid ${borderSpread.color}` : "",
                            borderLeft: borderSpread.left ? `${borderSpread.size}px solid ${borderSpread.color}` : "",
                            borderRight: borderSpread.right ? `${borderSpread.size}px solid ${borderSpread.color}` : "",
                            boxShadow: shadow ? `0px 0px ${shadow.size}px 0px ${hexToRgb(shadow?.color)}` : "",
                        }, children: [title.length > 0 &&
                                _jsxs("div", { className: "header", children: [_jsx(Title, { text: title, color: "#9B4DEE", size: 18 }), _jsx("img", { style: { cursor: "pointer" }, onClick: () => {
                                                const modalQty = document.getElementsByClassName("background-area-click");
                                                setModalOldQty(modalQty.length);
                                                onClose();
                                            }, src: xmarkSolidPurple, alt: "close" })] }), _jsx("div", { className: "body", style: {
                                    height: height ? `${height}rem` : "auto", /*
                                    display: navContent === undefined && title.length === 0? "flex":"", */
                                }, children: bodyContent }), navContent !== undefined && _jsx("div", { className: "nav", children: navContent })] })] }) }));
};
export default ModalQd;
