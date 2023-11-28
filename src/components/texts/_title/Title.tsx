import styled from "styled-components";

interface ITitleProps {
   text: string;
   size?: number;
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   color?: string;
   fontWeight?: number;
   isStrikethrough?: boolean;
   horizontalAlign?: "flex-start" | "flex-end" | "center";
   lineHeight?: number,
   required?: boolean
}

const Div = styled.div`
   font-feature-settings:
      "clig" off,
      "liga" off;
   font-family: Montserrat;
   font-size: 18px;
   font-style: normal;
   font-weight: 700;
   letter-spacing: 0.15px;
   display: flex;

   .required{
      margin-left: 0.3rem;
      color: $partners-brand-color-secondary-400
   }
`;

const Title: React.FC<ITitleProps> = ({
   text,
   size = 25,
   marginBottom = 0,
   marginTop = 0,
   marginLeft = 0,
   marginRight = 0,
   color = "black",
   fontWeight = 700,
   isStrikethrough = false,
   horizontalAlign = "flex-start",
   lineHeight = 1.5,
   required
}) => {
   return (
      <>
         <Div
            style={{
               fontSize: `${size}px`,
               marginTop: `${marginTop}rem`,
               marginRight: `${marginRight}rem`,
               marginLeft: `${marginLeft}rem`,
               marginBottom: `${marginBottom}rem`,
               color: `${color}`,
               fontWeight: `${fontWeight}`,
               textDecoration: isStrikethrough ? "line-through" : "none",
               justifyContent: `${horizontalAlign}`,
               width: "100%",
               textAlign: horizontalAlign === "flex-start"? "left":horizontalAlign === "flex-end"? "right":horizontalAlign === "center"? "center":"initial",
               lineHeight: `${lineHeight}rem`
            }}
         >
            <span>{text}{required && <span className="required">*</span>}</span>
         </Div>
      </>
   );
};

export default Title;
