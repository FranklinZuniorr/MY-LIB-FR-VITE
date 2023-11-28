import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import { createPortal } from "react-dom";
import xmarkSolid from "../../../assets/images/icons/xmark-solid-purple.svg";
import chevronBottom from "../../../assets/images/icons/chevron-bottom.svg";
import styled from "styled-components";
const Div = styled.div `
   position: relative;
   text-overflow: ellipsis;
   display: flex;
   align-items: flex-start;
   flex-direction: column;
   justify-content: flex-start;
   flex-grow: 1 !important;

   label {
      color: $partners-neutral-color-600;
      font-feature-settings:
         "clig" off,
         "liga" off;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0.15px;
   }

   div.dropdown-area {
      display: flex;
      align-items: center;
      width: 100%;

      input {
         border-radius: 10px;
         border: 1px solid $partners-neutral-color-400;
         background-color: $partners-base-color-white;
         height: 3rem;
         width: 100%;
         outline: 0;
         color: $partners-neutral-color-600;
         font-feature-settings:
            "clig" off,
            "liga" off;
         font-family: Montserrat;
         font-size: 14px;
         font-style: normal;
         font-weight: 500;
         line-height: 20px;
         letter-spacing: 0.25px;
         text-overflow: ellipsis;
         padding-right: 3rem;
         padding-left: 1rem;

         &.focus {
            border-radius: 0;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
         }

         &.no-focus {
            border-radius: 10px;
         }

         &::placeholder {
            color: $partners-neutral-color-400;
            font-feature-settings:
               "clig" off,
               "liga" off;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            letter-spacing: 0.25px;
         }
      }

      .area-images {
         position: absolute;
         right: 1rem;
         display: flex;
         align-items: center;
         pointer-events: none;

         img#arrow-info {
            pointer-events: none;
            cursor: unset;
            &.up {
               transform: rotate(180deg);
            }

            &.down {
               transform: rotate(0deg);
            }
         }

         img.remove-text {
            pointer-events: all;
         }
      }

      .area-icon {
         position: absolute;
         left: 1rem;
         display: flex;
         align-items: center;
         pointer-events: none;

         img.icon {
            width: 1.2rem;
            pointer-events: all;
         }
      }

      img.remove-text {
         position: absolute;
         right: 1rem;
         width: 1.4rem;
         height: 1.4rem;
         background-color: #dedede38;
         padding: 0.2rem;
         border-radius: 0.5rem;
         backdrop-filter: blur(1px);
         cursor: pointer;
      }
   }

   img.required {
      position: absolute;
      bottom: 11px;
      right: 16px;
      width: 1.4rem;
      height: 1.4rem;
      background-color: #dedede38;
      padding: 0.2rem;
      border-radius: 0.5rem;
      backdrop-filter: blur(1px);
   }
}

body{
   .area-options {
      background-color: $partners-base-color-white;
      border: 1px solid #707070;
      border-bottom-right-radius: 16px;
      border-bottom-left-radius: 16px;
      border-top: 0;
      width: inherit;
      max-height: 10rem;
      position: fixed !important;
      overflow-y: auto;
      transition: 0.1;
      z-index: 9999999999 !important;
      margin-top: 0;

      div.item:focus {
         outline: 0px solid black;
         border-top: 1px solid $partners-brand-color-primary-400;
         border-bottom: 1px solid $partners-brand-color-primary-400;
         border-radius: 0.5rem;
         background-color: $partners-brand-color-primary-800;
         margin: 0.2rem;
      }

      div.item {
         color: $partners-neutral-color-600;
         font-feature-settings:
            "clig" off,
            "liga" off;
         font-family: Montserrat;
         font-size: 15px;
         font-style: normal;
         font-weight: 600;
         line-height: 24px;
         letter-spacing: 0.15px;

         padding: 0.2rem;
         padding-left: 0.4rem;
         padding-right: 0.4rem;
         pointer-events: all;
         cursor: pointer;
         /* border-bottom: 1px solid $partners-neutral-color-400; */
         word-break: break-all;
         display: flex;
         align-items: center;

         img{
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.5rem;
         }

         &:hover {
            background-color: rgb(245, 245, 245);
         }
      }
   }
`;
const InputDropdown = ({ marginTop = 1, marginBottom = 1, marginLeft = 0, marginRight = 0, placeholder = "", width = { size: 0, type: "rem", resizeAdjust: true }, defaultValue = "", value, onChange = () => null, onSearch = () => null, label = { value: "", requiredInput: false, color: "#707070" }, clearable = false, disabled = false, error = { isError: false, text: "Um texto vai aqui!" }, options = [], removeOptionsRepeated = false, searchable, icon, name = "" }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [isFocus, setIsFocus] = useState(false);
    const [isSelectedByOptions, setIsSelectedByOptions] = useState(true);
    const [dataSearch, setDataSearch] = useState([]);
    const [search, setSearch] = useState("");
    const [optionSelectedIndex, setOptionSelectedIndex] = useState(-1);
    const [isOptionSelectedIndex, setIsOptionSelectedIndex] = useState(false);
    const [eventTarget, setEventTarget] = useState();
    const input = document.getElementsByClassName("dropdown-area")[0];
    const fixPositionAreaOptions = (event) => {
        const target = event.target;
        if (options.length > 0) {
            const targetHeight = target.getBoundingClientRect().height;
            const targetY = target.getBoundingClientRect().y + targetHeight;
            const targetX = target.getBoundingClientRect().x;
            const targetWidth = target.getBoundingClientRect().width;
            setTimeout(() => {
                const areaOptions = document.getElementsByClassName("area-options")[0];
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
    return (_jsx(_Fragment, { children: _jsxs(Div, { style: {
                marginTop: `${marginTop}rem`,
                marginBottom: `${marginBottom}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
                [width.resizeAdjust ? "maxWidth" : "width"]: width.size === 0 ? "100%" : `${width.size}${width.type}`,
                opacity: disabled ? "0.5" : "1",
            }, children: [label.value !== "" && (_jsxs("label", { style: {
                        color: error.isError ? "#e0457b" : label.color,
                    }, children: [label.value, label.requiredInput ? _jsx("span", { style: { color: "#e0457b" }, children: " *" }) : ""] })), _jsxs("div", { id: "dropdown-area-parent", className: "dropdown-area", children: [_jsx("input", { name: name, autoComplete: "off", "data-testid": "input", id: "input-dropdown", value: searchable ?
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
                            }, className: isFocus && options.length > 0 ? "focus" : "no-focus", style: {
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
                            _jsx("div", { className: "area-icon", children: _jsx("img", { className: "icon", src: icon, alt: "icon" }) }), _jsxs("div", { className: "area-images", children: [(clearable && !disabled) && (value === undefined && inputValue.length > 0 || value !== undefined && value.length > 0) && (_jsx("img", { "data-testid": "remove-text", className: "remove-text", src: xmarkSolid, alt: "icon", onClick: () => {
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
                                    } })), _jsx("img", { id: "arrow-info", className: isFocus && options.length > 0 ? "up" : "down", src: chevronBottom, alt: "arrow-info" })] }), (isFocus && options.length > 0) && (createPortal(_jsxs("div", { onKeyDown: (ev) => {
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
                                    const areaOptions = document.getElementsByClassName("area-options")[0];
                                    areaOptions.style.display = "none";
                                }
                            }, "data-testid": "area-options", style: {
                                top: input.getBoundingClientRect().top + input.offsetHeight || "",
                                width: input.getBoundingClientRect().width || "",
                                opacity: 0
                            }, className: "area-options", children: [isSelectedByOptions &&
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
                                        }, className: "item", id: `item-${index}`, children: [item.img &&
                                                _jsx("img", { src: item.img, alt: "img-option" }), item.text] }, item.key))), !isSelectedByOptions &&
                                    (!searchable?.async ? dataSearch : options).map((item, index) => (_jsxs("div", { tabIndex: index, onMouseDown: (event) => {
                                            event.preventDefault();
                                            setIsSelectedByOptions(true);
                                            setInputValue(item.text);
                                            setSearch(item.text);
                                            onChange({ data: item });
                                            setIsFocus(false);
                                        }, className: "item", id: `item-${index}`, children: [item.img &&
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
