import { useState, useEffect } from "react";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import xMarkSolid from "../../../assets/images/icons/xmark-solid.svg";
import styled from "styled-components";

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
                     className="remove-text"
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
         </Div>
      </>
   );
};

export default InputPercent;
