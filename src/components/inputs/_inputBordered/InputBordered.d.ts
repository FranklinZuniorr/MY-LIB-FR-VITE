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
interface IInputBorderedProps {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    placeholder?: string;
    width?: IWidth;
    icon?: string;
    value?: string;
    onChange?: (data: IData) => void;
    label?: ILabel;
    maxCaracteres?: number;
    disabled?: boolean;
    error?: IError;
    defaultValue?: string;
    name?: string;
    clearable?: boolean;
    type?: "text" | "password";
}
declare const InputBordered: React.FC<IInputBorderedProps>;
export default InputBordered;
