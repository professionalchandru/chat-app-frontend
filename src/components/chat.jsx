import React, { useEffect, useState } from 'react'
import { getElementHeight } from '../utils/element';
import Input from './input'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({socket, room, userName}) => {

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const [bodyHeight, setBodyHeight] = useState();

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("");
        }

    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);

    useEffect(()=> {
        let height = getElementHeight('chat-header') + getElementHeight('chat-footer');
        setBodyHeight(height)
    }, [])

  return (
    <>

        {/* <div className='w-11/12 xl:w-1/2 py-5 mx-auto text-center flex flex-row items-center justify-between text-black font-meidum text-xl space-x-5'>
            <h3>Current User: <span className='font-semibold'>{userName}</span></h3>
            <h3>Room Id: <span className='font-semibold'>{room}</span></h3>
        </div> */}

        <div className='relative w-11/12 xl:w-1/4   h-70vh mx-auto bg-white border border-border rounded-3xl'>

            {/* Chat Header */}
            <div id='chat-header' className='w-full break-all bg-primary px-10 text-white rounded-t-3xl py-5 flex flex-row items-start justify-between space-x-5'>
                <h3 className='w-1/2 text-left'>User:  <span className='font-semibold'>{userName}</span></h3>
                <h3 className='w-1/2 text-right'>Room:  <span className='font-semibold'>{room}</span></h3>
            </div>

            {/* Chat Body */}
            <div className='relative' style={{height: `calc(100% - ${bodyHeight}px)`}}>
                <ScrollToBottom className="w-full h-full overflow-y- overflow-x-hidden no-scroll">
                    {messageList.map((item, index) => {
                        return(
                            <div key={index} className={`my-6 px-2.5 h-auto flex  ${userName !== item.author ? 'items-start justify-start' : 'items-end justify-end'}`} id={userName !== item.author ? "you" : "other"}>
                                <div >
                                    <div className={`w-auto h-auto px-5 py-3  break-all rounded-3xl flex ${userName !== item.author ? 'ml-2 items-start bg-pink-600 justify-start text-white' : 'mr-2 items-end bg-primary text-white justify-end'}`} style={{maxWidth: '250px'}}>
                                        <p>{item.message}</p>
                                    </div>
                                    <div className={`px-3 py-1 flex flex-row items-center space-x-3 ${userName !== item.author ? 'ml-2 items-start justify-start' : 'mr-2 items-end justify-end'}`}>
                                        <p className='text-xs text-font_primary font-medium' >{item.time}</p>
                                        <p className='text-xs text-font_primary font-bold' >{item.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>

            {/* Chat Footer */}
            <div id='chat-footer' className='absolute pt-1 bottom-3 w-full flex flex-row space-x-2 items-center  bg-white border-t border-border'>
                <div className='w-full'>

                <input 
                    type="text"
                    placeholder="Enter Message Here..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className={`px-5 py-2 text-font_primary focus:outline-none rounded-md w-full`}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage() }
                />
                </div>
                
                <img onClick={()=> sendMessage()} className="cursor-pointer" src={window.location.origin + "/assets/send.png"} alt="send icon" />
            </div>

        </div>
    </>
  )
}

export default Chat