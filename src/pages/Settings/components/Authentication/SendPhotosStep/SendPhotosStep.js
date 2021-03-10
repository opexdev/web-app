import React,{useState,useEffect} from 'react';
import classes from "./SendPhotosStep.module.css"
import {useTranslation} from "react-i18next";
import {useDropzone} from 'react-dropzone';


const SendPhotosStep = (props) => {
    const {t} = useTranslation();




    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '1vh'
    };

    /*const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: '10vw',
        height: '15vh',
        padding: 4,
        boxSizing: 'border-box'
    };*/
    const thumb = {
        display: 'inline-flex',
        borderRadius: '2px',
        border: '0.1vh solid var(--CardBorder)',
        width: '10vw',
        height: '17vh',
        padding: '0.5vh 0.5vw'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };


    function Previews(props) {
        const [files, setFiles] = useState([]);
        const {getRootProps, getInputProps} = useDropzone({
            accept: 'image/*',
            onDrop: acceptedFiles => {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            }
        });

        const thumbs = files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        ));

        useEffect(() => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [files]);

        return (
            <section className={`${props.zoneCustomClass}`}>
                <div {...getRootProps({className: `dropzone flex jc-center ai-center text-center ${classes.zone}`})}>
                    <input {...getInputProps()} />
                    <p>{props.title}</p>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
            </section>
        );
    }




    return (
        <div className={`container card-background card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t('SendPhotosStep.title')}</h3>
                </div>
            </div>
            <div className={`container column jc-between px-1 py-2 ${classes.content}`}>

                <div className="column">
                    <span>برای تکمیل احراز هویت لطفا مراحل زیر را انجام دهید!</span>
                    <span>1) متن اعلام رضایت به استفاده از خدمات را بر روی یک کاغذ A4 نوشته ، امضا کنید و از آن عکس بگیرید <span> (متن اعلام رضایت...)</span></span>
                    <span>2) یک سلفی از خودتان در حالتی که برگه اعلام رضایت را در مقابل خود نگه داشته اید بگیرید <span>(مطابق تصویر نمونه...)</span></span>
                    <span>3) یک سلفی از خودتان در حالتی که شناسنامه یا کارت ملی را در مقابل خود نگه داشته اید بگیرید <span>(مطابق تصویر نمونه...)</span></span>
                    <div className={`row jc-between ai-start mt-2`}>


                        {/*title="Drag some files here, or click to select files"*/}

                        <Previews zoneCustomClass={classes.zoneBox} title={t('SendPhotosStep.textTitle')}/>
                        <Previews zoneCustomClass={classes.zoneBox} title={t('SendPhotosStep.textSelfiTitle')} />
                        <Previews zoneCustomClass={classes.zoneBox} title={t('SendPhotosStep.NationalCardTitle')} />


                    </div>
                </div>

                <div className="row pt-1 jc-end">
                    <button onClick={props.prevStep} type="submit" className={`cursor-pointer ml-05 ${classes.prevButton}`}>{t('prevStep')}</button>
                    <button onClick={props.nextStep} type="submit" className={`cursor-pointer ${classes.nextButton}`}>{t('nextStep')}</button>
                </div>
            </div>
        </div>
    );
};

export default SendPhotosStep;