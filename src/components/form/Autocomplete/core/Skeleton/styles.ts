import { Skeleton } from "@mui/material";
import styled from "styled-components";

const SkeletonAutocomplete = styled(Skeleton)`
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 0px;
    transition: .2s;
    z-index: 1;
`;

export {
    SkeletonAutocomplete,
};