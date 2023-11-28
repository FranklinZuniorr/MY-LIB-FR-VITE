/// <reference types="react" />
interface IBorder {
    size?: number;
    color?: string;
}
interface IBackground {
    color?: string;
}
interface IText {
    size?: number;
    color?: string;
    value: string;
}
interface IButtonDefaultProps {
    border?: IBorder;
    text?: IText;
    background?: IBackground;
    isLoading?: boolean;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    icon?: string;
    disabled?: boolean;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    position?: "flex-start" | "flex-end" | "center";
    name?: string;
    flexGrow?: number;
    fluid?: boolean;
}
declare const ButtonDefault: React.FC<IButtonDefaultProps>;
export default ButtonDefault;
