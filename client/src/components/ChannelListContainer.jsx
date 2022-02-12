import React from "react";
import {ChannelList, useChatContext} from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./index";

import HospitalIcon from "../images/hospital.png"

const SideBar = () => (
    <div className="channel-list_sidebar">
        <div className="channel-list_sidebar_icon1">
            <div className="icon1_inner">
                <img src={HospitalIcon} alt="hospital" width="30" />
            </div>
        </div>
    </div>
)


export const ChannelListContainer = () => {
    return <div>ChannelListContainer</div>
}

