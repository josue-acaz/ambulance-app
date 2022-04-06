import styled from "styled-components";
import { Link } from "react-router-dom";

// types
import { NavItemViewProps } from "./types";

const NavItemLink = styled(Link)`
    text-decoration: none;
`;

const NavItemView = styled.div<NavItemViewProps>`
    height: 45px;
    padding-left: 10px;
    padding-right: 10px;
    border-left: 2px solid #ffffff;
    border-right: 2px solid transparent;
    transition: .2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e2e2;
    color: #444444;

    &:hover {
        background-color: #f7f7f780;
        cursor: pointer;
        border-left-width: 2px;
        border-left-color: #324f80;
        color: #324f80;
        border-left-style: solid;
    }

    ${props => props.active ? `
        background-color: #f7f7f780;
        border-left-width: 2px;
        border-left-color: #324f80;
        color: #324f80;
        border-left-style: solid;
    ` : ``}

    .to-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .justify-center {
        justify-content: center;
    }
`;

const NavItemLeft = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    .col-item {
        display: inline-block;
        height: 100%;

        .icon {
            font-size: 20px;
        }

        .sub-option {
            font-size: 18px;
        }

        .active {
            color: #324f80;
        }

        .label {
            font-size: 14px;
            margin-left: 5px;
        }

        @media screen and (max-width: 1200px) {
            .label {
                font-size: 12px;
            }

            .icon {
                font-size: 18px;
            }
        }   
    }
`;

const NavItemSubmenuView = styled.div`
    background-color: #f2f2f2;
    .menu-item {
        border-bottom: solid 1px #d1d1d1;
        padding-left: 1rem;
    }
`;

export {
    NavItemLink,
    NavItemView,
    NavItemLeft,
    NavItemSubmenuView,
};