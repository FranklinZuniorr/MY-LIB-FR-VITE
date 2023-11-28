/// <reference types="react" />
interface IOption {
    key: string;
    value: string;
    text: string;
}
interface IRadioOptionsProps {
    options: IOption[];
    onChange: (data: string) => void;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    position?: "flex-start" | "center" | "flex-end";
    value?: string;
    name?: string;
}
declare const RadioOptions: React.FC<IRadioOptionsProps>;
export default RadioOptions;
