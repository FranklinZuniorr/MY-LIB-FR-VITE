import { useState, useEffect } from "react";
import styles from "./InputPercent.module.scss";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import xMarkSolid from "../../../assets/images/icons/xmark-solid.svg";

interface IData {
   value: IConvertPercent;
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
interface IInputPercentProps {
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   width?: IWidth;
   value?: string;
   onChange?: (data: IData) => void;
   label?: ILabel;
   disabled?: boolean;
   error?: IError;
   defaultValue?: string;
   name?: string;
}

interface IConvertPercent {
   float: string;
   percent: string;
}

const InputPercent: React.FC<IInputPercentProps> = ({
   marginTop = 0,
   marginBottom = 0,
   marginLeft = 0,
   marginRight = 0,
   width = { size: 0, type: "rem", resizeAdjust: true },
   defaultValue = "",
   value,
   onChange = () => null,
   label = { value: "", requiredInput: false, color: "#707070" },
   disabled = false,
   error = { isError: false, text: "Um texto vai aqui!" },
   name = ""
}) => {
   const [inputValue, setInputValue] = useState<string>(defaultValue);
   const [inputValueIsNegative, setInputValueIsNegative] = useState<boolean>(false);
   const inputElement = document.getElementById("meuInput") as HTMLInputElement;

   useEffect(() => {
      if (inputElement !== null) {
         const text = inputElement.value;
         if (text.length > 1) {
            const penultimaPosicao = text.length - 1;
            inputElement.setSelectionRange(penultimaPosicao, penultimaPosicao);
         }
      }
   }, [inputValue]);

   const convertPercent = (value: string, isNegative: boolean): IConvertPercent => {

      if((!Number.isInteger(value) && value.match(/\D/g)) || value === "1"){
         value = `${(+value * 100)}`;
         const newValue = parseInt(value);
         value = newValue.toString();
      }
      
      value = value.replace(/\D/g, "");
      const data: IConvertPercent = {
         float: "",
         percent: value,
      };

      
      if (value !== "") {
         if (isNegative) {
            data.float = ((+value / 100) * -1).toString();
            data.percent = `${+value * -1}%`;
         }

         if (!isNegative) {
            data.float = (+value / 100).toString();
            data.percent = `${value}%`;
         }

         return data;
      }

      return data;
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
            className={styles["input-percent"]}
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
            <div className={styles["input-area"]}>
               <input
                  name={name}
                  autoComplete="off"
                  disabled={disabled}
                  id="meuInput"
                  value={
                     value !== undefined
                        ? convertPercent(value, inputValueIsNegative).percent
                        : convertPercent(inputValue, inputValueIsNegative).percent
                  }
                  onSelect={(ev) => {
                     if (inputElement !== null) {
                        const valueLength = inputElement.value.length;
                        const characterSelected = inputElement.selectionEnd || 0;
                        if (characterSelected >= valueLength) {
                           inputElement.setSelectionRange(valueLength - 1, valueLength - 1);
                        }
                     }
                  }}
                  onChange={(ev) => {
                     const text = ev.target.value;

                     if (text.includes("-") && !text.includes("+")) {
                        setInputValueIsNegative(true);
                        setInputValue(convertPercent(text, true).percent);
                        onChange({
                           value: convertPercent(text, true),
                        });
                     }
                     if (text.includes("+")) {
                        setInputValueIsNegative(false);
                        setInputValue(convertPercent(text, false).percent);
                        onChange({
                           value: convertPercent(text, false),
                        });
                     }
                     if (!text.includes("+") && !text.includes("-")) {
                        setInputValue(convertPercent(text, inputValueIsNegative).percent);
                        onChange({
                           value: convertPercent(text, inputValueIsNegative),
                        });
                     }
                  }}
                  placeholder="0%"
                  style={{
                     borderColor: error.isError ? "#e0457b" : "initial",
                  }}
               />
               {(((value === undefined && inputValue.length > 0) || (value !== undefined && value.length > 0)) && !disabled) && (
                  <img
                     className={styles["remove-text"]}
                     src={xMarkSolid}
                     alt="icon"
                     onClick={() => {
                        setInputValue("");
                        onChange({
                           value: {
                              float: "0",
                              percent: "0%",
                           },
                        });
                     }}
                  />
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
                              horizontalAlign="flex-start"
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

export default InputPercent;
