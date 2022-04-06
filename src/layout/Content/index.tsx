import React from "react";

// styles
import { ContentView } from "./styles";

// types
import { ContentProps } from "./types";

class Content extends React.Component<ContentProps>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return(
            <ContentView>
                {this.props.children}
            </ContentView>
        );
    }
}

export default Content;