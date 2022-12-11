
const Video = ({id, refVideo}) => {
    return ( <video style={{backgroundColor: '#333', margin: '0 10px'}} height={200} width={200} id={id} ref={refVideo}></video>);
}
 
export default Video;