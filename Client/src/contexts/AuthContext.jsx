// import axios from "axios";
// import httpStatus from "http-status";
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import server from "../environment";


// export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: `http://localhost:8080/api/v1/users`
// })


// export const AuthProvider = ({ children }) => {

//     const authContext = useContext(AuthContext);


//     const [userData, setUserData] = useState(authContext);


//     const router = useNavigate();

//     const handleRegister = async (name, username, password) => {
//         try {
//             let request = await client.post("/register", {
//                 name: name,
//                 username: username,
//                 password: password
//             })


//             if (request.status === httpStatus.CREATED) {
//                 return request.data.message;
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     const handleLogin = async (username, password) => {
//         try {
//             let request = await client.post("/login", {
//                 username: username,
//                 password: password
//             });

//             console.log(username, password)
//             console.log(request.data)

//             if (request.status === httpStatus.OK) {
//                 localStorage.setItem("token", request.data.token);
//                 router("/home")
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     // const getHistoryOfUser = async () => {
//     //     try {
//     //         let request = await client.get("/get_all_activity", {
//     //             params: {
//     //                 token: localStorage.getItem("token")
//     //             }
//     //         });
//     //         return request.data
//     //     } catch
//     //      (err) {
//     //         throw err;
//     //     }
//     // }

//     // const addToUserHistory = async (meetingCode) => {
//     //     try {
//     //         let request = await client.post("/add_to_activity", {
//     //             token: localStorage.getItem("token"),
//     //             meeting_code: meetingCode
//     //         });
//     //         return request
//     //     } catch (e) {
//     //         throw e;
//     //     }
//     // }


//     const data = {
//         userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
//     }

//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     )

// }

// //we only access the usenavigate inside the router 

import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `http://localhost:8080/api/v1/users`
});

export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let response = await client.post("/register", { name, username, password });

            if (response.status === httpStatus.CREATED) {
                return response.data.message;
            }
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            let response = await client.post("/login", { username, password });

            if (response.status === httpStatus.OK) {
                localStorage.setItem("token", response.data.token);
                setUserData(response.data.user); // Store user info
                router("/home");
            }
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
          
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        addToUserHistory,
        getHistoryOfUser
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

// Hook for easier use of AuthContext
export const useAuth = () => useContext(AuthContext);
