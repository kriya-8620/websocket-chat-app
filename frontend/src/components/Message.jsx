function Message({
  msg,
  currentUser
}) {

  const isOwn =
    msg.sender === currentUser;

  /* FIXED TIME */

  const time =
    msg.createdAt
      ? new Date(msg.createdAt)
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
      : "";

  /* STATUS TICKS */

  const renderStatus = () => {

  if (!isOwn)
    return null;

  if (msg.status === "sent")
    return "✓";

  if (msg.status === "delivered")
    return "✓✓";

  if (msg.status === "seen")
    return (

      <span className="seen">

        ✓✓

      </span>

    );

};
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

      <div className="status">

        {renderStatus()}

      </div>

    </div>

  );

}

export default Message;