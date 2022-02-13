import { Channel, useChatContext, MessageTeam } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from "./index";

export const ChannelContainer = ({
  isCreating,
  setisCreating,
  setCreateType,
  isEditing,
  setIsEditing,
  createType,
}) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className="channel_container">
        <CreateChannel createType={createType} setisCreating={setisCreating} />
      </div>
    );
  }


  if (isEditing) {
    return (
      <div className="channel_container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty_container">
      <p className="channel-empty_first">
        This is the beginning of your chat history
      </p>
      <p className="channel-empty_second">
        Send messages, attachments, links, emojis and more!
      </p>
    </div>
  );
  console.log("here");
  return (
    <div className="channel_container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};
