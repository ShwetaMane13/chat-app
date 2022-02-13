import { useChatContext } from "stream-chat-react";

import {UserList} from "./index";
import {CloseCreateChannel} from "../assets";
import { useState } from "react";

const ChannelNameInput = ({ channelName = '', setChannelName = ''}) => {

    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

    const handleChange = (e) => {
        e.preventDefault();

        setChannelName(e.target.value);
    }

    return (
        <div className="channel-name-input_wrapper">
            <p>Name</p>
            <input 
            type="text"
            value={} 
            placeholder="channel-name"
            onChange={}/>
            <p>Add Members</p>
        </div>
    )
}


export const CreateChannel = ({createType, setIsCreating}) => {
    const [channelName, setChannelName] = useState('');
    return (
        <div className="create-channel_container">
            <div className="create-channel_header">
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList selectedUsers={setSelectedUsers}/>
        </div>
    )
}