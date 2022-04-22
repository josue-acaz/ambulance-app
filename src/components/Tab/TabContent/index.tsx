import React from "react";

// types
import {TabContentProps} from "./types";

// styles
import {TabContentView, TabContainer} from "./styles";

const TabContent: React.FC<TabContentProps> = (props) => {
    const {index, selected, padding, children} = props;

    return(
        <TabContentView padding={padding}>
            {index === selected && (
                <TabContainer>{children}</TabContainer>
            )}
        </TabContentView>
    );
};

export default TabContent; 