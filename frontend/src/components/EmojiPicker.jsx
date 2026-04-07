import { useState } from "react";
import EmojiPickerLib from "emoji-picker-react";

function EmojiPicker({ setText }) {

  const [show,
    setShow] =
    useState(false);

  const onEmojiClick =
    (emojiData) => {

      setText(prev =>
        prev + emojiData.emoji
      );

      setShow(false);

    };

  return (

    <div>

      <button
        onClick={() =>
          setShow(!show)
        }
      >
        😀
      </button>

      {show && (

        <EmojiPickerLib
          onEmojiClick={onEmojiClick}
        />

      )}

    </div>

  );

}

export default EmojiPicker;