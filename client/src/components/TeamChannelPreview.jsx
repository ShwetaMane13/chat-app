import { Avatar, useChatContext } from "stream-chat-react";

export const TeamChannelPreview = ({
  setIsEditing,
  setisCreating,
  setToggleContainer,
  channel,
  setActiveChannel,
  type,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => {
    return (
      <p className="channel-preview_item">
        #{channel?.data?.name || channel?.data?.id}
      </p>
    );
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
// console.log("members", members);

if(members.length > 0){
    return (
      <div className="channel-preview_item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  }
  else{
    return null;
  }
}

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview_wrapper_selected"
          : "channel-preview_wrapper"
      }
      onClick={() => {
        setisCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};
