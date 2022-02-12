import { Avatar, useChatContext } from "stream-chat-react";

export const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview_item">
      {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <div className="channel-preview_item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullname}
          size={24}
        />
        <p>{members[0]?.user?.fullname}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview_wrapper_selected"
          : "channel-preview_wrapper"
      }
      onClick={() => {
        console.log("channel", channel);
      }}
    >
      {type === "team " ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};
