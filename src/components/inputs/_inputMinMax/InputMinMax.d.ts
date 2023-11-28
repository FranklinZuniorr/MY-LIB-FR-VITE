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
interface IInputMinMaxProps {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    placeholder?: string;
    width?: IWidth;
    value?: string;
    onChange?: (data: IData) => void;
    label?: ILabel;
    disabled?: boolean;
    error?: IError;
    defaultValue?: string;
    max?: number;
    min?: number;
    name?: string;
}
declare const InputMinMax: React.FC<IInputMinMaxProps>;
export default InputMinMax;
