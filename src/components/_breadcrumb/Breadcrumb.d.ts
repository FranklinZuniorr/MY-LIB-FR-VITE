import React from "react";
interface IBreadcrumb {
    name: string;
    active: boolean;
    to: string;
}
interface IBreadcrumbProps {
    data: IBreadcrumb[];
}
declare const Breadcrumb: React.FC<IBreadcrumbProps>;
export default Breadcrumb;
