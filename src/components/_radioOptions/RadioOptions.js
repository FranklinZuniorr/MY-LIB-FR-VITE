import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Radio } from "antd";
import Section from "../areas/_section/Section";
import Title from "../texts/_title/Title";
import { useState } from "react";
import styled from "styled-components";
const Div = styled.div `
.area-1{
    display: flex;
    gap: 1rem !important;
    flex-wrap: wrap;
    
    .item{
        display: flex;
    }
}
`;
const RadioOptions = ({ marginBottom = 0, marginTop = 0, marginLeft = 0, marginRight = 0, onChange = () => null, options, position = "flex-start", value, name = "" }) => {
    const [valueRadio, setValueRadio] = useState("");
    return (_jsx(_Fragment, { children: _jsx(Div, { style: {
                marginBottom: `${marginBottom}rem`,
                marginTop: `${marginTop}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
            }, children: _jsx(Radio.Group, { name: name, onChange: (event) => {
                    onChange(event.target.value);
                    setValueRadio(event.target.value);
                }, value: value ? value : valueRadio, children: _jsx("div", { className: "area-1", style: {
                        justifyContent: position
                    }, children: options.map((radio, index) => (_jsx(Section, { marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 0.5, fluid: false, resizeAdjust: false, shadow: false, border: { color: "#ACACAC", size: 1, radius: 15 }, children: _jsxs("div", { className: "item", children: [_jsx(Radio, { value: radio.value }), _jsx(Title, { marginLeft: 0.5, text: radio.text, size: 14, color: "#707070" })] }) }, index))) }) }) }) }));
};
export default RadioOptions;
