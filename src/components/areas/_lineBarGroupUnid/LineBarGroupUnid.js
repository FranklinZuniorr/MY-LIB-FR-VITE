import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
const DivGroup = styled.div `${props => props.$style}`;
const Div = styled.div `
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   gap: 1rem;

   /* @media only screen and (max-width: 1020px) {
      flex-direction: column;
   } */

   div.group {
   }
`;
const LineBarGroupUnid = ({ unidGroups = [], positionGroups = "flex-start", marginTop = 0, marginBottom = 0, marginLeft = 0, marginRight = 0, style }) => {
    return (_jsx(_Fragment, { children: _jsx(Div, { style: {
                ...style,
                justifyContent: positionGroups,
                marginTop: `${marginTop}rem`,
                marginBottom: `${marginBottom}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
            }, "data-testid": "line", children: unidGroups.map((group, index) => (_jsx(DivGroup, { "$style": group.style, "data-testid": "group", className: "group", children: group.unid }, index))) }) }));
};
export default LineBarGroupUnid;
