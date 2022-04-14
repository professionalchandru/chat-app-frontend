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

        <div className='w-11/12 xl:w-1/2 py-5 mx-auto text-center text-black font-meidum text-xl'>
            <h3>Current User: <span className='font-semibold'>{userName}</span></h3>
        </div>

        <div className='relative w-11/12 xl:w-1/2 h-50vh mx-auto border border-blue-100 rounded-md'>

            {/* Chat Header */}
            <div id='chat-header' className='bg-blue-500 rounded py-3'>
                <p className='text-center text-white text-2xl font-medium'>Live Chat - {room}</p>
            </div>

            {/* Chat Body */}
            <div className='relative' style={{height: `calc(100% - ${bodyHeight}px)`}}>
                <ScrollToBottom className="w-full h-full overflow-y- overflow-x-hidden no-scroll">
                    {messageList.map((item, index) => {
                        return(
                            <div key={index} className={`my-4 px-2.5 h-auto flex text-center ${userName !== item.author ? 'items-start justify-start' : 'items-end justify-end'}`} id={userName !== item.author ? "you" : "other"}>
                                <div >
                                    <div className={`w-auto h-auto px-3 py-2 break-words rounded-xl text-white flex ${userName !== item.author ? 'ml-2 items-start bg-green-500 justify-start' : 'mr-2 items-end bg-violet-500 justify-end'} text-center`} style={{maxWidth: '450px'}}>
                                        <p>{item.message}</p>
                                    </div>
                                    <div className={`px-3 py-1 flex flex-row items-center space-x-3 ${userName !== item.author ? 'ml-2 items-start justify-start' : 'mr-2 items-end justify-end'}`}>
                                        <p className='text-xs text-black font-normal' >{item.time}</p>
                                        <p className='text-xs text-black font-bold' >{item.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>

            {/* Chat Footer */}
            <div id='chat-footer' className='absolute px-1 bottom-2 w-full flex flex-row space-x-2 items-center bg-white'>
                <div className='w-full'>

                <Input 
                    type="text"
                    placeholder="Enter Message Here..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    classes="border border-blue-100 w-full"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage() }
                />
                </div>
                <button onClick={()=> sendMessage()} className='px-5 py-2 rounded-full bg-indigo-500 text-white'>&#9658;</button>
            </div>

        </div>
    </>
  )
}

export default Chat