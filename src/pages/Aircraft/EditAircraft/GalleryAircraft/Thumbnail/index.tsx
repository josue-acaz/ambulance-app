import React, { useState } from "react";

// types
import { ThumbnailProps } from "./types";

// servies
import AircraftService from "../../../../../services/aircraft.service";

// components
import Skeleton from "./Skeleton";
import Upload from "../../../../../components/Upload";

// images
import no_image from "../../../../../assets/img/no-image.png";

// icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// styles
import {
    ThumbnailView,
    ThumbnailContent,
    ThumbnailTitle,
    ThumbnailImageView,
    ThumbnailImageActions,
    ThumbnailImage,
    ChangeThumbnailButton,
} from "./styles";

export default function Thumbnail(props: ThumbnailProps)
{
    const {url, title, aircraft_id, type, className, onChange} = props;

    const aircraftService = new AircraftService();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(props.loading);
    const [thumbnail, setThumbnail] = useState(url ? url : no_image);

    function handleOpen()
    {
        setOpen(true);
    }

    function handleClose()
    {
        setOpen(false);
    }

    async function show()
    {
        setLoading(true);

        let request = {
            aircraft_id,
            type,
        };

        try 
        {
            const response = await aircraftService.getThumbnail(request);
            setThumbnail(response.data);
            setLoading(false);
        } 
        catch (error) 
        {
            console.error(error);
            setLoading(false);
        }
    }

    function handleUploaded()
    {
        show();
        onChange();
        handleClose();
    }

    return(
        <ThumbnailView className={className}>
            <Upload 
                open={open} 
                fileName="file" 
                requestUrl="/Aircraft/thumbnail"
                onUploaded={handleUploaded} 
                onCancel={handleClose} 
                params={{type, aircraft_id}} 
            />
            <ThumbnailContent>
                <ThumbnailTitle>{title}</ThumbnailTitle>
                <ThumbnailImageView>
                    <ThumbnailImageActions>
                        <ChangeThumbnailButton onClick={handleOpen}>
                            <EditOutlinedIcon className="icon" />
                        </ChangeThumbnailButton>
                    </ThumbnailImageActions>
                    {loading ? <Skeleton /> : <ThumbnailImage src={thumbnail} alt="thumbnail" />}
                </ThumbnailImageView>
            </ThumbnailContent>
        </ThumbnailView>
    );
}
