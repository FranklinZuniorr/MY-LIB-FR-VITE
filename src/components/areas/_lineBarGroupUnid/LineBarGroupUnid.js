import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./LineBarGroupUnid.module.scss";
import styled from "styled-components";
const DivGroup = styled.div `${props => props.$style}`;
const LineBarGroupUnid = ({ unidGroups = [], positionGroups = "flex-start", marginTop = 0, marginBottom = 0, marginLeft = 0, marginRight = 0, style }) => {
    return (_jsx(_Fragment, { children: _jsx("div", { style: {
                ...style,
                justifyContent: positionGroups,
                marginTop: `${marginTop}rem`,
                marginBottom: `${marginBottom}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
            }, "data-testid": "line", className: styles["line-bar-group-unid"], children: unidGroups.map((group, index) => (_jsx(DivGroup, { "$style": group.style, "data-testid": "group", className: styles["group"], children: group.unid }, index))) }) }));
};
export default LineBarGroupUnid;
