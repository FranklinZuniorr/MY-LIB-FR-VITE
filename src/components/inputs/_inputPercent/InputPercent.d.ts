/// <reference types="react" />
interface IData {
    value: IConvertPercent;
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
interface IInputPercentProps {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    width?: IWidth;
    value?: string;
    onChange?: (data: IData) => void;
    label?: ILabel;
    disabled?: boolean;
    error?: IError;
    defaultValue?: string;
    name?: string;
}
interface IConvertPercent {
    float: string;
    percent: string;
}
declare const InputPercent: React.FC<IInputPercentProps>;
export default InputPercent;
