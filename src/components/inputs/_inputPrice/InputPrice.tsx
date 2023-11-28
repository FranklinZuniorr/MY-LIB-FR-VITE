import { useState } from "react";
import styles from "./InputPrice.module.scss";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import xMarkSolid from "../../../assets/images/icons/xmark-solid.svg";

interface IData {
   brl: string;
   float: string;
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
interface IInputPriceProps {
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

const InputPrice: React.FC<IInputPriceProps> = ({
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

   const convertMoney = (value: string, isNegative: boolean, isMoney: boolean) => {
      value = value.replace(/\D/g, "");

      if (value !== "") {
         if (!isMoney) {
            value = JSON.stringify(value);
            value = value.replace(/\D/g, "");
            value = (parseInt(value) / 100).toLocaleString("pt-br", {
               style: "currency",
               currency: "BRL",
            });
            
            if (value === "") {
               return "";
            }

            if (isNegative) {
               return `-${value}`;
            }

            return value;
         } else {
            value = JSON.stringify(value);
            value = value.replace(/\D/g, "");
            value = (parseInt(value) / 100).toFixed(2).toString();

            if (isNegative) {
               return (+value * -1).toString();
            }

            return value;
         }
      }

      return "";
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
            className={styles["input-price"]}
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
                  value={
                     value !== undefined? convertMoney(value, value.includes("-") ? true : false, false) : inputValue
                  }
                  onChange={(ev) => {
                     const text = ev.target.value;

                     if(text === "R$ 0,0"){
                        setInputValue("");
                        onChange({ brl: "", float: "" });
                        return
                     }

                     if (text.includes("-")) {
                        setInputValue(convertMoney(text, true, false));
                        onChange({
                           brl: convertMoney(text, true, false),
                           float: convertMoney(text, true, true),
                        });
                     }
                     if (text.includes("+")) {
                        setInputValue(convertMoney(text, false, false));
                        onChange({
                           brl: convertMoney(text, false, false),
                           float: convertMoney(text, false, true),
                        });
                     }
                     if (!text.includes("+") && !text.includes("-")) {
                        setInputValue(convertMoney(text, false, false));
                        onChange({
                           brl: convertMoney(text, false, false),
                           float: convertMoney(text, false, true),
                        });
                     }
                  }}
                  placeholder="R$ 0,00"
                  style={{
                     borderColor: error.isError ? "#e0457b" : "initial",
                  }}
               />
               {
                  ((value === undefined && inputValue.length > 0) || (value !== undefined && convertMoney(value, value.includes("-") ? true : false, false).length > 0)) 
                  && !disabled && (
                     <img
                        className={styles["remove-text"]}
                        src={xMarkSolid}
                        alt="icon"
                        onClick={() => {
                           setInputValue("");
                           onChange({ brl: "", float: "" });
                        }}
                     />
                  )
               }
            </div>

            <LineBarGroupUnid 
               marginTop={0}
               positionGroups="flex-start"
               style={{gap: 0}}
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

export default InputPrice;
