import React from "react";

// types
import { TabItemProps } from "./types";

// styles
import {
    TabItemView, 
    TabItemContent,
    Title, 
    Subtitle,
    ActiveBar,
    Header,
    Icon,
} from "./styles";

export default function TabItem(props: TabItemProps) {
    const { index, title, subtitle, icon, active, activeColor, disabled, onClick } = props;

    return(
        <TabItemView disabled={disabled} onClick={() => {
            if(!disabled)
            {
                onClick(index);
            }
        }}>
            <TabItemContent>
                <Header>
                    {icon && <Icon>{icon}</Icon>}
                    <Title>{title}</Title>
                </Header>
                <Subtitle>{subtitle}</Subtitle>
            </TabItemContent>
            <ActiveBar active={active} activeColor={activeColor} />
        </TabItemView>
    );
}
