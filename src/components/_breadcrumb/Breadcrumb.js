import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./Breadcrumb.module.scss";
const Breadcrumb = ({ data }) => {
    return (_jsx(_Fragment, { children: _jsx("div", { className: styles["breadcrumb-new"], children: data.map((item, index) => (_jsxs("span", { style: {
                    color: item.active ? "#9B4DEE" : item.to ? "#8686ff" : "#707070",
                    cursor: item.to !== "" ? "pointer" : "default",
                    fontWeight: item.active ? "bolder" : "normal",
                }, onClick: () => {
                    if (item.to !== "") {
                        window.location.href = item.to;
                    }
                }, children: [item.name, _jsx("span", { className: styles["separator"], children: index + 1 < data.length && "/" })] }, index))) }) }));
};
export default Breadcrumb;
