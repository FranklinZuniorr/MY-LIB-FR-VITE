import React, { CSSProperties } from "react";
import styles from "./LineBarGroupUnid.module.scss";
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
         <div
            style={{
               ...style,
               justifyContent: positionGroups,
               marginTop: `${marginTop}rem`,
               marginBottom: `${marginBottom}rem`,
               marginLeft: `${marginLeft}rem`,
               marginRight: `${marginRight}rem`,
            }}
            data-testid="line"
            className={styles["line-bar-group-unid"]}
         >
            {unidGroups.map((group, index) => (
               <DivGroup $style={group.style} data-testid="group" className={styles["group"]} key={index}>
                  {group.unid}
               </DivGroup>
            ))}
         </div>
      </>
   );
};

export default LineBarGroupUnid;
