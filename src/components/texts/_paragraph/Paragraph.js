import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
const Div = styled.div `
   color: $partners-neutral-color-700;
   font-feature-settings:
   "clig" off,
   "liga" off;
   font-family: Montserrat;
   font-style: normal;
   font-weight: 500;
   line-height: 24px;
   letter-spacing: 0.5px;
   display: flex;
`;
const Paragraph = ({ text, size = 20, marginBottom = 0, marginTop = 0, marginLeft = 0, marginRight = 0, isStrikethrough = false, horizontalAlign = "flex-start", opacity = 1 }) => {
    return (_jsx(_Fragment, { children: _jsx(Div, { style: {
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
