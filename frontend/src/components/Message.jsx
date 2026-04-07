function Message({ msg, currentUser }) {

  const isOwn =
    msg.sender === currentUser;

  return (

    <div
      className={
        isOwn
          ? "message own"
          : "message"
      }
    >

      <div className="message-header">

        <b>
          {msg.sender}
        </b>

        <span className="time">

          {new Date(
            msg.time
          ).toLocaleTimeString()}

        </span>

      </div>

      <div className="message-text">

        {msg.text}

      </div>

    </div>

  );

}

export default Message;