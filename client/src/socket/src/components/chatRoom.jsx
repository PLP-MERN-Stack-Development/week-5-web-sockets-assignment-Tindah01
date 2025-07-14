import {useEffect,useRef, useState} from 'react';

export default function ChatRoom({ room, messages, user, socket }) {
    const [chat, setchat] = useState('');
    const [typing, setTyping] = useState("");
    const msgRef = useRef(null);

    useEffect(() => {
        socket.on("newMessage", (message) => {
            msgRef.current.innerHTML += `<p><strong>${message.sender.username}:</strong> ${message}</p>`;
        });
        socket.on("typing", (username) => {
            setTyping(`${username} is typing...`);
        });
        socket.on("stopTyping", () => {
            setTyping("");
        });
        return () => {
            socket.off("newMessage");
            socket.off("typing");
            socket.off("stopTyping");
        };
    }, []);
    const handletyping = () => {
        socket.emit("typing");
        setTimeout(() => {
            socket.emit("stopTyping");
        }, 1000);
    };
    const handleSend = () => {
        socket.emit("sendMessage", chat);
        setchat('');

    };
    return (
        <div>
            <h2 className="text-2xl mb-4">{room.name}</h2>
            <div className="border p-4 h-64 overflow-y-auto bg-gray-50" ref={msgRef}>
                {messages.map((msg) => (
                    <p key={msg._id}><strong>{msg.sender.username}:</strong> {msg.content}</p>
                ))}
            </div>
            <div className="mt-4 mb-2 text-sm text-gray-500">
                {typingUser && <div className="text-gray-500">{typingUser} is typing... </div>}
            </div>
            <div className="flex-gap-2">
                <input
                className ="flex-1 p-2 border border-gray-300 rounded"
                value ={chat}
                onChange={(e) => setchat(e.target.value)}
                onKeyDown={handleTyping}
                type="text"
                placeholder='Type a message...'/>

            </div>
            <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={handleSend}
            >
                Send
            </button>
        </div>
    );
};