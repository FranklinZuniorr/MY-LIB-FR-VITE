import React from "react";
interface IFileInfo {
    lastModified: number | string;
    name: string;
    size: number | string;
    type: string;
    webkitRelativePath: string;
    arrayBuffer: any;
}
interface IOnChange {
    url: string;
    file: IFileInfo;
}
interface IError {
    text: string;
    isError: boolean;
}
interface IInputImageProps {
    width?: number;
    height?: number;
    onChange?: (data: IOnChange) => void;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    startImage?: string;
    disabled?: boolean;
    error?: IError;
    value?: string;
    required?: boolean;
    clearable?: boolean;
    name?: string;
    rounded?: boolean;
    fluid?: boolean;
    type?: "FILE" | "URL";
}
declare const InputImage: React.FC<IInputImageProps>;
export default InputImage;
