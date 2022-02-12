import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import "../App.css";
import 'stream-chat-react/dist/css/index.css';

import { ChannelContainer, ChannelListContainer, Auth } from "./index";

const cookies = new Cookies();

const apiKey = "m2rjbhuvnw27";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}


export const Main = () => {

  const [createType, setCreateType] = useState('');
  const [isCreating, setisCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <div className="main_wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer 
          isCreating = {isCreating}
          setisCreating = {setisCreating}
          setCreateType = {setCreateType}
          isEditing = {isEditing}
        />
        <ChannelContainer 
          isCreating = {isCreating}
          setisCreating = {setisCreating}
          setIsEditing = {setIsEditing}
          isEditing = {isEditing}
          createType = {createType}
          />
      </Chat>
    </div>
  );
};
