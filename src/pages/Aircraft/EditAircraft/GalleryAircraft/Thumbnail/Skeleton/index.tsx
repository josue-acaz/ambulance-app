import React from "react";
import Skeleton from "@mui/lab/Skeleton";

const ThumbnailSkeleton = () => (
    <Skeleton
        width={500} 
        height={220} 
        variant="rectangular" 
        animation="wave" 
        style={{ borderRadius: 5 }}
    />
);

export default ThumbnailSkeleton;