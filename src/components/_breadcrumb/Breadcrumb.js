import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
const Div = styled.div `
   font-weight: 500;
   color: $neutral-color-low-light;
   font-feature-settings:
      "clig" off,
      "liga" off;
   font-family: Montserrat;
   font-size: 16px;
   font-style: normal;
   font-weight: 500;
   line-height: 2rem;
   letter-spacing: 0.15px;
   word-break: break-all;

   span.separator {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: black !important;
      font-weight: 400 !important;
   }
`;
const Breadcrumb = ({ data }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Div, { children: data.map((item, index) => (_jsxs("span", { style: {
                        color: item.active ? "#9B4DEE" : item.to ? "#8686ff" : "#707070",
                        cursor: item.to !== "" ? "pointer" : "default",
                        fontWeight: item.active ? "bolder" : "normal",
                    }, onClick: () => {
                        if (item.to !== "") {
                            window.location.href = item.to;
                        }
                    }, children: [item.name, _jsx("span", { className: "separator", children: index + 1 < data.length && "/" })] }, index))) }), _jsx("div", { className: "breadcrumb-new" })] }));
};
export default Breadcrumb;
