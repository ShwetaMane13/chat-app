import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { SideBar } from "./SideBar";
import { CompanyHeader } from "./CompanyHeader";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./index";

const cookies = new Cookies();

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

export const ChannelListContent = ({
  isCreating,
  setisCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const filters = { members: { $in: [client.userID] } };

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };
  //console.log("setIsEditingbottom", setIsEditing);
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list_list_wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setisCreating={setisCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsEditing={setIsEditing}
              setisCreating={setisCreating}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setisCreating={setisCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsEditing={setIsEditing}
              setisCreating={setisCreating}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

export const ChannelListContainer = ({
  setCreateType,
  isCreating,
  setisCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div className="channel-list_container">
        <ChannelListContent
          isCreating={isCreating}
          setisCreating={setisCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>
      <div
        className="channel-list_container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#0005fff",
        }}
      >
        <div
          className="channel-list_container-toggle"
          onClick={() => {
            setToggleContainer((prevToggleContainer) => !prevToggleContainer);
          }}
        ></div>
        <ChannelListContent
          isCreating={isCreating}
          setisCreating={setisCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};
