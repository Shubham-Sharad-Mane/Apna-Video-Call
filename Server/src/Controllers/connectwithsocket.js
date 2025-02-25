// import { Server } from "socket.io";

// const connectwithsocket=async(server)=>{


//     const io=new Server(server, {
//         cors:{

//             origin:"*",
//             methods:["GET","POST"],
//             allowedHeaders:["*"],
//             credentials:true
//         }
//     });
//     // return io;

// }

// let connections={}
// let messages={}
// let timeOnline={}

// //making the connections when the users are joins the stream or they connected with the sockets

// io.on("connection",(socket)=>{ //connection is an eventlistener when someone is sending the requeste then that is used to connect them  and the call back use the name of the socket that is refers to the person who is joined and according to that we perform the operations

// // we trying ti create the array which path array which has the difrent diffrent paths of the video meeting and each meeting is alo array because it contains the multipal sockets means the multipal users id 
//     socket.on("join-call",(path)=>{
//     if(connections[path]== undefined){
//         connections[path]=[];
//     }
//     connections[path].push(socket.id);//add the users id to the perticular location pathe of the meeting

//     timeOnline[socket.id]=new Date(); //give the exact time where the user is joined perticular time

//     for(let a=0;a<connections[path].length;i++){
//         io.to(connections[path][a]).emit("user-joined",socket.id, connections[path]); 
//     }


//     if(messages[path]!= undefined){
     
//         for(let a=0;a<messages[path].length;a++){
//             io.to(socket.id).emit("chat-message",messages[path][a]['data'],
//                 messages[path][a]['sender'],messages[path][a]['socket-id-sender']) //socket-id-sender is used fpr detecting the who are sending the message or the data
//         }
//     }


//     });

//     socket.on("signal",(toId,message)=>{
//     io.to(toId).emit("signal",socket.id,message);
//     });

//     //there is an idea like try to fetch who is the sender and in which path he is according to that we have to send the perticular message 
//     socket.on("chat-message",(data,sender)=>{
//         //ensoring that perticular path is finded or not for that we use  this functin
//         const [matchingRoom, found]=Object.entries(connections)
//         .reduce(([room,isFound],[roomKey, roomValue])=>{

//             if(!isFound && roomValue.includes(socket.id)){
//                 return [roomKey,true];
//             }

//             return [room, isFound];
//         },['',false]);


//          if(found==true){
//             if(matchingRoom==undefined){
//                 messages[matchingRoom]=[];
//             }

//             messages[matchingRoom].push({"sender": sender, "data": data, "socket-id-sender":socket.id});

//             console.log("message",key ,":",sender,data);

//             messages[matchingRoom].forEach((element) => {
//                 io.to(element).emit("chat-message",sender,data,socket.id);
//             });
//          }


//     });

//     socket.on("disconnect",()=>{

//         var diffTime=Math.abs(timeOnline[socket.id]-new Date()); //how much time the user is online
//          var key
//          //k=path of the meeting or room  and the v= the persons are present in that connection
//          for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){

//             for(let a=0;a<v.length; ++a){ //iterating on the each of the persons who are present into the room  and then checking that the person who trying to disconnect is that equals to the present iterating socket id then emit that user is left 
//                 if(v[a]== socket.id){
//                     key =k

//                     for(let a=0;a<connections[key].length;++a){
//                         io.to(connections[key][a]).emit('user-left',socket.id)
//                     }

//                     var index=connections[key].indexOf(socket.id)

//                     connections[key].splice(index,1)

//                     if(connections[key].length==0){
//                         delete connections[key];
//                     }
//                 }
//             }
//          }
//     })


// });






// export default connectwithsocket;

import { Server } from "socket.io";

const connectwithsocket = async (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
        },
    });

    let connections = {};
    let messages = {};
    let timeOnline = {};

    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {
            if (connections[path] === undefined) {
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; a++) {
                    io.to(socket.id).emit(
                        "chat-message",
                        messages[path][a]["data"],
                        messages[path][a]["sender"],
                        messages[path][a]["socket-id-sender"]
                    );
                }
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections).reduce(
                ([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                },
                ["", false]
            );

            if (found) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = [];
                }

                messages[matchingRoom].push({
                    sender: sender,
                    data: data,
                    "socket-id-sender": socket.id,
                });

                console.log("message", matchingRoom, ":", sender, data);

                messages[matchingRoom].forEach((element) => {
                    io.to(element).emit("chat-message", sender, data, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            var key;
            for (const [k, v] of Object.entries(connections)) {
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k;
                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit("user-left", socket.id);
                        }

                        var index = connections[key].indexOf(socket.id);
                        connections[key].splice(index, 1);

                        if (connections[key].length === 0) {
                            delete connections[key];
                        }
                    }
                }
            }
        });
    });

    return io; // ✅ Return `io` so you can use it in other files
};

export default connectwithsocket;
