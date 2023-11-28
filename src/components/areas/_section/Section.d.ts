/// <reference types="react" />
interface IBorder {
    color: string;
    size: number;
    radius: number;
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
    border?: IBorder;
}
declare const Section: React.FC<ISectionProps>;
export default Section;
