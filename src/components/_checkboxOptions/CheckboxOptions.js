import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox } from "antd";
import Section from "../areas/_section/Section";
import Title from "../texts/_title/Title";
import { useState } from "react";
import styled from "styled-components";
const Div = styled.div `
.area-1{
    display: flex;
    gap: 1rem !important;
    flex-wrap: wrap;

.area-elements{
    display: flex;
    align-items: center;

    img{
        width: 3.5rem;
        margin-right: 1rem;
    }

    #item{
        display: flex;

        &.row{
            flex-direction: row;
        }

        &.row-reverse{
            flex-direction: row-reverse;
        }
    }
}
    
}
`;
const CheckboxOptions = ({ marginBottom = 0, marginTop = 0, marginLeft = 0, marginRight = 0, onChange = () => null, options, position = "flex-start", value, name = "", checkboxPosition = "row", onChangeOption = () => null }) => {
    const [valueCheckbox, setValueCheckbox] = useState([]);
    return (_jsx(_Fragment, { children: _jsx(Div, { style: {
                marginBottom: `${marginBottom}rem`,
                marginTop: `${marginTop}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
            }, children: _jsx(Checkbox.Group, { name: name, onChange: (event) => {
                    onChange(event);
                    setValueCheckbox(event);
                }, value: value ? value : valueCheckbox, children: _jsx("div", { className: "area-1", style: {
                        justifyContent: position
                    }, children: options.map((checkbox, index) => (_jsx(Section, { marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 0.5, fluid: false, resizeAdjust: false, shadow: false, border: { color: checkbox.disabled ? "#e0457b" : "#ACACAC", size: 1, radius: 15 }, children: _jsxs("div", { className: "area-elements", children: [checkbox.img &&
                                    _jsx("img", { src: checkbox.img, alt: "icon-card-money" }), _jsxs("div", { id: "item", className: checkboxPosition === "row" ?
                                        "row" : "row-reverse", children: [_jsx(Checkbox, { disabled: checkbox.disabled, onChange: (event) => {
                                                if (event.target.checked) {
                                                    onChangeOption({ option: event.target.value, checked: event.target.checked });
                                                }
                                                else {
                                                    onChangeOption({ option: event.target.value, checked: event.target.checked });
                                                }
                                            }, value: checkbox.value }), checkboxPosition === "row" ?
                                            _jsx(Title, { marginLeft: 0.5, text: checkbox.text, size: 14, color: "#707070" }) :
                                            _jsx(Title, { marginRight: 0.5, text: checkbox.text, size: 14, color: "#707070" })] })] }) }, index))) }) }) }) }));
};
export default CheckboxOptions;
