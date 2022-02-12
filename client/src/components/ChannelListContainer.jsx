import React from "react";
import {ChannelList, useChatContext} from "stream-chat-react";
import Cookies from "universal-cookie";
import { SideBar } from "./SideBar";
import { CompanyHeader } from "./CompanyHeader";


import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./index";



export const ChannelListContainer = () => {
    return <>
        <SideBar/>
        <div className="channel-list_list_wrapper">
            <CompanyHeader />
            <ChannelSearch />
            <ChannelList 
                filters={{}}
                channelRenderFilterFn = {() => {}}
                List = {(listProps) => (
                    <TeamChannelList  
                    {...listProps} 
                    type="team"
                    />
                )}
            />
        </div>
    </>
}

