import './App.css';
import {useEffect, useState} from "react";
import Peer from 'peerjs';

function App() {
    const [peer, setPeer] = useState({})
    const [conn, setConn] = useState({})
    const [id, setId] = useState("")
    const [tid, setTid] = useState("")
    useEffect(() => {

    }, [])
    return (<div className="App">
        <label htmlFor="mid">请输入你的id</label>
        <input id="mid" value={id} onChange={(v) => {
            setId(v.target.value)
        }}/>
        <button onClick={() => {
            // setPeer();
            const _peer = new Peer(id, {host: "49.232.205.191", port: 19000, path: '/test'});
            setPeer(_peer)

        }}>
            连接
        </button>
        <label htmlFor="tid">请输入ta的id</label>
        <input id="tid" value={tid} onChange={(v) => {
            setTid(v.target.value)
        }}/>
        <button id="btn-start-recording" onClick={() => {
            const conn = peer.connect(tid, {});
            setConn(conn)
            conn.on('open', () => {
                conn.send('hi!');
            });
            conn.on('data', (data) => {
                // Will print 'hi!'
                console.log(data);
            });
        }}>call
        </button>
        <button id="btn-stop-recording">断开
        </button>
        <video controls autoPlay playsInline/>
    </div>);
}

export default App;
