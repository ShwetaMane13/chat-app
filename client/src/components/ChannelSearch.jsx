import React, { useState, useEffect } from "react";
import { handleActionWarning, useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets/SearchIcon";
import { ResultsDropdown } from "./index.js";

export const ChannelSearch = ({ setToggleContainer }) => {
  const [loading, setLoading] = useState(false);
  const { client, setActiveChannel } = useChatContext();
  const [teamChannel, setTeamChannel] = useState([]);
  const [directChannel, setDirectChannel] = useState([]);
  const [textvalue, setTextvalue] = useState("");

  useEffect(() => {
    if (!textvalue) {
      setTeamChannel([]);
      setDirectChannel([]);
    }
  }, [textvalue]);

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) {
        setTeamChannel(channels);
      }

      if (users.length) {
        setDirectChannel(users);
      }
    } catch (err) {
      console.log("err:", err);

      setTextvalue("");
    }
  };

  //console.log(textvalue);

  const handleChange = (e) => {
    e.preventDefault();
    //console.log("e.target.value = " + e.target.value);
    setLoading(true);
    setTextvalue(e.target.value);
    //console.log("query", textvalue);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setTextvalue("");
    setActiveChannel(channel);
  };
  return (
    <div className="channel-search_container">
      <div className="channel-search_input_wrapper">
        <div className="channel-search_input_icon">
          <SearchIcon />
        </div>

        <input
          className="channel-search_input_text"
          placeholder="search"
          type="text"
          value={textvalue}
          onChange={handleChange}
        />
      </div>
      {textvalue && (
        <ResultsDropdown
          teamChannels={teamChannel}
          directChannels={directChannel}
          loading={loading}
          setChannel={setChannel}
          setTextvalue={setTextvalue}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};
