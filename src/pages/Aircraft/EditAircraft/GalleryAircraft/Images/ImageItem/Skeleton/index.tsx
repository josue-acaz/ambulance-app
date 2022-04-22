import React from "react";
import Skeleton from "@mui/material/Skeleton";

const ImageItemSkeleton = () => (
    <Skeleton 
        width={500} 
        height={220} 
        animation="wave" 
        variant="rectangular" 
        style={{borderRadius: 10}}
    />
);

export default ImageItemSkeleton;