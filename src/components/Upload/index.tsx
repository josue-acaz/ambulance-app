import React, { useState } from "react";
import { dataUrlToFile } from "../../utils";
import { colors } from "../../design/colors";
import api from "../../api";

// types
import { UploadProps } from "./types";

// components
import Modal from "../../components/Modal";
import Dropzone from "../../components/Dropzone";
import ImageCropper from "../../components/ImageCropper";
import CircularProgress from "@mui/material/CircularProgress";

// styles
import { UploadView, UploadActions, UploadCard } from "./styles";
import { Button } from "../../design";

export default function Upload(props: UploadProps) {
    const [url, setUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [cropper, setCropper] = useState<any>(undefined);
    const [uploading, setUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);

    function handleChangeFile(event: any)
    {
        console.log(event.file);
        setUrl(event.url);
        setFile(event.file);
    }

    async function handleUpload()
    {
        if(!uploading)
        {
            if (typeof cropper !== "undefined" && file !== null) {
                setUploading(true);
                const croppedImage = cropper.getCroppedCanvas().toDataURL();
                const fileCroppedImage = await dataUrlToFile(croppedImage, file.name);
                
                processUpload(fileCroppedImage);
            }
        }
    }

    function handleCancel()
    {
        setUrl("");
        setFile(null);
        setCropper(undefined);
        setCropper(null);
        props.onCancel();
    }

    async function processUpload(file: File)
    {
        const data = new FormData();
        const file_name = file.name;

        data.append(props.fileName, file, file_name);

        if(props.params)
        {
            for(const [key, value] of Object.entries(props.params))
            {
                data.append(key, value);
            }
        }

        try
        {
            const response = await api.post(props.requestUrl, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (e: any) => {
                    const total = e.total;
                    const loaded = e.loaded;
                    const progress = Math.round((loaded * 100) / total);
    
                    setProgress(progress);
                }
            });
            
            setUploading(false);
            setUrl("");
            setFile(null);
            setCropper(undefined);
            setCropper(null);
            props.onUploaded();
        } 
        catch(error) 
        {
            setUploading(false);
        }
    }

    return (
        <Modal number={1} currentModalNumber={props.open ? 1 : 0}>
            <UploadView>
                <UploadCard>
                    <Dropzone file={file} onChange={handleChangeFile}>
                        <ImageCropper onCrop={handleUpload} src={url} onChange={setCropper} />
                    </Dropzone>
                    <UploadActions>
                        <Button color={colors.PRIMARY} onClick={handleUpload} disabled={!url}>{uploading ? <CircularProgress size={24} color="inherit" /> : "Upload"}</Button>
                        <Button color="transparent" onClick={handleCancel}>Cancelar</Button>
                    </UploadActions>
                </UploadCard>
            </UploadView>
        </Modal>
    );
}
