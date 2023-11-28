/// <reference types="react" />
interface IParagraphProps {
    text: string;
    size?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    isStrikethrough?: boolean;
    horizontalAlign?: "flex-start" | "center" | "flex-end";
    opacity?: number;
}
declare const Paragraph: React.FC<IParagraphProps>;
export default Paragraph;
