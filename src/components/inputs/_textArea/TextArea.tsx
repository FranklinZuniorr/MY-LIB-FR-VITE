import { useState } from "react";
import Title from "../../texts/_title/Title";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import xMarkSolid from "../../../assets/images/icons/xmark-solid.svg";
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

   div.text-area-group {
      display: flex;
      align-items: flex-start;
      width: 100%;

      textarea {
         border-radius: 10px;
         border: 1px solid $partners-neutral-color-400;
         background-color: $partners-base-color-white;
         resize: none;

         max-width: 100%;
         min-width: 100%;

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

      img.remove-text {
         position: absolute;
         right: 16px;
         width: 1.4rem;
         height: 1.4rem;
         background-color: #dedede38;
         padding: 0.2rem;
         border-radius: 0.5rem;
         backdrop-filter: blur(1px);
         margin-top: 1rem;
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
            <div className="text-area-group">
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
                     className="remove-text"
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
         </Div>
      </>
   );
};

export default TextArea;
