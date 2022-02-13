import { useEffect, useState } from "react";
import { Avatar, useChatChannel, useChatContext } from "stream-chat-react";


import {InviteIcon} from "../assets/InviteIcon";

const ListContainer = ({children}) => {
    return (
        <div className="user-list_container">
            <div className="user-list_header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({user}) => {

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        setSelected((prevSelected) => !prevSelected);
    }

    return (
        <div className="user-item_wrapper" onClick={handleSelect}>
            <div className="user-item_name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
                <p className="user-item_name">
                    {user.fullName || user.id}
                </p>
            </div>
            {selected ? <InviteIcon /> : <div className="user-item_invite-empty"/>}
            
            
        </div>
    )
}

export const UserList = ({setSelectedUsers}) => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;

            setLoading(true);

            try{
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                );

                if(response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
            }catch(err){
                console.log(err)
            }

            setLoading(false);
        }

        if(client) getUsers();
    }, [])

    return (
       <ListContainer>
           {loading ? <div className="user-list_message">
               Loading users...
           </div> : (
               users ?.map((user, i) => (
                   <UserItem index={i} key={user.id} user={user} selectedUsers={setSelectedUsers}/>
               ))
           )}
       </ListContainer>
    )
}