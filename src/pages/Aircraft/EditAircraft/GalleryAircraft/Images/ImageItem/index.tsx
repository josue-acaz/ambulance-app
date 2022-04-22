import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

// types
import { ImageItemProps } from "./types";

// components
import Skeleton from "./Skeleton";

// styles
import {
    ImageItemView,
    ImageItemCheck,
    DocCheckView,
    DocCheckLabel,
    ImageTypeLabel,
} from "./styles";

export default function ImageItem(props: ImageItemProps)
{
    const {index, checked, loading, style, onCheck} = props;
    const [doc, setDoc] = useState(props.data.use_in_document);

    function handleDocCheck(e: any, checked: boolean)
    {
        setDoc(checked);
        props.onDoc(props.data, checked);
    }

    return(
        <ImageItemView style={style}>
            <ImageItemCheck>
                <Checkbox 
                    checked={checked}
                    color="warning"
                    onChange={() => onCheck(index)} 
                />
            </ImageItemCheck>
            {loading ? <Skeleton /> : <img src={props.data.url} alt="image-item" />}
            <DocCheckView>
                <DocCheckLabel>DOC</DocCheckLabel>
                <Tooltip title="Se ativo, esta imagem será usada na geração da cotação">
                    <Switch 
                        checked={doc}
                        color="warning"
                        onChange={handleDocCheck} 
                    />
                </Tooltip>
            </DocCheckView>
            <ImageTypeLabel>{props.data.view.toUpperCase()}</ImageTypeLabel>
        </ImageItemView>
    );
}