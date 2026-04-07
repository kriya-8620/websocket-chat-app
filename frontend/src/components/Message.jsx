function Message({
  msg,
  currentUser
}) {

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

      <b>
        {msg.sender}
      </b>

      <div>
        {msg.text}
      </div>

      {msg.file && (

        <a
          href={
            "http://localhost:5000/uploads/" +
            msg.file
          }
          target="_blank"
        >
          📎 File
        </a>

      )}

    </div>

  );

}

export default Message;