import styled from "styled-components";
import React from "react";

interface IBreadcrumb {
   name: string;
   active: boolean;
   to: string;
}

interface IBreadcrumbProps {
   data: IBreadcrumb[];
}

const Div = styled.div`
   font-weight: 500;
   color: $neutral-color-low-light;
   font-feature-settings:
      "clig" off,
      "liga" off;
   font-family: Montserrat;
   font-size: 16px;
   font-style: normal;
   font-weight: 500;
   line-height: 2rem;
   letter-spacing: 0.15px;
   word-break: break-all;

   span.separator {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: black !important;
      font-weight: 400 !important;
   }
`;

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ data }) => {

   return (
      <>
         <Div>
            {data.map((item, index) => (
               <span
                  key={index}
                  style={{
                     color: item.active ? "#9B4DEE" : item.to ? "#8686ff" : "#707070",
                     cursor: item.to !== "" ? "pointer" : "default",
                     fontWeight: item.active ? "bolder" : "normal",
                  }}
                  onClick={() => {
                     if (item.to !== "") {
                        window.location.href = item.to
                     }
                  }}
               >
                  {item.name}
                  <span className="separator">{index + 1 < data.length && "/"}</span>
               </span>
            ))}
         </Div>
         <div className="breadcrumb-new">
         </div>
      </>
   );
};

export default Breadcrumb;
