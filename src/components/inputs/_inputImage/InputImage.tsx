import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { Loader } from "@quero-delivery/quero-components-web";
import LineBarGroupUnid from "../../areas/_lineBarGroupUnid/LineBarGroupUnid";
import Title from "../../texts/_title/Title";
import avatarNovaMarca from "../../../assets/images/icons/avatar-nova-marca.png";
import styled from "styled-components";

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

const Div = styled.div`
width: fit-content;

#container {
   background-color: rgb(200, 200, 200);
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 1rem;
   overflow: hidden;
   border: 2px solid rgb(102, 102, 102);
   position: relative;

   &.active-file{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 1rem;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/camera.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.active-rounded-file{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 100%;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/camera.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.active-clearable-file{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 1rem;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/camera.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         border-bottom-left-radius: 0;
         border-bottom-right-radius: 0;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.active-clearable-rounded-file{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 100%;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/camera.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.active-url{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 1rem;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/paste.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.active-rounded-url{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 100%;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/paste.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.active-clearable-url{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 1rem;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/paste.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         border-bottom-left-radius: 0;
         border-bottom-right-radius: 0;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.active-clearable-rounded-url{
      &::before {
         content: "";
         position: absolute;
         width: inherit;
         height: inherit;
         border-radius: 100%;
         transition: 0.3s;
         pointer-events: none;
         background-color: #00000073;
         background-image: url("../../../assets/images/icons/paste.svg");
         background-repeat: no-repeat;
         background-size: 5rem;
         background-position: center;
         opacity: 0;
      }
   
      &:hover {
         &::before {
            opacity: 1;
         }
      }
   }

   &.focus {
      &::before {
         opacity: 1;
      }
   }

   div[role="presentation"] {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      img {
         background-color: rgb(237, 237, 237);
         width: 100%;
         height: 100%;
         cursor: pointer !important;
      }
   }

   img {
      background-color: rgb(237, 237, 237);
      width: 100%;
      height: 100%;
      cursor: pointer !important;
   }
}

.clear-area{
   cursor: pointer;
   border: 2px solid rgb(102, 102, 102);
   font-family: Montserrat;
   font-style: normal;
   font-weight: 500;
   line-height: 30px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: $primary-transparent-2;
   border-bottom-left-radius: 1rem;
   border-bottom-right-radius: 1rem;

   &:hover{
      background-color: $partners-brand-color-secondary-400;
      color: $off-white;
      border-color: $primary-dark !important;
      border-style: groove !important;
   }
}

.clear-area-rounded{
   cursor: pointer;
   border: 2px solid rgb(102, 102, 102);
   font-family: Montserrat;
   font-style: normal;
   font-weight: 500;
   line-height: 30px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: $primary-transparent-2;
   border-radius: 2rem;
   margin-top: 1rem;

   &:hover{
      background-color: $partners-brand-color-secondary-400;
      color: $off-white;
      border-color: $primary-dark !important;
      border-style: groove !important;
   }
}  
`;

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
         <Div
         style={{
            marginTop: `${marginTop}rem`,
            marginLeft: `${marginLeft}rem`,
            marginRight: `${marginRight}rem`,
            width: fluid? "100%":`${width}rem`,
            height: "fit-content"
         }}
         >
         <div
            id="container"
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
               "no-active": 
               (clearable && (imageSelected.length > 0 || value.length > 0))? 
               rounded? 
               type === "FILE"?
               "active-clearable-rounded-file":"active-clearable-rounded-url":
               type === "FILE"? 
               "active-clearable-file":"active-clearable-url":
               rounded?
               type === "FILE"?
               "active-rounded-file":"active-rounded-url":
               type === "FILE"?
               "active-file":"active-url"
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
            className="clear-area-rounded"
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
            className="clear-area"
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
         </Div>
      </>
   );
};

export default InputImage;
