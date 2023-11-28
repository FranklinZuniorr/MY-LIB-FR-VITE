import { Loader } from "@quero-delivery/quero-components-web";
import styled from "styled-components";

interface IBorder {
   size?: number;
   color?: string;
}
interface IBackground {
   color?: string;
}
interface IText {
   size?: number;
   color?: string;
   value: string;
}
interface IButtonDefaultProps {
   border?: IBorder;
   text?: IText;
   background?: IBackground;
   isLoading?: boolean;
   onClick?: () => void;
   type?: "submit" | "reset" | "button";
   icon?: string;
   disabled?: boolean;
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   position?: "flex-start" | "flex-end" | "center";
   name?: string;
   flexGrow?: number;
   fluid?: boolean
}

const Div = styled.div`
.button-default {
   display: flex;
   align-items: center;
   justify-content: center;
   font-family: Montserrat;
   font-style: normal;
   font-weight: 700;
   line-height: 24px;
   border-radius: 2rem;
   cursor: pointer;
   
   font-size: 14px;

   /* &:hover {
      background-color: $partners-neutral-color-101 !important;
      color: $partners-brand-color-primary-400 !important;
   } */

   img.icon {
      pointer-events: none;
   }
}
`;

const ButtonDefault: React.FC<IButtonDefaultProps> = ({
   background = { color: "#F7EB48" },
   border,
   text,
   onClick = () => null,
   type = "button",
   isLoading = false,
   icon = "",
   disabled = false,
   marginTop = 0,
   marginBottom = 0,
   marginLeft = 0,
   marginRight = 0,
   position = "flex-start",
   name = "",
   flexGrow = 1,
   fluid = false
}) => {

   const textSpread = { color: "#9B4DEE", size: 17, value: "Texto aqui...", ...text};
   const borderSpread = { color: "#9B4DEE", size: 2, ...border};

   return (
      <>
         <Div
            style={{
               flexGrow: flexGrow,
               display: "flex",
               justifyContent: position,
            }}
         >
            <button
               disabled={disabled}
               type={type}
               onClick={onClick}
               data-testid="button-default"
               className="button-default"
               name={name}
               style={{
                  backgroundColor: `${background.color}`,
                  border: `${borderSpread.size}px solid ${borderSpread.color}`,
                  color: `${textSpread.color}`,
                  fontSize: `${textSpread.size}px`,
                  opacity: disabled ? "0.5" : "1",
                  marginTop: `${marginTop}rem`,
                  marginBottom: `${marginBottom}rem`,
                  marginLeft: `${marginLeft}rem`,
                  marginRight: `${marginRight}rem`,
                  padding: textSpread.size * 0.5,
                  paddingLeft: textSpread.value.length > 0? textSpread.size * 2:"",
                  paddingRight: textSpread.value.length > 0? textSpread.size * 2:"",
                  width: fluid? "100%":"initial",
               }}
            >
               {isLoading ? (
                  <Loader size="sm" />
               ) : (
                  <>
                     {icon !== "" && (
                        <img
                           style={{
                              width: `${textSpread.size + 3}px`,
                              marginRight: textSpread.value.length > 0? "0.5rem":"",
                           }}
                           className="icon"
                           src={icon}
                           alt="icon"
                        />
                     )}
                     {textSpread.value.length > 0 && textSpread.value}
                  </>
               )}
            </button>
         </Div>
      </>
   );
};

export default ButtonDefault;
