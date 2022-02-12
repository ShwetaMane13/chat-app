import React  from "react";
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import "../App.css";


import { ChannelContainer, ChannelListContainer } from "./index";

const apiKey = "m2rjbhuvnw27";

const client = StreamChat.getInstance(apiKey);

export const Main = () => {
  return (
    <div className="main_wrapper">
        <Chat client={client} theme="team light">
            <ChannelListContainer 
            />
            <ChannelContainer 
            />
        </Chat>
    </div>
)
};
