import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
const Div = styled.div `
   font-feature-settings:
      "clig" off,
      "liga" off;
   font-family: Montserrat;
   font-size: 18px;
   font-style: normal;
   font-weight: 700;
   letter-spacing: 0.15px;
   display: flex;

   .required{
      margin-left: 0.3rem;
      color: $partners-brand-color-secondary-400
   }
`;
const Title = ({ text, size = 25, marginBottom = 0, marginTop = 0, marginLeft = 0, marginRight = 0, color = "black", fontWeight = 700, isStrikethrough = false, horizontalAlign = "flex-start", lineHeight = 1.5, required }) => {
    return (_jsx(_Fragment, { children: _jsx(Div, { style: {
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
            }, children: _jsxs("span", { children: [text, required && _jsx("span", { className: "required", children: "*" })] }) }) }));
};
export default Title;
