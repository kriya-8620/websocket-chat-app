import { useEffect, useState } from "react";
import axios from "axios";

function RoomSelector({
  currentRoom,
  setCurrentRoom
}) {

  const [rooms,
    setRooms] =
    useState([]);

  const [newRoom,
    setNewRoom] =
    useState("");

  const [unread,
    setUnread] =
    useState({});

  useEffect(() => {

    fetchRooms();

  }, []);

  const fetchRooms =
    async () => {

      const res =
        await axios.get(
          "http://localhost:5000/api/rooms/all"
        );

      setRooms(res.data);

    };

  const createRoom =
    async () => {

      if (!newRoom) return;

      await axios.post(
        "http://localhost:5000/api/rooms/create",
        {
          name: newRoom
        }
      );

      setNewRoom("");

      fetchRooms();

    };

  return (

    <div className="rooms">

      <h4>Rooms</h4>

      {rooms.map(room => (

        <div
          key={room._id}
          className={
            currentRoom === room.name
              ? "room active"
              : "room"
          }
          onClick={() => {

            setCurrentRoom(room.name);

            /* Clear unread */

            setUnread(prev => ({
              ...prev,
              [room.name]: 0
            }));

          }}
        >

          # {room.name}

          {unread[room.name] > 0 && (

            <span className="badge">

              {unread[room.name]}

            </span>

          )}

        </div>

      ))}

      <input
        placeholder="New Room"
        value={newRoom}
        onChange={(e) =>
          setNewRoom(e.target.value)
        }
      />

      <button onClick={createRoom}>
        Add
      </button>

    </div>

  );

}

export default RoomSelector;