import { Avatar, useChatContext } from "stream-chat-react";


export const TeamChannelPreview = ( { channel, type } ) =>{

    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className="channel-preview_item">
            {channel?.data?.name || channel?.data?.id}
        </p>
    );

    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.userID)
    }

    return (
        <div className="channel-preview_item single">
            <Avatar />
        </div>
    )
}