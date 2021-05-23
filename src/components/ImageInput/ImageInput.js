import React, {useState, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import classes from "../../pages/Settings/components/Authentication/SendPhotosStep/SendPhotosStep.module.css";
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
    maxSize: 100000,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        props.onchange(URL.createObjectURL(acceptedFiles[0]));
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

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "1vh",
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: "2px",
    border: "0.1vh solid var(--CardBorder)",
    width: "10vw",
    height: "17vh",
    padding: "0.5vh 0.5vw",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };
  const errorMsg = (code) => {
    switch (code) {
      case "file-too-large":
        return "حجم فایل آپلود شده بیشتر از حد مجاز است!";
      case "file-invalid-type":
        return "فرمت فایل آپلود شده قابل قبول نیست!";
      case "too-many-files":
        return "آپلود بیشتر از یک عکس مجاز نیست!";
      default:
        return "عکس آپلود شده معتبر نیست!";
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

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

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
      {/*<aside style={thumbsContainer}>
                {thumbs}
            </aside>*/}
    </section>
  );
};

export default ImageInput;
