import { useState, useEffect } from "react";
import styles from "./InputDropDown.module.scss";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import { createPortal } from "react-dom";
import xmarkSolid from "../../../assets/images/icons/xmark-solid-purple.svg";
import chevronBottom from "../../../assets/images/icons/chevron-bottom.svg";

interface IData {
   data: IOption;
}
interface ILabel {
   value: string;
   requiredInput: boolean;
   color?: string;
}
interface IError {
   text: string;
   isError: boolean;
}

interface IWidth {
   type: "px" | "%" | "em" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "cm" | "mm" | "in" | "pt";
   size: number;
   resizeAdjust: boolean;
}

interface IOption {
   key: string;
   value: any;
   text: string;
   img?: string;
}

interface ISearchable {
   async: boolean;
}

interface IInputDropdownProps {
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   placeholder?: string;
   width?: IWidth;
   icon?: string;
   value?: string;
   onChange?: (data: IData) => void;
   onSearch?: (search: string) => void;
   label?: ILabel;
   clearable?: boolean;
   disabled?: boolean;
   error?: IError;
   options: Array<IOption>;
   removeOptionsRepeated?: "key" | "value" | "text" | false;
   defaultValue?: string;
   searchable?: ISearchable;
   name?: string;
}

const InputDropdown: React.FC<IInputDropdownProps> = ({
   marginTop = 1,
   marginBottom = 1,
   marginLeft = 0,
   marginRight = 0,
   placeholder = "",
   width = { size: 0, type: "rem", resizeAdjust: true },
   defaultValue = "",
   value,
   onChange = () => null,
   onSearch = () => null,
   label = { value: "", requiredInput: false, color: "#707070" },
   clearable = false,
   disabled = false,
   error = { isError: false, text: "Um texto vai aqui!" },
   options = [],
   removeOptionsRepeated = false,
   searchable,
   icon,
   name = ""
}) => {
   const [inputValue, setInputValue] = useState<string>(defaultValue);
   const [isFocus, setIsFocus] = useState<boolean>(false);
   const [isSelectedByOptions, setIsSelectedByOptions] = useState<boolean>(true);
   const [dataSearch, setDataSearch] = useState<Array<IOption>>([]);
   const [search, setSearch] = useState<string>("");
   const [optionSelectedIndex, setOptionSelectedIndex] = useState<number>(-1);
   const [isOptionSelectedIndex, setIsOptionSelectedIndex] = useState<boolean>(false);

   const [eventTarget, setEventTarget] = useState<React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>>();

   const input = document.getElementsByClassName(styles["dropdown-area"])[0] as HTMLElement;
   
   const fixPositionAreaOptions = (event: Event | React.MouseEvent<HTMLInputElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>) => {
      const target: HTMLElement = event.target as HTMLElement;
      if(options.length > 0){
         const targetHeight: number = target.getBoundingClientRect().height;
         const targetY: number = target.getBoundingClientRect().y+targetHeight;
         const targetX: number = target.getBoundingClientRect().x;
         const targetWidth: number = target.getBoundingClientRect().width;
   
         setTimeout(() => {
            const areaOptions = document.getElementsByClassName(styles["area-options"])[0] as HTMLElement;
            if(areaOptions){
               areaOptions.style.opacity = "1";
               areaOptions.style.zIndex = "99999999999"
               areaOptions.style.top = `${targetY}px`;
               areaOptions.style.left = `${targetX}px`;
               areaOptions.style.width = `${targetWidth}px`;
               if(areaOptions.getBoundingClientRect().bottom > window.innerHeight){
                  areaOptions.style.bottom = "0.5rem"
               }
            }
         }, 1);
      }
   }

   const searchOptions = (text: string): Array<IOption> => {
      const filter = (removeOptionsRepeated !== false ? filterRepeatedOptions() : options).filter(
         (item) =>
            JSON.stringify(item).toLowerCase().includes(text.toLowerCase())
      );
      if (filter.length > 0) {
         setIsFocus(true);
         return filter;
      }

      setIsFocus(false);
      return options;
   };

   const filterRepeatedOptions = () => {
      if (removeOptionsRepeated !== false) {
         const filter: Array<IOption> = [];

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
      if(value){
         setSearch(value);
      }
   }, [value])

   useEffect(() => {
      if(options.length > 0){
         if(isFocus){
            const elementsWithTabIndex1:any = document.getElementById(`item-${optionSelectedIndex}`);
            /* console.log(elementsWithTabIndex1) */
            elementsWithTabIndex1.focus();
         }
      }
   }, [optionSelectedIndex])

   useEffect(() => {
      if(eventTarget){
         fixPositionAreaOptions(eventTarget);
      }
   }, [options])

   useEffect(() => {
      document.addEventListener("click", (event) => {
         const target: HTMLElement = event.target as HTMLElement;
         if(target.parentElement?.id !== "dropdown-area-parent"){
            setIsFocus(false);
         }
      })

      window.addEventListener("resize", (event) => {
         setIsFocus(false);
      })

      window.addEventListener("scroll", (event) => {
         const target = event.target as HTMLElement;
         if(target.className != undefined){
            if(!target.className.includes("area-options")){
               setIsFocus(false);
            }
         }else{
            setIsFocus(false);
         }
      }, true)

      return () => {
         removeEventListener("click", (event) => {
            const target: HTMLElement = event.target as HTMLElement;
            if(target.parentElement?.id !== "dropdown-area-parent"){
               setIsFocus(false);
            }
         });
         removeEventListener("resize", (event) => {
            const target = event.target as HTMLElement;
            if(!target.className.includes("area-options")){
               setIsFocus(false);
            }
         }, true);
      }
   }, [])

   const downOptions = (): void => {
      const newValue = optionSelectedIndex+1;
      const optionsNew = !isSelectedByOptions && !searchable?.async? dataSearch:options;
      setIsOptionSelectedIndex(true);
      if(eventTarget){
         setTimeout(() => {
            fixPositionAreaOptions(eventTarget);
         }, 1);
      }
      
      if(newValue > optionsNew.length - 1){
         setOptionSelectedIndex(0);
         setInputValue(optionsNew[0].value);
         onChange({data: optionsNew[0]});
         return
      }
      setInputValue(optionsNew[newValue].value);
      onChange({data: optionsNew[newValue]});
      setOptionSelectedIndex(newValue);
   }

   const upOptions = (): void => {
      const newValue = optionSelectedIndex-1;
      const optionsNew = !isSelectedByOptions && !searchable?.async? dataSearch:options;
      const maxLength = optionsNew.length - 1;
      setIsOptionSelectedIndex(true);
      if(eventTarget){
         setTimeout(() => {
            fixPositionAreaOptions(eventTarget);
         }, 1);
      }
      
      if(newValue < 0){
         setOptionSelectedIndex(maxLength);
         setInputValue(optionsNew[maxLength].value);
         onChange({data: optionsNew[maxLength]});
         return
      }
      setInputValue(optionsNew[newValue].value);
      onChange({data: optionsNew[newValue]});
      setOptionSelectedIndex(optionSelectedIndex-1);
   }

   return (
      <>
         <div
            style={{
               marginTop: `${marginTop}rem`,
               marginBottom: `${marginBottom}rem`,
               marginLeft: `${marginLeft}rem`,
               marginRight: `${marginRight}rem`,
               [width.resizeAdjust ? "maxWidth" : "width"]: width.size === 0 ? "100%" : `${width.size}${width.type}`,
               opacity: disabled ? "0.5" : "1",
            }}
            className={styles["dropdown-qd"]}
         >
            {label.value !== "" && (
               <label
                  style={{
                     color: error.isError ? "#e0457b" : label.color,
                  }}
               >
                  {label.value}
                  {label.requiredInput ? <span style={{ color: "#e0457b" }}> *</span> : ""}
               </label>
            )}
            <div id="dropdown-area-parent" className={styles["dropdown-area"]}>
               <input
                  name={name}
                  autoComplete="off"
                  data-testid="input"
                  id={styles["input-dropdown"]}
                  value={
                     searchable? 
                     options.find(item => {
                        if(item.value === search){return item}
                        if(item.key === search){return item}
                        if(item.text === search){return item}
                     })?.text || search
                     :value !== undefined? options.find(item => {
                        if(item.value === value){return item}
                        if(item.key === value){return item}
                        if(item.text === value){return item}
                     })?.text || value:inputValue
                  }
                  disabled={disabled}
                  onKeyDown={(ev) => {
                     if(ev.code === "ArrowUp"){
                        ev.preventDefault();
                        upOptions();
                     }
                     if(ev.code === "ArrowDown"){
                        ev.preventDefault();
                        downOptions();
                     }
                  }}
                  readOnly={!searchable}
                  onClick={(event) => {
                     setIsOptionSelectedIndex(false);
                     if(options.length > 0){
                        setIsSelectedByOptions(true);
                        setIsFocus(!isFocus);
                        fixPositionAreaOptions(event);
                     }
                     setEventTarget(event);
                  }}
                  onBlurCapture={(ev) => {
                     if(!ev.relatedTarget?.className.includes("item")){
                        setIsFocus(false);
                        setOptionSelectedIndex(-1);
                     }
                  }}
                  className={isFocus && options.length > 0? styles["focus"] : styles["no-focus"]}
                  style={{
                     cursor: searchable ? "text" : "pointer",
                     borderColor: error.isError ? "#e0457b" : "initial",
                     fontWeight: (value && value.length > 0) || inputValue.length > 0 ? "600":"initial",
                     paddingLeft: icon? "2.5rem":"1rem"
                  }}
                  placeholder={placeholder}
                  onChange={(event) => {
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
                     })
                     setEventTarget(event);
                     if(eventTarget){
                        setTimeout(() => {
                           fixPositionAreaOptions(event);
                        }, 1);
                     }
                  }}
               />
               {
                  icon &&
                  <div className={styles["area-icon"]}>
                     <img
                        className={styles["icon"]}
                        src={icon}
                        alt="icon"
                     />
                  </div>
               }
               <div className={styles["area-images"]}>
                  {(clearable && !disabled) && (value === undefined && inputValue.length > 0 || value !== undefined && value.length > 0) && (
                     <img
                        data-testid="remove-text"
                        className={styles["remove-text"]}
                        src={xmarkSolid}
                        alt="icon"
                        onClick={() => {
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
                        }}
                     />
                  )}
                  <img
                     id={styles["arrow-info"]}
                     className={isFocus && options.length > 0? styles["up"] : styles["down"]}
                     src={chevronBottom}
                     alt="arrow-info"
                  />
               </div>
               {/* (isFocus && options.length > 0) */}
               {(isFocus && options.length > 0) && (
                  createPortal(
                  <div 
                  onKeyDown={(ev) => {
                     if(ev.code === "Enter"){
                        const optionsNew = !isSelectedByOptions && !searchable?.async? dataSearch:options;
                        setInputValue(optionsNew[optionSelectedIndex].value);
                        onChange({data: optionsNew[optionSelectedIndex]});
                        setIsFocus(false);
                        setOptionSelectedIndex(-1);
                     }
                     if(ev.code === "ArrowUp"){
                        ev.preventDefault();
                        upOptions();
                     }
                     if(ev.code === "ArrowDown"){
                        ev.preventDefault();
                        downOptions();
                     }
                  }} 
                  onBlurCapture={(ev) => {
                     if(!ev.relatedTarget){
                        setIsFocus(false);
                        setOptionSelectedIndex(-1);
                        const areaOptions = document.getElementsByClassName(styles["area-options"])[0] as HTMLElement;
                        areaOptions.style.display = "none";
                     }
                  }}
                  data-testid="area-options" 
                  style={{
                     top: input.getBoundingClientRect().top+input.offsetHeight || "",
                     width: input.getBoundingClientRect().width || "",
                     opacity: 0
                  }} 
                  className={styles["area-options"]}
                  >
                     {isSelectedByOptions &&
                        options.map((item, index) => (
                           <div
                              tabIndex={index}
                              style={{
                                 backgroundColor:
                                    !isOptionSelectedIndex?
                                    value?
                                    (
                                       item.text === value || item.value === value
                                    )? "#eaeaea": "none"
                                    :
                                    (
                                       item.text === inputValue || item.value === inputValue
                                    )? "#eaeaea": "none":"none"
                                    ,
                              }}
                              onMouseDown={(event) => {
                                 event.preventDefault();
                                 setIsSelectedByOptions(true);
                                 setInputValue(item.text);
                                 setSearch(item.text);
                                 onChange({ data: item });
                                 setIsFocus(false);
                              }}
                              key={item.key}
                              className={styles["item"]}
                              id={`item-${index}`}
                           >
                              {
                                 item.img &&
                                 <img src={item.img} alt="img-option" />
                              }
                              {item.text}
                           </div>
                        ))}
                     {!isSelectedByOptions &&
                        (!searchable?.async? dataSearch:options).map((item, index) => (
                           <div
                              tabIndex={index}
                              onMouseDown={(event) => {
                                 event.preventDefault();
                                 setIsSelectedByOptions(true);
                                 setInputValue(item.text);
                                 setSearch(item.text);
                                 onChange({ data: item });
                                 setIsFocus(false);
                              }}
                              key={item.key}
                              className={styles["item"]}  
                              id={`item-${index}`}
                           >
                              {
                                 item.img &&
                                 <img src={item.img} alt="img-option" />
                              }
                              {item.text}
                           </div>
                        ))}
                  </div>,
                  document.body,
                  )
               )}
            </div>

            <LineBarGroupUnid 
               marginTop={0}
               positionGroups="flex-start"
               unidGroups={[
                  {
                     unid:
                     <>
                        {
                           error.isError &&
                           <Title
                              text={error.text}
                              size={14}
                              marginTop={0}
                              marginBottom={-0.5}
                              horizontalAlign="flex-end"
                              color="#e0457b"
                              fontWeight={500}
                           />
                        }
                     </>,
                     style: `
                     word-break: break-word;
                     `
                  }
               ]}
            />
         </div>
      </>
   );
};

export default InputDropdown;
