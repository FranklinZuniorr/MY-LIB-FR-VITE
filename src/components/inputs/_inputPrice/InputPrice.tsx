import { useState } from "react";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import xMarkSolid from "../../../assets/images/icons/xmark-solid.svg";
import styled from "styled-components";

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
         padding-right: 3rem;
         padding-left: 1rem;

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

      div.info-feedback {
         position: absolute;
         left: 16px;
         cursor: none;
         color: var(--partners-neutral-color-600, #707070);
         font-feature-settings:
            "clig" off,
            "liga" off;
         font-family: Montserrat;
         font-size: 20px;
         font-style: normal;
         font-weight: 500;
         line-height: 20px;
         letter-spacing: 0.25px;
      }

      img.remove-text {
         position: absolute;
         right: 16px;
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
`;

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
                        className="remove-text"
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
         </Div>
      </>
   );
};

export default InputPrice;
