/// <reference types="react" />
interface IData {
    value: string;
}
interface ILabel {
    value: string;
    requiredInput: boolean;
    color?: string;
}
interface IError {
    text: string;
    isError: boolean;
}
interface IWidth {
    type: "px" | "%" | "em" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "cm" | "mm" | "in" | "pt";
    size: number;
    resizeAdjust: boolean;
}
interface ITextAreaProps {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    placeholder?: string;
    width?: IWidth;
    height?: number;
    value?: string;
    onChange?: (data: IData) => void;
    label?: ILabel;
    color?: string;
    maxCaracteres?: number;
    disabled?: boolean;
    error?: IError;
    defaultValue?: string;
    name?: string;
}
declare const TextArea: React.FC<ITextAreaProps>;
export default TextArea;
