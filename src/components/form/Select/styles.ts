import styled from "styled-components";
import Skeleton from "@mui/lab/Skeleton";
import {colors} from "../../../design/colors";

const SelectView = styled.div`
    width: 100%;
    position: relative;
    height: 40px;
    width: 100%;

    .MuiSkeleton-root {
        height: 100%;
    }
`;

const SelectInput = styled.div`
    height: 40px;
    width: 100%;
`;

const SkeletonLoader = styled(Skeleton)`
    display: flex;
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 0rem;
    transition: .2s;
    z-index: 1;
    border: 1px solid #c0c0c0;
`;

const InputElement = styled.input`
    height: 40px;
    width: 100%;
    color: #444444;
    font-size: 14px;
    border: none;
    border: 1px solid #c0c0c0;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    outline: none;
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const ErrorText = styled.p`
    font-size: 12px;
    color: ${colors.ERROR};
`;

const Span = styled.span`
    position: absolute;
    right: 10px;
    top: 8px;

    &:hover {
        cursor: pointer;
    }

    .icon {
        font-size: 24px;
        color: #666666;
    }
`;

const SelectMask = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }
`;

const CollapseView = styled.div`
    position: absolute;
    top: 40px;
    width: 100%;
    max-height: 300px;
    background-color: #ffffff;
    z-index: 999;
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
`;

const CollapseOptions = styled.ul``;

const SelectedOption = styled.div``;

const SelectedOptionText = styled.p``;

export {
    SelectView,
    SelectInput,
    SelectMask,
    ErrorText,
    Span,
    InputElement,
    CollapseView,
    CollapseOptions,
    SelectedOption,
    SelectedOptionText,
    SkeletonLoader,
};