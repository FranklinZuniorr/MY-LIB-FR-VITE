import { useState } from "react";
import styles from "./TextArea.module.scss";
import Title from "../../texts/_title/Title";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import xMarkSolid from "../../../assets/images/icons/xmark-solid.svg";

interface IData {
   value: string;
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
interface ITextAreaProps {
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   placeholder?: string;
   width?: IWidth;
   height?: number;
   value?: string;
   onChange?: (data: IData) => void;
   label?: ILabel;
   color?: string;
   maxCaracteres?: number;
   disabled?: boolean;
   error?: IError;
   defaultValue?: string;
   name?: string;
}

const TextArea: React.FC<ITextAreaProps> = ({
   marginTop = 1,
   marginBottom = 1,
   marginLeft = 0,
   marginRight = 0,
   placeholder = "",
   width = { size: 0, type: "rem", resizeAdjust: true },
   height = 50,
   defaultValue = "",
   value,
   onChange = () => null,
   label = { value: "", requiredInput: false, color: "#707070" },
   maxCaracteres = 0,
   disabled = false,
   color = "#707070",
   error = { isError: false, text: "Um texto vai aqui!" },
   name = ""
}) => {
   const [inputValue, setInputValue] = useState<string>(defaultValue);

   const sliceText = (text: string): string => {
      const filter = text.slice(0, maxCaracteres);
      return filter;
   };

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
            className={styles["text-area"]}
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
            <div className={styles["text-area-group"]}>
               <textarea
                  name={name}
                  autoComplete="off"
                  disabled={disabled}
                  value={
                     value !== undefined? value:inputValue
                  }
                  onChange={(ev) => {
                     if(maxCaracteres > 0){
                        setInputValue(sliceText(ev.target.value));
                        onChange({
                           value: sliceText(ev.target.value),
                        });
                     }else{
                        setInputValue(ev.target.value);
                        onChange({
                           value: ev.target.value,
                        });
                     }
                  }}
                  placeholder={placeholder}
                  style={{
                     paddingLeft: "1rem",
                     minHeight: `${height}rem`,
                     maxHeight: `${height}rem`,
                     color: color,
                     borderColor: error.isError ? "#e0457b" : "initial",
                  }}
               />
               {((value === undefined && inputValue.length > 0) || (value !== undefined && value.length > 0)) && !disabled && (
                  <img
                     className={styles["remove-text"]}
                     src={xMarkSolid}
                     alt="icon"
                     onClick={() => {
                        setInputValue("");
                        onChange({ value: "" });
                     }}
                  />
               )}
            </div>

            <LineBarGroupUnid 
            marginTop={0}
            positionGroups="space-between"
            style={{gap: "0"}}
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
                           horizontalAlign="flex-start"
                           color="#e0457b"
                           fontWeight={500}
                        />
                     }
                  </>,
                  style: `
                  word-break: break-word;
                  `
               },
               {
                  unid: 
                  <>
                     {maxCaracteres > 0 && (
                        value !== undefined?
                        <Title
                           text={value.length > 0? `${value.length}/${maxCaracteres} caracteres`:`0/${maxCaracteres} caracteres`}
                           size={13}
                           marginTop={0}
                           marginBottom={0}
                           horizontalAlign="flex-end"
                           color={value.length >= maxCaracteres ? "#e0457b" : "grey"}
                           fontWeight={500}
                        />:
                        <Title
                           text={`${inputValue.length}/${maxCaracteres} caracteres`}
                           size={13}
                           marginTop={0}
                           marginBottom={0}
                           horizontalAlign="flex-end"
                           color={inputValue.length >= maxCaracteres ? "#e0457b" : "grey"}
                           fontWeight={500}
                        />
                     )}
                  </>,
                  style: `
                  `
               }
            ]}
            />
         </div>
      </>
   );
};

export default TextArea;
