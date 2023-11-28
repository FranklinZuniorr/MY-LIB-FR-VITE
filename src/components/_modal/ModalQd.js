import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ModalQd.module.scss";
import Title from "../texts/_title/Title";
import { useEffect, useState } from "react";
import xmarkSolidPurple from "../../assets/images/icons/xmark-solid-purple.svg";
const ModalQd = ({ width, height, title = "", open, onClose = () => null, onOpen = () => null, navContent, bodyContent = _jsx(_Fragment, {}), backgroundExit = true, border, shadow }) => {
    const borderSpread = { color: "black", size: 1, bottom: false, left: false, right: false, top: false, ...border };
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [modalOldQty, setModalOldQty] = useState(0);
    useEffect(() => {
        const modalQty = document.getElementsByClassName(styles["background-area-click"]);
        setModalOldQty(modalQty.length);
        if (open === true) {
            onOpen();
            document.body.classList.add(styles["overflow-hidden"]);
            return;
        }
        if (!open) {
            onClose();
            document.body.classList.remove(styles["overflow-hidden"]);
            return;
        }
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        if (modalOldQty === 1) {
            document.body.classList.remove(styles["overflow-hidden"]);
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
            _jsxs("div", { id: styles["background"], className: open ? styles["open"] : styles[""], children: [backgroundExit && _jsx("div", { onClick: () => {
                            const modalQty = document.getElementsByClassName(styles["background-area-click"]);
                            setModalOldQty(modalQty.length);
                            onClose();
                        }, className: styles["background-area-click"] }), _jsxs("div", { className: styles["content-box"], style: {
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
                                _jsxs("div", { className: styles["header"], children: [_jsx(Title, { text: title, color: "#9B4DEE", size: 18 }), _jsx("img", { style: { cursor: "pointer" }, onClick: () => {
                                                const modalQty = document.getElementsByClassName(styles["background-area-click"]);
                                                setModalOldQty(modalQty.length);
                                                onClose();
                                            }, src: xmarkSolidPurple, alt: "close" })] }), _jsx("div", { className: styles["body"], style: {
                                    height: height ? `${height}rem` : "auto", /*
                                    display: navContent === undefined && title.length === 0? "flex":"", */
                                }, children: bodyContent }), navContent !== undefined && _jsx("div", { className: styles["nav"], children: navContent })] })] }) }));
};
export default ModalQd;
