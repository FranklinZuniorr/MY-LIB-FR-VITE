import styled from "styled-components";
interface IBorder {
   color: string,
   size: number,
   radius: number
}

interface ISectionProps {
   children: any;
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   backgroundColor?: string;
   width?: number;
   padding?: number;
   fluid?: boolean;
   resizeAdjust?: boolean;
   shadow?: boolean;
   border?: IBorder
}

const Div = styled.div`
   background: $partners-base-color-white;
`;

const Section: React.FC<ISectionProps> = ({
   children,
   marginBottom = 2,
   marginTop = 2,
   marginLeft = 2,
   marginRight = 2,
   backgroundColor = "white",
   width,
   padding,
   fluid = false,
   resizeAdjust = false,
   shadow = true,
   border = {size: 0, color: "black", radius: 24}
}) => {
   return (
      <>
         <Div
            style={{
               marginTop: `${marginTop}rem`,
               marginRight: `${marginRight}rem`,
               marginLeft: `${marginLeft}rem`,
               marginBottom: `${marginBottom}rem`,
               backgroundColor: `${backgroundColor}`,
               width: width? resizeAdjust? "100%":`${width}rem`:fluid? "100%":"fit-content",
               maxWidth: resizeAdjust && !fluid? `${width}rem`:"",
               padding: padding? `${padding}rem`:"1rem",
               boxShadow: shadow? "0px 0px 16px 0px rgba(0, 0, 0, 0.15)":"",
               border: `${border.size}px solid ${border.color}`,
               borderRadius: `${border.radius}px`
            }}
         >
            {children}
         </Div>
      </>
   );
};

export default Section;
