import { useContext } from "react";
import Video from "./component/Video";

import { socketContext } from "./context/socket";

function App() {
  const { localStream, idPeer, idCaller, setIdCaller, remoteStreamUser, Caller } =
    useContext(socketContext);

  return (
    <div className="App">
      <span style={{ display: "block", marginLeft: 10 }}>ID: {idPeer}</span>
      <div style={{ marginTop: 5, display: "flex", marginBottom: 5 }}>
        <Video id="Me" refVideo={localStream} />
        <Video id="Me" refVideo={remoteStreamUser}/>
      </div>

      <input type="text" placeholder="Nhập id" value={idCaller} onChange={e=> {
        setIdCaller(e.target.value)
      }}/>
      <button onClick={Caller}>Call</button>
    </div>
  );
}

export default App;
