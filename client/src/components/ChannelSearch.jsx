import React, {useState, useEffect} from "react";
import { handleActionWarning, useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets/SearchIcon";

export const ChannelSearch = () => {

    const [query, setQuery]  = useState('');
    const [loading, setLoading]  = useState(false);

    const getChannels = async (text) => {
        try{
            //TODO fetch channels
        }catch(err){
            setQuery('');
        }
    }

    const handleChange = (e) => {
        e.preventDefault();

        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    }


    return (
    <div className="channel-search_container">
        <div className="channel-search_input_wrapper">
            <div className="channel-search_input_icon">
                <SearchIcon/>
            </div>

            <input 
            className="channel-search_input_text" 
            placeholder="search" 
            type="text" 
            value={query}
            onChange={handleChange}/>
        </div>
    </div>)
}