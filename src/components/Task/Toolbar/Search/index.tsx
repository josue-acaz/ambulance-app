import React, {useState} from "react";
import Input from "../../../form/Input";

// types
import {SearchProps} from "./types";

// styles
import {
    SearchView, 
    SearchButton,
    SearchCollapse,
    SearchContent,
    CloseView,
    CloseLink,
} from "./styles";
import { Button } from "../../../../design";

// icons
import SearchIcon from "@mui/icons-material/Search";

export default function Search(props: SearchProps) {
    const {onSearch} = props;
    const [open, setOpen] = useState(false);

    const [text, setText] = useState("");

    function toggleOpen() {
        setOpen(!open);
    }

    return(
        <React.Fragment>
            <SearchView>
                <SearchButton onClick={toggleOpen}>
                    <SearchIcon className="icon" />
                </SearchButton>
            </SearchView>
            {open && (
                <SearchCollapse>
                    <SearchContent>
                        <Input placeholder="Pesquisar por..." value={text} onChange={(e) => setText(e.target.value)} />
                        <Button onClick={() => {
                            setOpen(false);
                            onSearch(text);
                        }} style={{width: "100%", marginTop: 10}}>
                            <SearchIcon />
                        </Button>
                    </SearchContent>
                    <CloseView>
                        <CloseLink onClick={toggleOpen}>Fechar</CloseLink>
                    </CloseView>
                </SearchCollapse>
            )}
        </React.Fragment>
    );
}