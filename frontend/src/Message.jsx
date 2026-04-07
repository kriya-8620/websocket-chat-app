function Message({
  message,
  currentUser
}) {

  if (message.type === "system") {

    return (
      <div className="system-message">
        {message.text}
      </div>
    );
  }

  const isOwn =
    message.username === currentUser;

  return (

    <div
      className={
        isOwn
          ? "message own"
          : "message"
      }
    >

      <div className="username">
        {message.username}
      </div>

      <div className="text">
        {message.text}
      </div>

      <div className="time">
        {new Date(
          message.time
        ).toLocaleTimeString()}
      </div>

    </div>
  );
}

export default Message;