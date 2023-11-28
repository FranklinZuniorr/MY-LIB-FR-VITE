/// <reference types="react" />
interface IOption {
    key: string;
    value: any;
    text: string;
    img?: string;
    disabled?: boolean;
}
interface IOnChangeOption {
    option: string;
    checked: boolean;
}
interface ICheckboxOptionsProps {
    options: IOption[];
    onChange: (data: any[]) => void;
    onChangeOption?: (data: IOnChangeOption) => void;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    position?: "flex-start" | "center" | "flex-end";
    value?: any[];
    name?: string;
    checkboxPosition?: "row" | "row-reverse";
}
declare const CheckboxOptions: React.FC<ICheckboxOptionsProps>;
export default CheckboxOptions;
