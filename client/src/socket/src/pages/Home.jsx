import {useEffect, useState} from 'react';
import {getRooms, createRoom, getMessages, socket } from '@/services/backendInt';
import chatRoom from '@/components/ChatRoom';
import { use } from 'react';

export default function Home({ user }) {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchRooms();
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, []);
    const fetchRooms = async () => {
        const res = await getRooms();
        setRooms(res.data);
    };

    const handleJoinRoom = async ( room) => {
        socket.emit('joinRoom', {username: user, roomId: room._id   })
        setCurrentRoom(room);
        const res = await getMessages(room._id);
        setMessages(res.data)
    };
    return (
        <div className='w-1/4 bg-gray text-white p-4'>
            <aside className ="w-4 bg-gray-800 text-white p-4">
                <h2 className ="text-lg mb-2"> Rooms</h2>
                <ul>
                    {rooms.map((room) => (
                        <li key={room._id} className="mb-4">
                            <button onClick={() => handleJoinRoom(room)}
                                    className="w-full text-left p-2 bg-gray-700 hover:bg-gray-600 rounded">
                                {room.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="flex-1 p-4">
                {currentRoom ? (
                    <chatRoom
                     room={currentRoom} 
                     messages={messages} 
                     user={user} 
                     socket={socket} />
                ) : (
                    <div className="text-center text-gray-500">
                        <p>Select a room to start chatting</p>
                    </div>
                )}
            </main>
        </div>


    )
}
