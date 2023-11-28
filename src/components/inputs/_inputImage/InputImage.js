import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./InputImage.module.scss";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { Loader } from "@quero-delivery/quero-components-web";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import avatarNovaMarca from "../../../assets/images/icons/avatar-nova-marca.png";
const InputImage = ({ width = 10, height = 10, onChange = () => null, marginTop = 1, marginBottom = 1, marginLeft = 1, marginRight = 1, startImage = "", disabled = false, error = { isError: false, text: "Um texto vai aqui!" }, value = "", required = false, clearable = false, name = "", rounded = false, fluid = false, type = "FILE" }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 1,
        onDrop(acceptedFiles, fileRejections, event) {
            const ex = async () => {
                const file = acceptedFiles[0];
                const data = await getDataImage(file);
                const url = data.url;
                const newFile = {
                    lastModified: file.lastModified,
                    arrayBuffer: await file.arrayBuffer(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    webkitRelativePath: file.webkitRelativePath
                };
                value === undefined && setImageSelected(url);
                setIsLoadingImg(false);
                acceptedFiles.pop();
                onChange({ file: newFile, url: url });
            };
            if (acceptedFiles.length > 0) {
                setIsLoadingImg(true);
                ex();
            }
        },
    });
    /* useEffect(() => {
       if(value && value.length > 0){
          onChange({
             file: {
                lastModified: "",
                arrayBuffer: "",
                name: "",
                size: "",
                type: "",
                webkitRelativePath: "",
             },
             url: value || ""
          });
       }
    }, [value]); */
    const [imageSelected, setImageSelected] = useState(value || startImage);
    const [isLoadingImg, setIsLoadingImg] = useState(false);
    const getDataImage = async (file) => {
        let data = {
            url: "",
            file: "",
        };
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 128,
            initialQuality: 10,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.readAsDataURL(compressedFile);
            reader.onload = (event) => {
                const result = typeof reader.result === "string" ? reader.result : "";
                data = {
                    url: result,
                    file: file,
                };
                resolve(data);
            };
            reader.onerror = () => {
                reject(data);
            };
        });
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: styles["input-image"], style: {
                marginTop: `${marginTop}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
                width: fluid ? "100%" : `${width}rem`,
                height: "fit-content"
            }, children: [_jsx("div", { id: styles["container"], style: {
                        width: "100%",
                        height: `${height}rem`,
                        opacity: disabled ? "0.3" : "1",
                        borderColor: error.isError || required ? "#e0457b" : "initial",
                        borderStyle: error.isError ? "groove" : "dashed",
                        borderRadius: (!rounded && clearable && (imageSelected.length > 0 || value.length > 0)) ? "1rem 1rem 0rem 0rem" : rounded ? "100%" : ""
                    }, className: disabled ?
                        styles["no-active"] :
                        (clearable && (imageSelected.length > 0 || value.length > 0)) ?
                            rounded ?
                                type === "FILE" ?
                                    styles["active-clearable-rounded-file"] : styles["active-clearable-rounded-url"] :
                                type === "FILE" ?
                                    styles["active-clearable-file"] : styles["active-clearable-url"] :
                            rounded ?
                                type === "FILE" ?
                                    styles["active-rounded-file"] : styles["active-rounded-url"] :
                                type === "FILE" ?
                                    styles["active-file"] : styles["active-url"], children: disabled ?
                        (_jsx("img", { src: avatarNovaMarca, alt: "selected" })) : type === "FILE" ?
                        (_jsx("div", { ...getRootProps(), contentEditable: "inherit", children: isLoadingImg ? (_jsx(Loader, {})) : (_jsxs(_Fragment, { children: [_jsx("input", { name: name, ...getInputProps(), contentEditable: "inherit" }), _jsx("img", { "data-testid": "image", src: value ? value : imageSelected !== "" ? imageSelected : avatarNovaMarca, alt: "selected" })] })) })) :
                        (_jsx(_Fragment, { children: isLoadingImg ? (_jsx(Loader, {})) : (_jsx(_Fragment, { children: _jsx("img", { onClick: async () => {
                                        const clipboard = await navigator.clipboard.readText();
                                        onChange({
                                            url: clipboard,
                                            file: {
                                                lastModified: "",
                                                arrayBuffer: "",
                                                name: "",
                                                size: "",
                                                type: "",
                                                webkitRelativePath: "",
                                            }
                                        });
                                        setImageSelected(clipboard);
                                    }, onError: (ev) => {
                                        onChange({
                                            url: "",
                                            file: {
                                                lastModified: "",
                                                arrayBuffer: "",
                                                name: "",
                                                size: "",
                                                type: "",
                                                webkitRelativePath: "",
                                            }
                                        });
                                        setImageSelected("");
                                    }, "data-testid": "image", src: value ? value : imageSelected !== "" ? imageSelected : avatarNovaMarca, alt: "selected" }) })) })) }), ((clearable && (imageSelected.length > 0 || value.length > 0)) && rounded) &&
                    _jsx("div", { "data-testid": "btn-clear", onClick: () => {
                            setImageSelected("");
                            onChange({
                                file: {
                                    lastModified: "",
                                    arrayBuffer: "",
                                    name: "",
                                    size: "",
                                    type: "",
                                    webkitRelativePath: "",
                                },
                                url: ""
                            });
                        }, className: styles["clear-area-rounded"], style: {
                            width: "100%",
                            maxWidth: fluid ? "100%" : `${width}rem`,
                        }, children: "Apagar" }), ((clearable && (imageSelected.length > 0 || value.length > 0)) && !rounded) &&
                    _jsx("div", { "data-testid": "btn-clear", onClick: () => {
                            setImageSelected("");
                            onChange({
                                file: {
                                    lastModified: "",
                                    arrayBuffer: "",
                                    name: "",
                                    size: "",
                                    type: "",
                                    webkitRelativePath: "",
                                },
                                url: ""
                            });
                        }, className: styles["clear-area"], style: {
                            opacity: disabled ? "0.3" : "1",
                            borderColor: error.isError || required ? "#e0457b" : "initial",
                            borderStyle: error.isError ? "groove" : "dashed",
                            borderTop: "0",
                            width: "100%",
                            maxWidth: fluid ? "100%" : `${width}rem`,
                        }, children: "Apagar" }), error.isError &&
                    _jsx(LineBarGroupUnid, { marginTop: 0, marginBottom: marginBottom, positionGroups: "flex-start", style: { gap: 0 }, unidGroups: [
                            {
                                unid: _jsx(_Fragment, { children: _jsx(Title, { text: error.text, size: 14, marginTop: 0, marginBottom: -0.5, horizontalAlign: "flex-start", color: "#e0457b", fontWeight: 500 }) }),
                                style: `
                     width: ${width}rem;
                     word-break: break-word;
                     `
                            }
                        ] })] }) }));
};
export default InputImage;
