import { createContext, useEffect, useRef, useState } from "react";
import {Peer} from "peerjs";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:2001");

export const socketContext = createContext();

const SocketProvider = ({ children }) => {
  const localStream = useRef();
  const remoteStreamUser = useRef();
  const [idCaller, setIdCaller] = useState('')
  const [peer, setPeer] = useState(null)
  const [idPeer, setIdPeer] = useState('');

  const getCamera = (CallBack) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        CallBack(stream);
      });
  };

  const playVideo = (stream, elmentVideo) => {
    elmentVideo.srcObject = stream;
    elmentVideo.play();
  };

  useEffect(() => {
    getCamera((stream) => {
      playVideo(stream, localStream.current);
      const peer = new Peer();
      peer.on("open", (id) => setIdPeer(id));
      peer.on('call', call => {
        getCamera((stream) => {
            call.answer(stream)
            playVideo(stream, localStream.current);
            call.on('stream', remoteStream => {
                console.log(remoteStreamUser)
                playVideo(remoteStream, remoteStreamUser.current)
            })
        })
      })
      setPeer(peer)
    });
  }, []);

  const Caller = () => {
    if(idCaller) {
        getCamera((stream) => {
            playVideo(stream, localStream.current);
            const call = peer.call(idCaller, stream)
            call.on('stream', remoteStream => {
                playVideo(remoteStream, remoteStreamUser.current)
            })
          });
    }
  }

  const values = {
    localStream,
    idPeer,
    Caller,
    idCaller,
    setIdCaller,
    remoteStreamUser
  };

  return (
    <socketContext.Provider value={values}>{children}</socketContext.Provider>
  );
};

export default SocketProvider;
