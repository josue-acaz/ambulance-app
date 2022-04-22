import React, { useState } from "react";

// types
import { DropzoneProps } from "./types";

// styles
import { DropzoneView, DropzoneLabel, DropzoneInput } from "./styles";

const Dropzone: React.FC<DropzoneProps> = (props) => {
    const messages = [
        "Arraste ou solte um arquivo aqui!",
        "Solte o arquivo!",
        "Tipo de arquivo não suportado",
    ];

    const [text, setText] = useState(messages[0]);
    const [active, setActive] = useState(false);
    const [isSupported, setIsSupported] = useState(true);

    const supported_media_types = [
        "image/jpg",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
        "image/svg+xml"
    ];

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if(event.target.files)
        {
            if(event.target.files.length > 0)
            {
                const file = event.target.files[0];

                const is_supported_media = supported_media_types.findIndex(x => x === file.type) !== - 1;
                setIsSupported(is_supported_media);

                if(!is_supported_media)
                {
                    setText(messages[2]);
                }
                else
                {
                    setText(messages[0]);
                    setActive(false);
                }

                props.onChange({ name: props.name, file, url: window.URL.createObjectURL(file) });
            }
        }
    }

    function handleDragMode(drag_mode: string)
    {
        if(drag_mode === "Enter")
        {
            setText(messages[1]);
            setActive(true);
        }

        if(drag_mode === "Exit" || drag_mode === "End" || drag_mode === "Leave")
        {
            setText(messages[0]);
            setActive(false);
        }
    }

    return (
        <DropzoneView>
            <DropzoneLabel 
                htmlFor="dropzone" 
                active={active}
                error={!isSupported}
                onDrop={() => handleDragMode("Drop")} 
                onDragEnd={() => handleDragMode("End")} 
                onDragExit={() => handleDragMode("Exit")}
                onDragEnter={() => handleDragMode("Enter")} 
                onDragLeave={() => handleDragMode("Leave")}
            >
                {props.file !== null ? props.children : (
                    <React.Fragment>
                        <div className="text-container">{text}</div>
                        <DropzoneInput id="dropzone" type="file" name={props.name} accept="image/jpg,image/jpeg,image/pjpeg,image/png,image/gif,image/svg+xml" onChange={handleChange} />
                    </React.Fragment>
                )}
            </DropzoneLabel>
        </DropzoneView>
    )
};

export default Dropzone;