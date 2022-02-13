import { useChatContext } from "stream-chat-react";

import { UserList } from "./index";
import { CloseCreateChannel } from "../assets/CloseCreateChannel";
import { useState } from "react";

export const ChannelNameInput = ({ channelName = "", setChannelName = "" }) => {
  // const { client, setActiveChannel } = useChatContext();
  // const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

  return (
    <div className="channel-name-input_wrapper">
      <p>Name</p>
      <input
        type="text"
        value={channelName}
        placeholder="channel-name"
        onChange={handleChange}
      />
      <p>Add Members</p>
    </div>
  );
};

export const CreateChannel = ({ createType, setisCreating }) => {
  // console.log("setisCreating");
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();
    // console.log(channelName, "channelName");
    // console.log(selectedUsers, "selectedUsers");
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setisCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (err) {
      console.log(err);
    }
  };
  //console.log("setSelectedUsers", setSelectedUsers);
  return (
    <div className="create-channel_container">
      <div className="create-channel_header">
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setisCreating={setisCreating} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel_button-wrapper" onClick={createChannel}>
        <p>
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
};
