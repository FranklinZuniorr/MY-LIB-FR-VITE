import styles from "./Breadcrumb.module.scss";
import React from "react";

interface IBreadcrumb {
   name: string;
   active: boolean;
   to: string;
}

interface IBreadcrumbProps {
   data: IBreadcrumb[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ data }) => {

   return (
      <>
         <div className={styles["breadcrumb-new"]}>
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
                  <span className={styles["separator"]}>{index + 1 < data.length && "/"}</span>
               </span>
            ))}
         </div>
      </>
   );
};

export default Breadcrumb;
