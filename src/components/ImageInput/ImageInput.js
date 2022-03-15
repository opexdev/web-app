import React, {useState, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import classes from "../../main/Browser/Sections/Content/components/Settings/components/Authentication/components/SendPhotosStep/SendPhotosStep.module.css";
import Icon from "../Icon/Icon";
import {useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";

const ImageInput = (props) => {
  const {t} = useTranslation();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps, fileRejections} = useDropzone({
    accept: "image/jpeg, image/png",
    maxFiles: 1,
    maxSize: 1000000,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        props.onchange(acceptedFiles[0]);
        setFiles([
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          }),
        ]);
      } else {
        setFiles([]);
      }
    },
  });

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );


  const errorMsg = (code) => {
    switch (code) {
      case "file-too-large":
        return t("ImageInput.fileTooLarge");
      case "file-invalid-type":
        return t("ImageInput.fileInvalidType");
      case "too-many-files":
        return t("ImageInput.tooManyFiles");
      default:
        return t("ImageInput.errorMsgDefault");
    }
  };

  const fileRejectionItems = fileRejections.slice(0, 1).map(({errors}) =>
    errors.map((e) => (
      <div className={`row font-size-sm mt-1`} key={e.code}>
        <span
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-html={true}
          data-place="bottom"
          data-effect="float"
          data-tip={`<span class="column jc-between col-100">${t(
            "ImageInput.iconErrorText",
          )}</span>`}>
          <Icon
            iconName=" icon-help-circled-1 text-red font-size-md"
            customClass={`cursor-pointer`}
          />
        </span>

        <span className={`text-right`}>{errorMsg(e.code)}</span>
      </div>
    )),
  );



  return (
    <section className={`${props.zoneCustomClass}`}>
      <div
        {...getRootProps({
          className: `dropzone flex jc-center ai-center text-center position-relative cursor-pointer hover-text ${classes.zone}`,
        })}
        style={{backgroundImage: `url("${files[0]?.preview}")`}}>
        {files[0]?.preview ? (
          <Icon
            iconName="icon-cancel-circle-2 text-red font-size-md-01"
            customClass={`position-absolute ${classes.cancel} cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              setFiles([]);
              props.onchange("");
            }}
          />
        ) : (
          ""
        )}

        <input {...getInputProps()} />
        {!files[0]?.preview ? (
          <div className={`column`}>
            <span>
              {props.title}{" "}
              {!fileRejectionItems.length > 0 ? t("ImageInput.dropText") : ""}
            </span>
            {fileRejectionItems.length > 0 ? fileRejectionItems : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default ImageInput;
