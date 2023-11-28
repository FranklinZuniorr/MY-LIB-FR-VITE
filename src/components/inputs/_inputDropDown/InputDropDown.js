import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./InputDropDown.module.scss";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import { createPortal } from "react-dom";
import xmarkSolid from "../../../assets/images/icons/xmark-solid-purple.svg";
import chevronBottom from "../../../assets/images/icons/chevron-bottom.svg";
const InputDropdown = ({ marginTop = 1, marginBottom = 1, marginLeft = 0, marginRight = 0, placeholder = "", width = { size: 0, type: "rem", resizeAdjust: true }, defaultValue = "", value, onChange = () => null, onSearch = () => null, label = { value: "", requiredInput: false, color: "#707070" }, clearable = false, disabled = false, error = { isError: false, text: "Um texto vai aqui!" }, options = [], removeOptionsRepeated = false, searchable, icon, name = "" }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [isFocus, setIsFocus] = useState(false);
    const [isSelectedByOptions, setIsSelectedByOptions] = useState(true);
    const [dataSearch, setDataSearch] = useState([]);
    const [search, setSearch] = useState("");
    const [optionSelectedIndex, setOptionSelectedIndex] = useState(-1);
    const [isOptionSelectedIndex, setIsOptionSelectedIndex] = useState(false);
    const [eventTarget, setEventTarget] = useState();
    const input = document.getElementsByClassName(styles["dropdown-area"])[0];
    const fixPositionAreaOptions = (event) => {
        const target = event.target;
        if (options.length > 0) {
            const targetHeight = target.getBoundingClientRect().height;
            const targetY = target.getBoundingClientRect().y + targetHeight;
            const targetX = target.getBoundingClientRect().x;
            const targetWidth = target.getBoundingClientRect().width;
            setTimeout(() => {
                const areaOptions = document.getElementsByClassName(styles["area-options"])[0];
                if (areaOptions) {
                    areaOptions.style.opacity = "1";
                    areaOptions.style.zIndex = "99999999999";
                    areaOptions.style.top = `${targetY}px`;
                    areaOptions.style.left = `${targetX}px`;
                    areaOptions.style.width = `${targetWidth}px`;
                    if (areaOptions.getBoundingClientRect().bottom > window.innerHeight) {
                        areaOptions.style.bottom = "0.5rem";
                    }
                }
            }, 1);
        }
    };
    const searchOptions = (text) => {
        const filter = (removeOptionsRepeated !== false ? filterRepeatedOptions() : options).filter((item) => JSON.stringify(item).toLowerCase().includes(text.toLowerCase()));
        if (filter.length > 0) {
            setIsFocus(true);
            return filter;
        }
        setIsFocus(false);
        return options;
    };
    const filterRepeatedOptions = () => {
        if (removeOptionsRepeated !== false) {
            const filter = [];
            options.forEach((item) => {
                if (!filter.find((option) => option[removeOptionsRepeated] === item[removeOptionsRepeated])) {
                    filter.push(item);
                }
            });
            return filter;
        }
        return [];
    };
    useEffect(() => {
        if (value) {
            setSearch(value);
        }
    }, [value]);
    useEffect(() => {
        if (options.length > 0) {
            if (isFocus) {
                const elementsWithTabIndex1 = document.getElementById(`item-${optionSelectedIndex}`);
                /* console.log(elementsWithTabIndex1) */
                elementsWithTabIndex1.focus();
            }
        }
    }, [optionSelectedIndex]);
    useEffect(() => {
        if (eventTarget) {
            fixPositionAreaOptions(eventTarget);
        }
    }, [options]);
    useEffect(() => {
        document.addEventListener("click", (event) => {
            const target = event.target;
            if (target.parentElement?.id !== "dropdown-area-parent") {
                setIsFocus(false);
            }
        });
        window.addEventListener("resize", (event) => {
            setIsFocus(false);
        });
        window.addEventListener("scroll", (event) => {
            const target = event.target;
            if (target.className != undefined) {
                if (!target.className.includes("area-options")) {
                    setIsFocus(false);
                }
            }
            else {
                setIsFocus(false);
            }
        }, true);
        return () => {
            removeEventListener("click", (event) => {
                const target = event.target;
                if (target.parentElement?.id !== "dropdown-area-parent") {
                    setIsFocus(false);
                }
            });
            removeEventListener("resize", (event) => {
                const target = event.target;
                if (!target.className.includes("area-options")) {
                    setIsFocus(false);
                }
            }, true);
        };
    }, []);
    const downOptions = () => {
        const newValue = optionSelectedIndex + 1;
        const optionsNew = !isSelectedByOptions && !searchable?.async ? dataSearch : options;
        setIsOptionSelectedIndex(true);
        if (eventTarget) {
            setTimeout(() => {
                fixPositionAreaOptions(eventTarget);
            }, 1);
        }
        if (newValue > optionsNew.length - 1) {
            setOptionSelectedIndex(0);
            setInputValue(optionsNew[0].value);
            onChange({ data: optionsNew[0] });
            return;
        }
        setInputValue(optionsNew[newValue].value);
        onChange({ data: optionsNew[newValue] });
        setOptionSelectedIndex(newValue);
    };
    const upOptions = () => {
        const newValue = optionSelectedIndex - 1;
        const optionsNew = !isSelectedByOptions && !searchable?.async ? dataSearch : options;
        const maxLength = optionsNew.length - 1;
        setIsOptionSelectedIndex(true);
        if (eventTarget) {
            setTimeout(() => {
                fixPositionAreaOptions(eventTarget);
            }, 1);
        }
        if (newValue < 0) {
            setOptionSelectedIndex(maxLength);
            setInputValue(optionsNew[maxLength].value);
            onChange({ data: optionsNew[maxLength] });
            return;
        }
        setInputValue(optionsNew[newValue].value);
        onChange({ data: optionsNew[newValue] });
        setOptionSelectedIndex(optionSelectedIndex - 1);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { style: {
                marginTop: `${marginTop}rem`,
                marginBottom: `${marginBottom}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
                [width.resizeAdjust ? "maxWidth" : "width"]: width.size === 0 ? "100%" : `${width.size}${width.type}`,
                opacity: disabled ? "0.5" : "1",
            }, className: styles["dropdown-qd"], children: [label.value !== "" && (_jsxs("label", { style: {
                        color: error.isError ? "#e0457b" : label.color,
                    }, children: [label.value, label.requiredInput ? _jsx("span", { style: { color: "#e0457b" }, children: " *" }) : ""] })), _jsxs("div", { id: "dropdown-area-parent", className: styles["dropdown-area"], children: [_jsx("input", { name: name, autoComplete: "off", "data-testid": "input", id: styles["input-dropdown"], value: searchable ?
                                options.find(item => {
                                    if (item.value === search) {
                                        return item;
                                    }
                                    if (item.key === search) {
                                        return item;
                                    }
                                    if (item.text === search) {
                                        return item;
                                    }
                                })?.text || search
                                : value !== undefined ? options.find(item => {
                                    if (item.value === value) {
                                        return item;
                                    }
                                    if (item.key === value) {
                                        return item;
                                    }
                                    if (item.text === value) {
                                        return item;
                                    }
                                })?.text || value : inputValue, disabled: disabled, onKeyDown: (ev) => {
                                if (ev.code === "ArrowUp") {
                                    ev.preventDefault();
                                    upOptions();
                                }
                                if (ev.code === "ArrowDown") {
                                    ev.preventDefault();
                                    downOptions();
                                }
                            }, readOnly: !searchable, onClick: (event) => {
                                setIsOptionSelectedIndex(false);
                                if (options.length > 0) {
                                    setIsSelectedByOptions(true);
                                    setIsFocus(!isFocus);
                                    fixPositionAreaOptions(event);
                                }
                                setEventTarget(event);
                            }, onBlurCapture: (ev) => {
                                if (!ev.relatedTarget?.className.includes("item")) {
                                    setIsFocus(false);
                                    setOptionSelectedIndex(-1);
                                }
                            }, className: isFocus && options.length > 0 ? styles["focus"] : styles["no-focus"], style: {
                                cursor: searchable ? "text" : "pointer",
                                borderColor: error.isError ? "#e0457b" : "initial",
                                fontWeight: (value && value.length > 0) || inputValue.length > 0 ? "600" : "initial",
                                paddingLeft: icon ? "2.5rem" : "1rem"
                            }, placeholder: placeholder, onChange: (event) => {
                                const text = event.target.value;
                                setIsSelectedByOptions(false);
                                setIsFocus(true);
                                setIsOptionSelectedIndex(false);
                                !searchable?.async && setDataSearch(searchOptions(text));
                                onSearch(text);
                                setSearch(text);
                                setInputValue("");
                                searchable && onChange({
                                    data: {
                                        key: "",
                                        text: "",
                                        value: ""
                                    }
                                });
                                setEventTarget(event);
                                if (eventTarget) {
                                    setTimeout(() => {
                                        fixPositionAreaOptions(event);
                                    }, 1);
                                }
                            } }), icon &&
                            _jsx("div", { className: styles["area-icon"], children: _jsx("img", { className: styles["icon"], src: icon, alt: "icon" }) }), _jsxs("div", { className: styles["area-images"], children: [(clearable && !disabled) && (value === undefined && inputValue.length > 0 || value !== undefined && value.length > 0) && (_jsx("img", { "data-testid": "remove-text", className: styles["remove-text"], src: xmarkSolid, alt: "icon", onClick: () => {
                                        /* console.log("roy"); */
                                        setIsSelectedByOptions(true);
                                        setInputValue("");
                                        setSearch("");
                                        onChange({
                                            data: {
                                                key: "",
                                                text: "",
                                                value: "",
                                            },
                                        });
                                    } })), _jsx("img", { id: styles["arrow-info"], className: isFocus && options.length > 0 ? styles["up"] : styles["down"], src: chevronBottom, alt: "arrow-info" })] }), (isFocus && options.length > 0) && (createPortal(_jsxs("div", { onKeyDown: (ev) => {
                                if (ev.code === "Enter") {
                                    const optionsNew = !isSelectedByOptions && !searchable?.async ? dataSearch : options;
                                    setInputValue(optionsNew[optionSelectedIndex].value);
                                    onChange({ data: optionsNew[optionSelectedIndex] });
                                    setIsFocus(false);
                                    setOptionSelectedIndex(-1);
                                }
                                if (ev.code === "ArrowUp") {
                                    ev.preventDefault();
                                    upOptions();
                                }
                                if (ev.code === "ArrowDown") {
                                    ev.preventDefault();
                                    downOptions();
                                }
                            }, onBlurCapture: (ev) => {
                                if (!ev.relatedTarget) {
                                    setIsFocus(false);
                                    setOptionSelectedIndex(-1);
                                    const areaOptions = document.getElementsByClassName(styles["area-options"])[0];
                                    areaOptions.style.display = "none";
                                }
                            }, "data-testid": "area-options", style: {
                                top: input.getBoundingClientRect().top + input.offsetHeight || "",
                                width: input.getBoundingClientRect().width || "",
                                opacity: 0
                            }, className: styles["area-options"], children: [isSelectedByOptions &&
                                    options.map((item, index) => (_jsxs("div", { tabIndex: index, style: {
                                            backgroundColor: !isOptionSelectedIndex ?
                                                value ?
                                                    (item.text === value || item.value === value) ? "#eaeaea" : "none"
                                                    :
                                                        (item.text === inputValue || item.value === inputValue) ? "#eaeaea" : "none" : "none",
                                        }, onMouseDown: (event) => {
                                            event.preventDefault();
                                            setIsSelectedByOptions(true);
                                            setInputValue(item.text);
                                            setSearch(item.text);
                                            onChange({ data: item });
                                            setIsFocus(false);
                                        }, className: styles["item"], id: `item-${index}`, children: [item.img &&
                                                _jsx("img", { src: item.img, alt: "img-option" }), item.text] }, item.key))), !isSelectedByOptions &&
                                    (!searchable?.async ? dataSearch : options).map((item, index) => (_jsxs("div", { tabIndex: index, onMouseDown: (event) => {
                                            event.preventDefault();
                                            setIsSelectedByOptions(true);
                                            setInputValue(item.text);
                                            setSearch(item.text);
                                            onChange({ data: item });
                                            setIsFocus(false);
                                        }, className: styles["item"], id: `item-${index}`, children: [item.img &&
                                                _jsx("img", { src: item.img, alt: "img-option" }), item.text] }, item.key)))] }), document.body))] }), _jsx(LineBarGroupUnid, { marginTop: 0, positionGroups: "flex-start", unidGroups: [
                        {
                            unid: _jsx(_Fragment, { children: error.isError &&
                                    _jsx(Title, { text: error.text, size: 14, marginTop: 0, marginBottom: -0.5, horizontalAlign: "flex-end", color: "#e0457b", fontWeight: 500 }) }),
                            style: `
                     word-break: break-word;
                     `
                        }
                    ] })] }) }));
};
export default InputDropdown;
