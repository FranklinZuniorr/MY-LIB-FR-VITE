/// <reference types="react" />
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
    lineHeight?: number;
    required?: boolean;
}
declare const Title: React.FC<ITitleProps>;
export default Title;
