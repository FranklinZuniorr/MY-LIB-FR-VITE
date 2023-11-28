import { useState } from "react";
import styles from "./InputMinMax.module.scss";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import minus from "../../../assets/images/icons/minus-grey.svg";
import more from "../../../assets/images/icons/more-grey.svg";

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
interface IInputMinMaxProps {
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   placeholder?: string;
   width?: IWidth;
   value?: string;
   onChange?: (data: IData) => void;
   label?: ILabel;
   disabled?: boolean;
   error?: IError;
   defaultValue?: string;
   max?: number;
   min?: number;
   name?: string;
}

const InputMinMax: React.FC<IInputMinMaxProps> = ({
   marginTop = 1,
   marginBottom = 1,
   marginLeft = 0,
   marginRight = 0,
   placeholder = "0",
   width = { size: 0, type: "rem", resizeAdjust: true },
   defaultValue = "",
   value,
   onChange = () => null,
   label = { value: "", requiredInput: false, color: "#707070" },
   disabled = false,
   error = { isError: false, text: "Um texto vai aqui!" },
   max,
   min,
   name = ""
}) => {
   const [inputValue, setInputValue] = useState<string>(defaultValue);

   const verifyValueMinOrMax = (newValue: number): string => {
      if(min !== undefined && max === undefined){
         if(newValue >= min){
            return newValue.toString()
         }

         return min.toString()
      }

      if(max !== undefined && min === undefined){
         if(newValue <= max){
            return newValue.toString()
         }
   
         return max.toString()
      }

      if(max !== undefined && min !== undefined){
         if(newValue <= max && newValue >= min){
            return newValue.toString()
         }

         if(newValue >= max){
            return max.toString()
         }

         if(newValue <= min){
            return min.toString()
         }

         if(value !== undefined){
            return value
         }else{
            return inputValue
         }
      }

      return newValue.toString();
   }

   const convertValue = (value: string, isNegative: boolean): string => {
      const valueFilter = value.replace(/\D/g, "");

      if(isNegative && valueFilter.length > 0){
         const newValue = `-${valueFilter}`;
         return newValue
      }

      return valueFilter;
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
            className={styles["input-min-max"]}
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
                  value={value !== undefined? value: inputValue}
                  onChange={(ev) => {
                     const text = ev.target.value.replace(/[^0-9+-]/g, "");
                     /* const newValue = text.replace(/\D/g, ""); */

                     if (text.length > 0) {

                        if(text.includes("-")){
                           setInputValue(verifyValueMinOrMax(+convertValue(text, true)));
                           onChange({ value: verifyValueMinOrMax(+convertValue(text, true)) });
                        }
                        
                        if(text.includes("+")){
                           setInputValue(verifyValueMinOrMax(+convertValue(text, false)));
                           onChange({ value: verifyValueMinOrMax(+convertValue(text, false)) });
                        }

                        if(!text.includes("+") && !text.includes("-")){
                           setInputValue(verifyValueMinOrMax(+convertValue(text, false)));
                           onChange({ value: verifyValueMinOrMax(+convertValue(text, false)) });
                        }

                     } else {
                        setInputValue(verifyValueMinOrMax(0));
                        onChange({ value: verifyValueMinOrMax(0) });
                     }
                  }}
                  placeholder={placeholder}
                  style={{
                     borderColor: error.isError ? "#e0457b" : "initial",
                  }}
               />
               <div
                  onClick={() => {
                     setInputValue(value !== undefined? verifyValueMinOrMax(+value + 1):verifyValueMinOrMax(+inputValue + 1));
                     onChange({ value: value !== undefined? verifyValueMinOrMax(+value + 1):verifyValueMinOrMax(+inputValue + 1)});
                  }}
                  className={styles["area-click-more"]}
               >
                  <img src={minus} className={styles["more"]} alt="more" />
               </div>
               <div
                  onClick={() => {
                     setInputValue(value !== undefined? verifyValueMinOrMax(+value - 1):verifyValueMinOrMax(+inputValue - 1));
                     onChange({ value: value !== undefined? verifyValueMinOrMax(+value - 1):verifyValueMinOrMax(+inputValue - 1)});
                  }}
                  className={styles["area-click-minus"]}
               >
                  <img src={more} className={styles["minus"]} alt="minus" />
               </div>
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

export default InputMinMax;
