import { useState } from "react";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import minus from "../../../assets/images/icons/minus-grey.svg";
import more from "../../../assets/images/icons/more-grey.svg";
import styled from "styled-components";

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

const Div = styled.div`
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

   div.input-area {
      display: flex;
      align-items: center;
      width: 100%;

      input {
         border-radius: 10px;
         border: 1px solid $partners-neutral-color-400;
         background-color: $partners-base-color-white;
         height: 3rem;
         width: 100%;
         padding-top: 1rem;
         padding-bottom: 1rem;
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
         padding-right: 2.5rem;
         padding-left: 2.5rem;
         text-align: center;

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

      .area-click-more {
         padding: 1rem;
         position: absolute;
         right: 0;
         display: flex;
         align-items: center;
         justify-content: center;
         cursor: pointer;
         margin-right: 0.2rem;

         img.more {
            position: absolute;
         }
      }

      .area-click-minus {
         padding: 1rem;
         position: absolute;
         left: 0;
         display: flex;
         align-items: center;
         justify-content: center;
         cursor: pointer;
         margin-left: 0.2rem;

         img.minus {
            position: absolute;
         }
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
`;

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
         <Div
            style={{
               marginTop: `${marginTop}rem`,
               marginBottom: `${marginBottom}rem`,
               marginLeft: `${marginLeft}rem`,
               marginRight: `${marginRight}rem`,
               [width.resizeAdjust ? "maxWidth" : "width"]: width.size === 0 ? "100%" : `${width.size}${width.type}`,
               opacity: disabled ? "0.5" : "1",
            }}
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
            <div className="input-area">
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
                  className="area-click-more"
               >
                  <img src={minus} className="more" alt="more" />
               </div>
               <div
                  onClick={() => {
                     setInputValue(value !== undefined? verifyValueMinOrMax(+value - 1):verifyValueMinOrMax(+inputValue - 1));
                     onChange({ value: value !== undefined? verifyValueMinOrMax(+value - 1):verifyValueMinOrMax(+inputValue - 1)});
                  }}
                  className="area-click-minus"
               >
                  <img src={more} className="minus" alt="minus" />
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
         </Div>
      </>
   );
};

export default InputMinMax;
