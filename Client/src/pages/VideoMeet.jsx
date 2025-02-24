// // this is an the main conponent that is used for the vieomeeting
// import React, { useEffect, useRef, useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import io from "socket.io-client";
// // import "../styles/VideoMeet.css";



// //firt of all we need to take the server url
// const server_url="http://localhost:8080";

// //then create the collection of the connections


// //stunn server is basically we take the public ip from the our mobiles or devices local ip to the communication
// // stun server are lightweight servers running on the public internet which return the ip address of the requesters devises
// //we go to the routes and write some code for if some paths are matchins that means if our some pathe which is the our room path then what happens

// var connections={};

// const peerConfigConnections={
//     "iceServers":[
//         {"urls":"stun:stun.l.google.com:19302"}
//     ]
// }
// //for getting the location were we are or what is the comman link so for getting that link we use [windows.location.href]
// export default function VideoMeetComponent() {

//   const socketRef = useRef(null);  //for getting the socket reference
//     let socketIdRef=useRef(); //when we connect then we get the socket id we add that soket id
//     let localVideoRef=useRef(); //that is for the our video and for the another peopels video we define tha array
//    let [videoAvailable, setVideoAvailable]=useState(true); //for getting the avalaible video the diffrence is that if we have the video as hardwere voice or permission vioive
//    let [audioAvailable, setAudioAvailable]=useState(true);
//    let[video,setVideo]=useState([]);//that is used when suppose we close our video or display our video then that time that is used 
//    let [audio,setAudio]=useState();
//    let [screen,setScreen]=useState();
//    let [showModel, setModal]=useState();//that is used when some popup are happens
//    let [screenAvailable, setScreenAvaliable]=useState();//to ensure that screenshare is avalaible or not
//    let [messages,setMessages]=useState();//that is for the all messages 
//    let [message,setMessage]=useState();//that is for the single message which is sended by client
//    let [newMessages, setNewMessages]=useState(0);//that is used forwhen the new message is pop up or the new message is come
//    let [askForUsername,setAskForUsername]=useState(true); //for ask for the usename when use is enter by the gest account
//    let [username,setUsername]=useState("");

//    const videoRef=useRef([]); //that is for the list of the vodeo references
//    let [videos,setVideos]=useState([]);

//    //now we have to set the checks  for the webrtc because that only work on the crome based browsers

// //    if(isChrome()==false){

// //    }

// //we create the async function for the getting the permissions

// const getPermissions=async()=>{
//   try{
//         const videoPermission=  await navigator.mediaDevices.getUserMedia({video:true});//we use the navigator because navigator has the all the asscess of our hardwares and everything like camera , audi etc sothats why we use here the navigator

//         if(videoPermission){ //after getting the video permission then set video true
//           setVideoAvailable(true);

//         }
//         else{
//           setVideoAvailable(false);
//         }

//         //now for ggting the permissions for the audipermissions

//         const audioPermission= await navigator.mediaDevices.getUserMedia({audio:true});

//         if(audioPermission){//after getting the permissions for the audio then set the avaliableaudio true
//           setAudioAvailable(true);

//         }
//         else{
//           setAudioAvailable(false);
//         }
//         //now checkingg for the screen share we use this

//         if(navigator.mediaDevices.getDisplayMedia){
//           setScreenAvaliable(true);
//         }
//         else{
//           setScreenAvaliable(false);
//         }

//         //now we getting the streme the vido for the live video using that we can share that as a live meeting or the video call

//         if(videoAvailable || audioAvailable){ //if any of them is avlaible then we can able to start the video stream
//           const userMediaStream= await navigator.mediaDevices.getUserMedia({video: videoAvailable, audio: audioAvailable});  //acording to that which is availabele the stream is continue

//           if(userMediaStream){ //if usermediastream is avalaible
//             window.localStream=userMediaStream; //set the localstream as the userMediaStrem which is available by the user which contains the audio or the video 

//             if(localVideoRef.current){ //if our stream of localstrem is rendered successfully then we set the srcObject because in the javascript we use the sorceObject for the stremming the video or object
//               localVideoRef.current.srcObject=userMediaStream;

//             }

//           }
//         }
//   }
//   catch(err){

//     console.log(err);
//   }
// }

// //now we taking the permissions for the video meeting for that we use the useeffect
// useEffect(()=>{

//   getPermissions()
// },[])

// //NOW WE CREATING THE FUNCTION WHICH IS USED FOR WHEN SUPPOSE I CLOSED THE MY VIDEO THEN FROM THE ALL DEVISES MY VIDEO GONA BE OFF FOR THAT THIS FUNCTIONS IS USED 

// let getUserMediaSuccess =(stream)=>{
//    try{
//      window.localStream.getTracks().forEach(track=> track.stop()) //getting the all tracks and stop thats and restart that tracks 
//    }
//    catch{

//     window.localStream=stream;//if video is getting of then stream video is mutted 
//     localVideoRef.current.srcObject=stream; 

//     for( let id in connections){
//       if(id == socketIdRef.current)continue;
//     }

//     connections[id].addStream(window.localStream)

//     connections[id].createOffer().then((description)=>{
//       connections[id].setLocalDescription(description).then(()=>{
//         socketIdRef.current.emit("signal",id, JSON.stringify({"sdp":connections[id].localDescription}))
//       }).catch(e=>console.log(e));
//     })
//   }

//   stream.getTracks().forEach(track=> track.onended=()=>{ //if track is endded 
//     setVideo(false); //then false the video and voice as blacksclience
//     setAudio(false);

//     try{
//       let tracks=localVideoRef.current.srcObject.getTracks()
//       tracks.forEach(track=> track.shop(0))
//     }catch(e){
//       console.log(e);
//     }

//     //this is done for the black screen
//     let blackSilence = (...args) => new MediaStream([black(...args), silence()]) //when we close our video then it gives the blackscrren at the place of videp
//                   window.localStream = blackSilence()
//                   localVideoRef.current.srcObject=window.localStream; //that is used when client close the video then that chenges is also reflected to the local stream such as display the black screen

//     for(let id in connections){
//       connections[id].addStream(window.localStream)
//       connections[id].createOffer().then((description)=>{
//         connections[id].setLocalDescription(description).then(()=>{
//           socketRef.current.emit("signal",id, JSON.stringify({
//             "sdp":connections[id].localDescription}))
//         }).catch(e=> console.log(e));
//       })
//     }
//   })
// }

// //when audio is muted then what we have to send for that we create hte silence function

// let silence=()=>{
//   let ctx=new AudioContext() //that is for the audio we use the AudioContext that is represents the audiomodules that is an collections of the audio modules
//   let oscillator=ctx.createOscillator(); //oscillator is bassically used for the frequency
//   let dst= oscillator.connect(ctx.createMediaStreamDestination());//that is used as an a destination for the sound

//   oscillator.start();
//   ctx.resume()
//   return Object.assign(dst.stream.getAudioTracks()[0],{enabled:false})
// }

// let black=({width=640, height=480}={})=>{
//    let canvas=object.assign(document.createElement("canvas"),{width,height});

//    canvas.getContext('2d').fillRect(0,0,width,height);
//    let stream=canvas.captureStrem();
//    return Object.assign(stream.getVideoTracks()[0],{enabled:false})
// }

// //for saving the changes of stremming the video and audio
// let getUserMedia= ()=>{ //that functin is used because when user off the video or the audio or change the settings of the strem then changes save
// if((video && videoAvailable) || (audio && audioAvailable)){ //according to that state change the main video or the audio settings

//   navigator.mediaDevices.getUserMedia({video:video,audio:audio})//we using the video as state of the video and the audio as the audio state because we set the current vieo and the audio state 
//   .then(getUserMediaSuccess) //to get the usermedia sucess for all connected devices 
//   .then((stream)=>{})
//   .catch((e)=>console.log(e))
// }else{
// //we many time useages the try and chatch blocks because suppose due to some resons some changes are happens then it not create the any problem for thatwe takes that because that is live streamming platform
//   try{
//      let tracks=localVideoRef.current.srcObject.getTracks();
//      tracks.forEach(track => track.stop()) 
//   }
//   catch(e){

//   }
// }

// }

// //now we get dependency useeffect 
// useEffect(()=>{
//   if(video != undefined && audio != undefined){ //if our audio and the video is not undefined then getusermedia
//    getUserMedia()
//   }
// },[audio,video]) //whenever the video and the audio is changes then that useeffect is effected

// //getting message from the server

// //we create offer that is some thing that is letter sended to server and server send to other and other send the letter to the server and server send that letter to us and after that is connection setted sucessfully
// const gotMessageFromServer=(fromId,message)=>{
 
//   var signal=JSON.parse(message)
//   if(fromId != socketIdRef.current){ //that condition is ued if the message sender id is not sender then that happen other voice that message not recive who sending that message

//     if(signal.sdp){ //if session description is available

//       connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(()=>{
//         if(signal.sdp.type=="offer"){

//           connections[fromId].createAnswer().then((description)=>{
//             connections[fromId].setLocalDescription(description).then(()=>{
//               socketIdRef.current.emit("signal",fromId, JSON.stringify({"sdp":connections[fromId].localDescription})) //now sending the signal that stun signal is accepted and now we cal talk throw stunn server then send id and local description 
//             }).catch(e=> console.log(e));
//           }).catch(e=>console.log(e))
//         }
//       }).catch(e=> console.log(e)); //getting the session description and reading that session description

//     }
//   }
//   if(signal.ice){
//     connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e=>console.log(e))
//   }
// }

// let addMessage=()=>{

// }

// //now we have to establish the connection to the webRtc 

// let connectToSocketServer = () => {
//   socketRef.current = io.connect(server_url, { secure: false })

//   socketRef.current.on('signal', gotMessageFromServer) //that signal is sended and this is geted into the gotMessageFromServer

//   socketRef.current.on('connect', () => {
//       socketRef.current.emit('join-call', window.location.href)
//       socketIdRef.current = socketRef.current.id

//       socketRef.current.on('chat-message', addMessage)

//       socketRef.current.on('user-left', (id) => {
//           setVideos((videos) => videos.filter((video) => video.socketId !== id))
//       })

//       socketRef.current.on('user-joined', (id, clients) => {
//           clients.forEach((socketListId) => {

//               connections[socketListId] = new RTCPeerConnection(peerConfigConnections) //that is used for the connection with the web rtc 
//               // Wait for their ice candidate       
//               connections[socketListId].onicecandidate = function (event) { //ice meance is protocol that is used for make the direct connection beetween two client that sending the to signaling server for the connection set up with the candidate
//                   if (event.candidate != null) {
//                       socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
//                   }
//               }

//               // Wait for their video stream
//               connections[socketListId].onaddstream = (event) => { //when any stream is added
//                   console.log("BEFORE:", videoRef.current);
//                   console.log("FINDING ID: ", socketListId);

//                   let videoExists = videoRef.current.find(video => video.socketId === socketListId);

//                   if (videoExists) {
//                       console.log("FOUND EXISTING");

//                       // Update the stream of the existing video
//                       setVideos(videos => {
//                           const updatedVideos = videos.map(video =>
//                               video.socketId === socketListId ? { ...video, stream: event.stream } : video  );//suppose we have the video of piyush but we take the socket id of ashish then check the socket ides of the socket then we write the updated videos                         );
//                           videoRef.current = updatedVideos;
//                           return updatedVideos;
//                       });
//                   } else {
//                       // Create a new video
//                       console.log("CREATING NEW");
//                       let newVideo = {
//                           socketId: socketListId,
//                           stream: event.stream,
//                           autoplay: true,
//                           playsinline: true
//                       };

//                       setVideos(videos => {
//                           const updatedVideos = [...videos, newVideo];
//                           videoRef.current = updatedVideos;
//                           return updatedVideos;
//                       });
//                   }
//               };


//               // Add the local video stream
//               if (window.localStream !== undefined && window.localStream !== null) {  //any thing which comes after the windows. that are accessible from the everywhre even brower consolele
//                   connections[socketListId].addStream(window.localStream)
//               } else {
//                   let blackSilence = (...args) => new MediaStream([black(...args), silence()]) //when we close our video then it gives the blackscrren at the place of videp
//                   window.localStream = blackSilence()
//                   connections[socketListId].addStream(window.localStream) //adding the strem of black 
//               }
//           })

//           if (id === socketIdRef.current) {
//               for (let id2 in connections) { //now we create hte offerlette
//                   if (id2 === socketIdRef.current) continue

//                   try {
//                       connections[id2].addStream(window.localStream)
//                   } catch (e) { }

//                   connections[id2].createOffer().then((description) => {
//                       connections[id2].setLocalDescription(description)
//                           .then(() => {
//                               socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription })) //sdp=>session description that part is used for handshake for the connection estabilishment
//                           })
//                           .catch(e => console.log(e))
//                   })
//               }
//           }
//       })
//   })
// }

// let getMedia = () => {
//   setVideo(videoAvailable); //setting the video from the videoAvailable
//   setAudio(audioAvailable);//setting the audio from the audioAvailable  
//   connectToSocketServer();

// }

// let connect = () => {
//   setAskForUsername(false);
//   getMedia();
// }




// //flochar
// // first comes the lobby then we enter htere our username and any other detail and then then if we click to connect then we connect our socket server after that connection when the new user comes then we make the connection of that user with our socket path

//   return (
//     <div>

   
//    {askForUsername == true? //that is used for the asking the user name if that is true then render ... or render ..
// <div>

// <h2>Enter into lobby</h2>
// <TextField id="outlined-basic" label="Username" value={username} onChange={e =>setUsername(e.target.value)} variant="outlined" />
// <Button variant="contained" onClick={connect}>Connect</Button>
// {/* now we create the div for the vodeo and that that is comes from the video reference */}
// <div>
//   <video ref={localVideoRef} autoPlay muted></video>
// </div>
// </div> : <>

// <video ref={localVideoRef} autoPlay muted></video> 

// {videos.map((video)=>(

// <div key={video.socketId}>
//     <h2>{video.socketId}</h2>
// </div>

// ))}

// </>   
// }
       

//     </div>
//   )
// }

// // this is an the main conponent that is used for the vieomeeting
//  import React, { useEffect, useRef, useState } from 'react';
//  import TextField from '@mui/material/TextField';
//  import Button from '@mui/material/Button';
//  import io from "socket.io-client";
//  import styles from "../styles/VideoComponent.module.css";
// import { Badge, colors, IconButton } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import MicIcon from '@mui/icons-material/Mic';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
//  //firt of all we need to take the server url
//  const server_url="http://localhost:8080";
//  //then create the collection of the connections


//  //stunn server is basically we take the public ip from the our mobiles or devices local ip to the communication
//  // stun server are lightweight servers running on the public internet which return the ip address of the requesters devises
//  //we go to the routes and write some code for if some paths are matchins that means if our some pathe which is the our room path then what happens

//  var connections={};

//  const peerConfigConnections={
//      "iceServers":[
//          {"urls":"stun:stun.l.google.com:19302"}
//      ]
//  }

// export default function VideoMeetComponent() {

//     var socketRef = useRef();
//     let socketIdRef = useRef();

//     let localVideoref = useRef(null);

//     let [videoAvailable, setVideoAvailable] = useState(true);

//     let [audioAvailable, setAudioAvailable] = useState(true);

//     let [video, setVideo] = useState([]);

//     let [audio, setAudio] = useState();

//     let [screen, setScreen] = useState();

//     let [showModal, setModal] = useState(true);

//     let [screenAvailable, setScreenAvailable] = useState();

//     let [messages, setMessages] = useState([])

//     let [message, setMessage] = useState("");

//     let [newMessages, setNewMessages] = useState(3);

//     let [askForUsername, setAskForUsername] = useState(true);

//     let [username, setUsername] = useState("");

//     const videoRef = useRef([])

//     let [videos, setVideos] = useState([])

//     // TODO
//     // if(isChrome() === false) {


//     // }

//     useEffect(() => {
//         console.log("HELLO")
//         getPermissions();

//     })

//     let getUserMediaSuccess = (stream) => {
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream;
//         localVideoref.current.srcObject = stream;

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => [
//                 console.log(description)
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             ])
//         }
    


//     let getDislayMedia = () => {
//         if (screen) {
//             if (navigator.mediaDevices.getDisplayMedia) {
//                 navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
//                     .then(getDislayMediaSuccess)
//                     .then((stream) => { })
//                     .catch((e) => console.log(e))
//             }
//         }
//     }

//     const getPermissions = async () => {
//         try {
//             const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoPermission) {
//                 setVideoAvailable(true);
//                 console.log('Video permission granted');
//             } else {
//                 setVideoAvailable(false);
//                 console.log('Video permission denied');
//             }

//             const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
//             if (audioPermission) {
//                 setAudioAvailable(true);
//                 console.log('Audio permission granted');
//             } else {
//                 setAudioAvailable(false);
//                 console.log('Audio permission denied');
//             }

//             if (navigator.mediaDevices.getDisplayMedia) {
//                 setScreenAvailable(true);
//             } else {
//                 setScreenAvailable(false);
//             }

//             if (videoAvailable || audioAvailable) {
//                 const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
//                 if (userMediaStream) {
//                     window.localStream = userMediaStream;
//                     if (localVideoref.current) {
//                         localVideoref.current.srcObject = userMediaStream;
//                     }
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (video !== undefined && audio !== undefined) {
//             getUserMedia();
//             console.log("SET STATE HAS ", video, audio);

//         }


//     }, [video, audio])
//     let getMedia = () => {
//         setVideo(videoAvailable);
//         setAudio(audioAvailable);
//         connectToSocketServer();

//     }


//     let getUserMedia = () => {
//         if ((video && videoAvailable) || (audio && audioAvailable)) {
//             navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
//                 .then(getUserMediaSuccess)
//                 .then((stream) => { })
//                 .catch((e) => console.log(e))
//         } else {
//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { }
//         }
//     }

    
//         stream.getTracks().forEach(track => track.onended = () => {
//             setVideo(false);
//             setAudio(false);

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             for (let id in connections) {
//                 connections[id].addStream(window.localStream)

//                 connections[id].createOffer().then((description) => {
//                     connections[id].setLocalDescription(description)
//                         .then(() => {
//                             socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                         })
//                         .catch(e => console.log(e))
//                 })
//             }
//         })
//     }

    





//     let getDislayMediaSuccess = (stream) => {
//         console.log("HERE")
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream
//         localVideoref.current.srcObject = stream

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => {
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             })
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setScreen(false)

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             getUserMedia()

//         })
//     }

//     let gotMessageFromServer = (fromId, message) => {
//         var signal = JSON.parse(message)

//         if (fromId !== socketIdRef.current) {
//             if (signal.sdp) {
//                 connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//                     if (signal.sdp.type === 'offer') {
//                         connections[fromId].createAnswer().then((description) => {
//                             connections[fromId].setLocalDescription(description).then(() => {
//                                 socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
//                             }).catch(e => console.log(e))
//                         }).catch(e => console.log(e))
//                     }
//                 }).catch(e => console.log(e))
//             }

//             if (signal.ice) {
//                 connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
//             }
//         }
//     }




//     let connectToSocketServer = () => {
//         socketRef.current = io.connect(server_url, { secure: false })

//         socketRef.current.on('signal', gotMessageFromServer)

//         socketRef.current.on('connect', () => {
//             socketRef.current.emit('join-call', window.location.href)
//             socketIdRef.current = socketRef.current.id

//             socketRef.current.on('chat-message', addMessage)

//             socketRef.current.on('user-left', (id) => {
//                 setVideos((videos) => videos.filter((video) => video.socketId !== id))
//             })

//             socketRef.current.on('user-joined', (id, clients) => {
//                 clients.forEach((socketListId) => {

//                     connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
//                     // Wait for their ice candidate       
//                     connections[socketListId].onicecandidate = function (event) {
//                         if (event.candidate != null) {
//                             socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
//                         }
//                     }

//                     // Wait for their video stream
//                     connections[socketListId].onaddstream = (event) => {
//                         console.log("BEFORE:", videoRef.current);
//                         console.log("FINDING ID: ", socketListId);

//                         let videoExists = videoRef.current.find(video => video.socketId === socketListId);

//                         if (videoExists) {
//                             console.log("FOUND EXISTING");

//                             // Update the stream of the existing video
//                             setVideos(videos => {
//                                 const updatedVideos = videos.map(video =>
//                                     video.socketId === socketListId ? { ...video, stream: event.stream } : video
//                                 );
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         } else {
//                             // Create a new video
//                             console.log("CREATING NEW");
//                             let newVideo = {
//                                 socketId: socketListId,
//                                 stream: event.stream,
//                                 autoplay: true,
//                                 playsinline: true
//                             };

//                             setVideos(videos => {
//                                 const updatedVideos = [...videos, newVideo];
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         }
//                     };


//                     // Add the local video stream
//                     if (window.localStream !== undefined && window.localStream !== null) {
//                         connections[socketListId].addStream(window.localStream)
//                     } else {
//                         let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//                         window.localStream = blackSilence()
//                         connections[socketListId].addStream(window.localStream)
//                     }
//                 })

//                 if (id === socketIdRef.current) {
//                     for (let id2 in connections) {
//                         if (id2 === socketIdRef.current) continue

//                         try {
//                             connections[id2].addStream(window.localStream)
//                         } catch (e) { }

//                         connections[id2].createOffer().then((description) => {
//                             connections[id2].setLocalDescription(description)
//                                 .then(() => {
//                                     socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
//                                 })
//                                 .catch(e => console.log(e))
//                         })
//                     }
//                 }
//             })
//         })
//     }

//     let silence = () => {
//         let ctx = new AudioContext()
//         let oscillator = ctx.createOscillator()
//         let dst = oscillator.connect(ctx.createMediaStreamDestination())
//         oscillator.start()
//         ctx.resume()
//         return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
//     }
//     let black = ({ width = 640, height = 480 } = {}) => {
//         let canvas = Object.assign(document.createElement("canvas"), { width, height })
//         canvas.getContext('2d').fillRect(0, 0, width, height)
//         let stream = canvas.captureStream()
//         return Object.assign(stream.getVideoTracks()[0], { enabled: false })
//     }

//     const handleVideo = () => {
//         setVideo(!video)
//         // if (window.localStream) {
//         //     let videoTrack = window.localStream.getTracks().find(track => track.kind === 'video');
//         //     if (videoTrack) {
//         //         videoTrack.enabled = !videoTrack.enabled; // Toggle video
//         //         setVideo(prevVideo => videoTrack.enabled); // Ensure state updates correctly
//         //     }
//         // }
//     };
//     let handleAudio = () => {
//         setAudio(!audio)
//         // getUserMedia();
//     }

//     let getDislayMedia=()=>{

//     }

//     useEffect(() => {
//         if (screen !== undefined) {
//             getDislayMedia();
//         }
//     }, [screen])
//     // useEffect(() => {
//     //     if (video !== undefined) {
//     //         getDislayMedia();
//     //     }
//     // }, [video])
//     let handleScreen = () => {
//         setScreen(!screen);
//     }

//     let handleEndCall = () => {
//         try {
//             let tracks = localVideoref.current.srcObject.getTracks()
//             tracks.forEach(track => track.stop())
//         } catch (e) { }
//         window.location.href = "/"
//     }

//     let openChat = () => {
//         setModal(true);
//         setNewMessages(0);
//     }
//     let closeChat = () => {
//         setModal(false);
//     }
//     let handleMessage = (e) => {
//         setMessage(e.target.value);
//     }



//     const addMessage = (data, sender, socketIdSender) => {
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: sender, data: data }
//         ]);
//         if (socketIdSender !== socketIdRef.current) {
//             setNewMessages((prevNewMessages) => prevNewMessages + 1);
//         }
//     };



//     let sendMessage = () => {
//         console.log(socketRef.current);
//         socketRef.current.emit('chat-message', message, username)
//         setMessage("");

//         // this.setState({ message: "", sender: username })
//     }

    
//     let connect = () => {
//         setAskForUsername(false);
//         getMedia();
//     }


//       return (
//     <div>

   
//    {askForUsername == true? //that is used for the asking the user name if that is true then render ... or render ..
// <div>

// <h2>Enter into lobby</h2>
// <TextField id="outlined-basic" label="Username" value={username} onChange={e =>setUsername(e.target.value)} variant="outlined" />
// <Button variant="contained" onClick={connect}>Connect</Button>
// {/* now we create the div for the vodeo and that that is comes from the video reference */}
// <div>
//   <video ref={localVideoref} autoPlay muted></video>
// </div>
// </div> : <div className={styles.meetUserVideoContainer}>


//   <div className={styles.buttonController}>
//    <IconButton onClick={handleVideo} style={{color:"white"}}>
//     {(video==true)? <VideocamIcon/>:<VideocamOffIcon/>}
//    </IconButton>
//    <IconButton style={{color:"red"}}>
//     <CallEndIcon/>
//    </IconButton>
//    <IconButton onClick={handleAudio} style={{color:"white"}}>
//     {(audio==true)? <MicIcon/>:<MicOffIcon/>}
//    </IconButton>

//    {screenAvailable ==true ?
//       <IconButton style={{color:"white"}}>
//       {screen==true? <ScreenShareIcon/>:<StopScreenShareIcon/>}
//      </IconButton> :<></>
// }

// <Badge badgeContent={newMessages} max={999} color='secondry'>
// <IconButton style={{color:"white"}}>
//    <ChatIcon/>  
//    </IconButton>
// </Badge>

//   </div>

// <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video> 
// <div className={styles.conferenceView}>
// {videos.map((video)=>(

// <div key={video.socketId}>
//     {/* <h2>{video.socketId}</h2> */}
//     <video data-socket={video.socketId} ref={ref=>{
//       if(ref && video.stream){
//         ref.srcObject=video.stream;
//       }
//     }} autoPlay></video>
// </div>

// ))}
// </div>

// </div>   
// }
       

//     </div>
//   )
// }

import React, { useEffect, useRef, useState } from 'react';
 import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';
 import io from "socket.io-client";
 import styles from "../styles/VideoComponent.module.css";
import { Badge, colors, IconButton } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
 //firt of all we need to take the server url
 const server_url="http://localhost:8080";

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef(null);
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(3);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    // TODO
    // if(isChrome() === false) {


    // }

    useEffect(() => {
        console.log("HELLO")
        getPermissions();

    })

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);

        }


    }, [video, audio])
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }




    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }





    let getDislayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }




    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND EXISTING");

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };


                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => {
        setVideo(!video);
        // getUserMedia();
    }
    let handleAudio = () => {
        setAudio(!audio)
        // getUserMedia();
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])
    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/"
    }

    let openChat = () => {
        setModal(true);
        setNewMessages(0);
    }
    let closeChat = () => {
        setModal(false);
    }
    let handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };



    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("");

        // this.setState({ message: "", sender: username })
    }

    
    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }


    return (
        <div>

            {askForUsername === true ?

                <div>


                    <h2>Enter into Lobby </h2>
                    <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                    <Button variant="contained" onClick={connect}>Connect</Button>


                    <div>
                        <video ref={localVideoref} autoPlay muted></video>
                    </div>

                </div> :


                <div className={styles.meetVideoContainer}>

                    {showModal ? <div className={styles.chatRoom}> 

                        <div className={styles.chatContainer}>
                            <h1>Chat</h1>

                            <div className={styles.chattingDisplay}>

                                {messages.length !== 0 ? messages.map((item, index) => {

                                    console.log(messages)
                                    return (
                                        <div style={{ marginBottom: "20px" }} key={index}>
                                            <p style={{ fontWeight: "bold" }}>{item.sender}</p>
                                            <p>{item.data}</p>
                                        </div>
                                    )
                                }) : <p>No Messages Yet</p>}


                            </div>

                            <div className={styles.chattingArea}>
                                <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Enter Your chat" variant="outlined" />
                                <Button variant='contained' onClick={sendMessage}>Send</Button>
                            </div>


                        </div>
                    </div> : <></>}


                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "white" }}>
                            {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                            <CallEndIcon  />
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{ color: "white" }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        {screenAvailable === true ?
                            <IconButton onClick={handleScreen} style={{ color: "white" }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton> : <></>}

                        <Badge badgeContent={newMessages} max={999} color='orange'>
                            <IconButton onClick={() => setModal(!showModal)} style={{ color: "white" }}>
                                <ChatIcon />                        </IconButton>
                        </Badge>

                    </div>


                    <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>

                    <div className={styles.conferenceView}>
                        {videos.map((video) => (
                            <div key={video.socketId}>
                                <video

                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                >
                                </video>
                            </div>

                        ))}

                    </div>

                </div>

            }

        </div>
    )
}