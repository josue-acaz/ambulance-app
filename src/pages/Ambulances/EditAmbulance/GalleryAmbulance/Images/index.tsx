import React, {useState, useEffect} from "react";
import AmbulanceImage from "../../../../../models/AmbulanceImage";

// types
import {ListImagesProps } from "./types";
import {PaginationProps} from "../../../../../components/Task/Pagination/types";
import {MenuItemProps} from "../../../../../components/CollapsibleMenu/MenuItem/types";

// services
import AmbulanceImageService from "../../../../../services/ambulance-image.service";

// components
import ImageItem from "./ImageItem";
import Upload from "../../../../../components/Upload";
import CollapsibleMenu from "../../../../../components/CollapsibleMenu";

// icons
import DeleteIcon from "@mui/icons-material/Delete";

// styles
import {
    ListImagesView,
    ListImagesContainer,
    ListImagesHeader,
    ListImagesTitle,
    SelectedItemsHeader,
    SelectedItemsTitle,
    RemoveSelectedsBtn,
} from "./styles";
import { Button } from "../../../../../design";
import { isThisISOWeek } from "date-fns";

export default function Images(props: ListImagesProps)
{
    const { ambulance_id, images=[] } = props;
    const ambulanceImageService = new AmbulanceImageService();

    const [pagination, setPagination] = useState<PaginationProps>({
        page_number: 10, 
        page_size: 1, 
        page: 0,
        count: 0,
        text: "",
        order: "DESC", 
        filter: "name", 
        orderBy: "name",
    });

    const [view, setView] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aircraftImages, setAircraftImages] = useState(images);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);

    const options: Array<MenuItemProps> = [
        {
            label: "Interior",
            onSelect: () => {
                setView("interior");
                handleOpen();
            },
        },
        {
            label: "Exterior",
            onSelect: () => {
                setView("exterior");
                handleOpen();
            },
        }
    ];

    function handleChangePagination(key: string, value: any) {
        setPagination(pagination => ({ ...pagination, [key]: value }));
    }

    function handleOpen()
    {
        setOpen(true);
    }

    function handleClose()
    {
        setOpen(false);
    }

    async function index()
    {
        setLoading(true);

        const paginationFilter = {
            page_number: pagination.offset,
            page_size: pagination.limit,
            order: pagination.order,
            order_by: pagination.orderBy,
            text: pagination.text,
            ambulance_id: ambulance_id,
        };

        try {
            const response = await ambulanceImageService.pagination(paginationFilter);
            const {data, total_records} = response.data;

            handleChangePagination("count", total_records);
            setAircraftImages(data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        index();
    }, []);

    function handleCheckImage(index: number)
    {
        const aircraft_image = aircraftImages[index];
        const aircraft_image_id = aircraft_image.id;

        const selected = selecteds.find(id => id === aircraft_image_id);

        if(selected)
        {
            setSelecteds(selecteds.filter(id => id !== aircraft_image_id));
        }
        else
        {
            setSelecteds(selecteds => [...selecteds, aircraft_image_id]);
        }
    }

    function handleUploaded()
    {
        handleClose();
        index();
    }

    async function handleDelete()
    {
        let aircraft_images = aircraftImages;
        for (let index = 0; index < selecteds.length; index++) {
            await ambulanceImageService.delete(selecteds[index]);
            aircraft_images = aircraft_images.filter(x => x.id !== selecteds[index]);
        }

        setAircraftImages(aircraft_images);
        setSelecteds([]);
    }

    async function handleDoc(data: AmbulanceImage, checked: boolean)
    {
        data.use_in_document = checked;
        
        try {
            await ambulanceImageService.update(data);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <ListImagesView>
            <Upload 
                open={open} 
                fileName="file" 
                requestUrl="/AmbulanceImages"
                onUploaded={handleUploaded} 
                onCancel={handleClose} 
                params={{ view, ambulance_id }} 
            />
            <ListImagesHeader>
                {selecteds.length > 0 ? (
                    <SelectedItemsHeader>
                        <SelectedItemsTitle>{selecteds.length} selecionado(s)</SelectedItemsTitle>
                        <RemoveSelectedsBtn onClick={handleDelete}>
                            <DeleteIcon className="icon" />
                        </RemoveSelectedsBtn>
                    </SelectedItemsHeader>
                ) : (
                    <React.Fragment>
                        <ListImagesTitle>{props.title}</ListImagesTitle>
                        <CollapsibleMenu label="Adicionar" options={options} />
                    </React.Fragment>
                )}
            </ListImagesHeader>
            <ListImagesContainer>
                {aircraftImages.length > 0 ? (
                    aircraftImages.map((aircraftImage, index) => {

                        const aircraft_id = aircraftImage.id;
                        const isLastItem = index === aircraftImages.length - 1;
                        const isChecked = !!(selecteds.find(id => id === aircraft_id));

                        return(
                            <ImageItem 
                                index={index} 
                                data={aircraftImage}
                                loading={loading}
                                key={aircraftImage.id} 
                                onDoc={handleDoc}
                                checked={isChecked}
                                onCheck={handleCheckImage}
                                style={isLastItem ? { marginRight: 0 } : {}}
                            />
                        );
                    })
                ) : (
                    <strong>Nenhuma imagem</strong>
                )}
            </ListImagesContainer>
        </ListImagesView>
    );
}