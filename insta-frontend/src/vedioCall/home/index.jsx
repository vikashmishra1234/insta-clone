import React, { useCallback, useState } from "react";
import {useNavigate} from 'react-router-dom'

const index = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate()
  const handleRoomJoin = useCallback(()=>{
navigate(`/room/${id}`)
  },[navigate,id])
  return (
    <div>
      <input
        value={id}
        type="text"
        onChange={(e) => setId(e.target.value)}
        placeholder="enter room id"
      />
      <button onClick={handleRoomJoin}>Join</button>
    </div>
  );
};

export default index;
