function Message({ msg, currentUser }) {

  const isOwn =
    msg.sender === currentUser;

  /* Format time */

  const time =
    new Date(msg.time)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

  return (

    <div
      className={
        isOwn
          ? "message own"
          : "message"
      }
    >

      <div className="message-header">

        <span className="sender">
          {msg.sender}
        </span>

        <span className="time">
          {time}
        </span>

      </div>

      <div className="message-text">

        {msg.text}

      </div>

    </div>

  );

}

export default Message;