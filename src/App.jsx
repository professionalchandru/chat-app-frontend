import React, { useState } from 'react'
import { io } from 'socket.io-client';
import Button from './components/button';
import Chat from './components/chat';
import Input from './components/input';

// Connect to backend socket server
const socket = io.connect(process.env.NODE_ENV == 'production' ? "https://online-chating-app.herokuapp.com/" : 'http://localhost:3001');

const App = () => {

  const [userName, setUserName ] = useState('');
  const [room, setRoom ] = useState('');

  const [showChat, setShowChat] = useState(false)

  // Join room by emiting a event using socekt.join() method
  const joinRoom = () => {
    if(userName !== "" && room !== ""){
      socket.emit('join_room', room);
      setShowChat(true)
    }
  }
 
  return (
    <div>
      <div className='w-11/12 xl:w-4/5 mx-auto my-10 flex flex-col items-center justify-center space-y-5 text-center leading-10'>

        <h2 className='text-primary py-5 font-semibold text-4xl uppercase'> {showChat ? 'Live Chat' : 'Welcome to Group Chat application'}</h2>

        {!showChat && 
          <>
              <h3 className='text-2xl text-font_primary font-semibold uppercase'>Join A Chat</h3>
              <Input 
                type="text"
                placeholder="Enter Your Name..."
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              
              <Input 
                type="text"
                placeholder="Enter Room Id..."
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                onKeyPress={(e) => e.key === "Enter" && joinRoom() }
              />

              <Button 
                type="submit"
                onClick={joinRoom}
                text="Join Room"
              />
          </>
        }
      </div>

      {/* Chat Screen Goes Here */}
      {showChat &&
        <Chat socket={socket} room={room} userName={userName} />
      }
    </div>
  );
}

export default App;
