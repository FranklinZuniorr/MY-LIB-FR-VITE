import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./Paragraph.module.scss";
const Paragraph = ({ text, size = 20, marginBottom = 0, marginTop = 0, marginLeft = 0, marginRight = 0, isStrikethrough = false, horizontalAlign = "flex-start", opacity = 1 }) => {
    return (_jsx(_Fragment, { children: _jsx("div", { className: styles.paragraph, style: {
                fontSize: `${size}px`,
                marginTop: `${marginTop}rem`,
                marginRight: `${marginRight}rem`,
                marginLeft: `${marginLeft}rem`,
                marginBottom: `${marginBottom}rem`,
                textDecoration: isStrikethrough ? "line-through" : "none",
                justifyContent: `${horizontalAlign}`,
                width: "100%",
                textAlign: horizontalAlign === "flex-start" ? "left" : horizontalAlign === "flex-end" ? "right" : horizontalAlign === "center" ? "center" : "initial",
                opacity: opacity
            }, children: text }) }));
};
export default Paragraph;
