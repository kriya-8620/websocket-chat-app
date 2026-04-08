import { useEffect, useState } from "react";
import axios from "axios";

function UsersList({
  socket,
  setPrivateUser
}) {

  const [conversations,
    setConversations] =
    useState([]);

  const [onlineUsers,
    setOnlineUsers] =
    useState([]);

  const currentUser =
    localStorage.getItem(
      "username"
    );

  /* ======================= */
  /* LOAD CONVERSATIONS */
  /* ======================= */

  useEffect(() => {

    loadConversations();

  }, []);

  const loadConversations =
    async () => {

      try {

        const res =
          await axios.get(
`http://localhost:5000/api/conversations/${currentUser}`
          );

        setConversations(res.data);

      }

      catch (err) {

        console.error(
          "Conversation load error:",
          err
        );

      }

    };

  /* ======================= */
  /* ONLINE USERS */
  /* ======================= */

  useEffect(() => {

    if (!socket) return;

    socket.on(
      "usersList",
      (list) => {

        setOnlineUsers(list);

      }
    );

    return () => {

      socket.off("usersList");

    };

  }, [socket]);

  /* ======================= */
  /* OPEN CHAT */
  /* ======================= */

  const openChat =
    (user) => {

      setPrivateUser(user);

    };

  /* ======================= */
  /* UI */
  /* ======================= */

  return (

    <div className="users-list">

      <h4>Chats</h4>

      {conversations.map(chat => {

        const isOnline =
          onlineUsers.includes(
            chat.username
          );

        return (

          <div
            key={chat.username}
            className="chat-item"
            onClick={() =>
              openChat(
                chat.username
              )
            }
          >

            {/* Avatar */}

            <div className="avatar">

              {isOnline
                ? "🟢"
                : "⚫"}

            </div>

            {/* Chat Info */}

            <div className="chat-info">

              <div className="chat-top">

                <span className="chat-name">

                  {chat.username}

                </span>

                <span className="chat-time">

  {chat.time
    ? new Date(chat.time)
        .toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )
    : ""}

</span>

              </div>

              <div className="chat-message">

                {chat.lastMessage}

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default UsersList;