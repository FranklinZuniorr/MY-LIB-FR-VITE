import styles from "./InputImage.module.scss";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { Loader } from "@quero-delivery/quero-components-web";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import avatarNovaMarca from "../../../assets/images/icons/avatar-nova-marca.png";

interface IFileInfo {
   lastModified: number | string;
   name: string;
   size: number | string;
   type: string;
   webkitRelativePath: string;
   arrayBuffer: any
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
   type?: "FILE" | "URL"
}

const InputImage: React.FC<IInputImageProps> = ({
   width = 10,
   height = 10,
   onChange = () => null,
   marginTop = 1,
   marginBottom = 1,
   marginLeft = 1,
   marginRight = 1,
   startImage = "",
   disabled = false,
   error = { isError: false, text: "Um texto vai aqui!" },
   value = "",
   required = false,
   clearable = false,
   name = "",
   rounded = false,
   fluid = false,
   type = "FILE"
}) => {
   const { getRootProps, getInputProps  } = useDropzone({
      accept: { "image/*": [] },
      maxFiles: 1,
      onDrop(acceptedFiles, fileRejections, event) {
         const ex = async () => {
            const file = acceptedFiles[0];
            const data: IGetDataImage = await getDataImage(file);
            const url = data.url;
            const newFile: IFileInfo = {
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

            onChange({file: newFile, url: url});
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

   const [imageSelected, setImageSelected] = useState<string>(value || startImage);
   const [isLoadingImg, setIsLoadingImg] = useState<boolean>(false);
   interface IGetDataImage {
      url: string;
      file: string;
   }

   const getDataImage = async (file: any): Promise<IGetDataImage> => {
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

      return new Promise<IGetDataImage>((resolve, reject) => {
         reader.readAsDataURL(compressedFile);

         reader.onload = (event) => {
            const result: string = typeof reader.result === "string" ? reader.result : "";

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

   return (
      <>
         <div className={styles["input-image"]}
         style={{
            marginTop: `${marginTop}rem`,
            marginLeft: `${marginLeft}rem`,
            marginRight: `${marginRight}rem`,
            width: fluid? "100%":`${width}rem`,
            height: "fit-content"
         }}
         >
         <div
            id={styles["container"]}
            style={{
               width: "100%",
               height: `${height}rem`,
               opacity: disabled ? "0.3" : "1",
               borderColor: error.isError || required ? "#e0457b" : "initial",
               borderStyle: error.isError? "groove":"dashed",
               borderRadius: (!rounded && clearable && (imageSelected.length > 0 || value.length > 0))? "1rem 1rem 0rem 0rem":rounded? "100%":""
            }}
            className={
               disabled? 
               styles["no-active"]: 
               (clearable && (imageSelected.length > 0 || value.length > 0))? 
               rounded? 
               type === "FILE"?
               styles["active-clearable-rounded-file"]:styles["active-clearable-rounded-url"]:
               type === "FILE"? 
               styles["active-clearable-file"]:styles["active-clearable-url"]:
               rounded?
               type === "FILE"?
               styles["active-rounded-file"]:styles["active-rounded-url"]:
               type === "FILE"?
               styles["active-file"]:styles["active-url"]
            }
         >
            {
               disabled ? 
               (
                  <img src={avatarNovaMarca} alt="selected" />
               ): type === "FILE"?
               (
                  <div {...getRootProps()} contentEditable="inherit">
                     {isLoadingImg ? (
                        <Loader />
                     ) : (
                        <>
                           <input name={name} {...getInputProps()} contentEditable="inherit"/>
                           <img
                              data-testid="image"
                              src={value? value:imageSelected !== "" ? imageSelected : avatarNovaMarca}
                              alt="selected"
                           />
                        </>
                     )}
                  </div>
               ):
               (
                  <>
                     {isLoadingImg ? (
                        <Loader />
                     ) : (
                        <>
                           <img
                              onClick={async () => {
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
                              }}
                              onError={(ev) => {
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
                              }}
                              data-testid="image"
                              src={value? value:imageSelected !== "" ? imageSelected : avatarNovaMarca}
                              alt="selected"
                           />
                        </>
                     )}
                  </>
               )
            }
         </div>
         {
            ((clearable && (imageSelected.length > 0 || value.length > 0)) && rounded) &&
            <div
            data-testid="btn-clear"
            onClick={() => {
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
            }}
            className={styles["clear-area-rounded"]} 
            style={{
               width: "100%",
               maxWidth: fluid? "100%":`${width}rem`,
            }}
            >
               Apagar
            </div>
         }
         {
            ((clearable && (imageSelected.length > 0 || value.length > 0)) && !rounded) &&
            <div
            data-testid="btn-clear"
            onClick={() => {
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
            }}
            className={styles["clear-area"]} 
            style={{
               opacity: disabled ? "0.3" : "1",
               borderColor: error.isError || required ? "#e0457b" : "initial",
               borderStyle: error.isError? "groove":"dashed",
               borderTop: "0",
               width: "100%",
               maxWidth: fluid? "100%":`${width}rem`,
            }}>
               Apagar
            </div>
         }

         {
            error.isError &&
            <LineBarGroupUnid 
               marginTop={0}
               marginBottom={marginBottom}
               positionGroups="flex-start"
               style={{gap: 0}}
               unidGroups={[
                  {
                     unid:
                     <>
                        <Title
                           text={error.text}
                           size={14}
                           marginTop={0}
                           marginBottom={-0.5}
                           horizontalAlign="flex-start"
                           color="#e0457b"
                           fontWeight={500}
                        />
                     </>,
                     style: `
                     width: ${width}rem;
                     word-break: break-word;
                     `
                  }
               ]}
            />
         }
         </div>
      
      </>
   );
};

export default InputImage;
