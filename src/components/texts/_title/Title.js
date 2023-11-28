import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./Title.module.scss";
const Title = ({ text, size = 25, marginBottom = 0, marginTop = 0, marginLeft = 0, marginRight = 0, color = "black", fontWeight = 700, isStrikethrough = false, horizontalAlign = "flex-start", lineHeight = 1.5, required }) => {
    return (_jsx(_Fragment, { children: _jsx("div", { className: styles["title-new"], style: {
                fontSize: `${size}px`,
                marginTop: `${marginTop}rem`,
                marginRight: `${marginRight}rem`,
                marginLeft: `${marginLeft}rem`,
                marginBottom: `${marginBottom}rem`,
                color: `${color}`,
                fontWeight: `${fontWeight}`,
                textDecoration: isStrikethrough ? "line-through" : "none",
                justifyContent: `${horizontalAlign}`,
                width: "100%",
                textAlign: horizontalAlign === "flex-start" ? "left" : horizontalAlign === "flex-end" ? "right" : horizontalAlign === "center" ? "center" : "initial",
                lineHeight: `${lineHeight}rem`
            }, children: _jsxs("span", { children: [text, required && _jsx("span", { className: styles["required"], children: "*" })] }) }) }));
};
export default Title;
