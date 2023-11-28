/// <reference types="react" />
interface IData {
    data: IOption;
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
interface IOption {
    key: string;
    value: any;
    text: string;
    img?: string;
}
interface ISearchable {
    async: boolean;
}
interface IInputDropdownProps {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    placeholder?: string;
    width?: IWidth;
    icon?: string;
    value?: string;
    onChange?: (data: IData) => void;
    onSearch?: (search: string) => void;
    label?: ILabel;
    clearable?: boolean;
    disabled?: boolean;
    error?: IError;
    options: Array<IOption>;
    removeOptionsRepeated?: "key" | "value" | "text" | false;
    defaultValue?: string;
    searchable?: ISearchable;
    name?: string;
}
declare const InputDropdown: React.FC<IInputDropdownProps>;
export default InputDropdown;
