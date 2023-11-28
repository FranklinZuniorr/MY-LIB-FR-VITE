import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./InputBordered.module.scss";
import Title from "../../texts/_title/Title";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import xmarkSolid from "../../../assets/images/icons/xmark-solid.svg";
const InputBordered = ({ marginTop = 1, marginBottom = 1, marginLeft = 0, marginRight = 0, placeholder = "", width = { size: 0, type: "rem", resizeAdjust: true }, icon = "", defaultValue = "", value, onChange = () => null, label = { value: "", requiredInput: false, color: "#707070" }, maxCaracteres = 0, disabled = false, error = { isError: false, text: "Um texto vai aqui!" }, name = "", clearable = true, type = "text" }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const sliceText = (text) => {
        const filter = text.slice(0, maxCaracteres);
        return filter;
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { style: {
                marginTop: `${marginTop}rem`,
                marginBottom: `${marginBottom}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
                [width.resizeAdjust ? "maxWidth" : "width"]: width.size === 0 ? "100%" : `${width.size}${width.type}`,
                opacity: disabled ? "0.5" : "1",
            }, className: styles["input-bordered"], children: [label.value !== "" && (_jsxs("label", { style: {
                        color: error.isError ? "#e0457b" : label.color,
                    }, children: [label.value, label.requiredInput ? _jsx("span", { style: { color: "#e0457b" }, children: " *" }) : ""] })), _jsxs("div", { className: styles["input-area"], children: [_jsx("input", { name: name, autoComplete: "off", type: type, disabled: disabled, value: value !== undefined ? value : inputValue, onChange: (ev) => {
                                if (maxCaracteres > 0) {
                                    setInputValue(sliceText(ev.target.value));
                                    onChange({
                                        value: sliceText(ev.target.value),
                                    });
                                }
                                else {
                                    setInputValue(ev.target.value);
                                    onChange({
                                        value: ev.target.value,
                                    });
                                }
                            }, placeholder: placeholder, style: {
                                paddingLeft: icon !== "" ? "3rem" : "1rem",
                                borderColor: error.isError ? "#e0457b" : "initial",
                            } }), icon !== "" && _jsx("img", { className: styles["info-feedback"], src: icon, alt: "icon" }), clearable &&
                            ((value === undefined && inputValue.length > 0) || (value !== undefined && value.length > 0)) && !disabled && (_jsx("img", { className: styles["remove-text"], src: xmarkSolid, alt: "icon", onClick: () => {
                                setInputValue("");
                                onChange({ value: "" });
                            } }))] }), _jsx(LineBarGroupUnid, { marginTop: 0, positionGroups: "space-between", style: { gap: "0" }, unidGroups: [
                        {
                            unid: _jsx(_Fragment, { children: error.isError &&
                                    _jsx(Title, { text: error.text, size: 14, marginTop: 0, marginBottom: -0.5, horizontalAlign: "flex-start", color: "#e0457b", fontWeight: 500 }) }),
                            style: `
                     word-break: break-word;
                     `
                        },
                        {
                            unid: _jsx(_Fragment, { children: maxCaracteres > 0 && (value !== undefined ?
                                    _jsx(Title, { text: value.length > 0 ? `${value.length}/${maxCaracteres} caracteres` : `0/${maxCaracteres} caracteres`, size: 13, marginTop: 0, marginBottom: 0, horizontalAlign: "flex-end", color: value.length >= maxCaracteres ? "#e0457b" : "grey", fontWeight: 500 }) :
                                    _jsx(Title, { text: `${inputValue.length}/${maxCaracteres} caracteres`, size: 13, marginTop: 0, marginBottom: 0, horizontalAlign: "flex-end", color: inputValue.length >= maxCaracteres ? "#e0457b" : "grey", fontWeight: 500 })) }),
                            style: `
                     `
                        }
                    ] })] }) }));
};
export default InputBordered;
