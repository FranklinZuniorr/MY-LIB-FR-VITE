import React, { CSSProperties } from "react";
import styled from "styled-components";

const DivGroup = styled.div<{ $style?: string; }>`${props => props.$style}`;

interface IUnid {
   unid: any;
   style?: string;
}

interface ILineBarGroupUnidProps {
   unidGroups: Array<IUnid>;
   positionGroups?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
   marginTop?: number;
   marginBottom?: number;
   marginLeft?: number;
   marginRight?: number;
   style?: CSSProperties;
}

const Div = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   gap: 1rem;

   /* @media only screen and (max-width: 1020px) {
      flex-direction: column;
   } */

   div.group {
   }
`;

const LineBarGroupUnid: React.FC<ILineBarGroupUnidProps> = ({
   unidGroups = [],
   positionGroups = "flex-start",
   marginTop = 0,
   marginBottom = 0,
   marginLeft = 0,
   marginRight = 0,
   style
}) => {
   
   return (
      <>
         <Div
            style={{
               ...style,
               justifyContent: positionGroups,
               marginTop: `${marginTop}rem`,
               marginBottom: `${marginBottom}rem`,
               marginLeft: `${marginLeft}rem`,
               marginRight: `${marginRight}rem`,
            }}
            data-testid="line"
         >
            {unidGroups.map((group, index) => (
               <DivGroup $style={group.style} data-testid="group" className="group" key={index}>
                  {group.unid}
               </DivGroup>
            ))}
         </Div>
      </>
   );
};

export default LineBarGroupUnid;
