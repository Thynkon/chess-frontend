import * as React from "react";
import { createContext, useState } from "react";
import Api from "../api/requests";

// const api = new Api();
// const [authed, setAuthed] = useState(false);
// const login = (credentials: object) => {
//     return new Promise<void>((res) => {
//         setAuthed(true);
//         console.log("setAuthed(true)");
//         res();
//         // api.getAuthToken(credentials).then(async (response) => {
//         //     let authToken = response.data;
//         //     localStorage.setItem('auth-token', authToken.token);
//         //     setAuthed(true);
//         //     // React.useEffect(() => {
//         //     //     console.log("User authenticated - " + authed);
//         //     // });
//         //
//         //     //this.setState({ message: 'User successfully authenticated!' });
//         // }).catch(err => {
//         //     if (err.response.status === 401) {
//         //         //setMessage('Authentication failed! Please check your credentials and try again.');
//         //         // setError("test", { type: "focus" }, { shouldFocus: true });
//         //     }
//         // }).finally(() => {
//         //     // dispatch({ type: 'SIGN_IN', token: authToken });
//         //     setAuthed(false);
//         //     res();
//         // });
//     });
// })

// export const AuthContext = createContext({});
//
// export function useAuth() {
//     const [authed, setAuthed] = useState(false);
//
//     return {
//         authed,
//         login(credentials: object) {
//             return new Promise<void>((res) => {
//                 setAuthed(true);
//                 console.log("setAuthed(true)");
//                 res();
//                 // api.getAuthToken(credentials).then(async (response) => {
//                 //     let authToken = response.data;
//                 //     localStorage.setItem('auth-token', authToken.token);
//                 //     setAuthed(true);
//                 //     // React.useEffect(() => {
//                 //     //     console.log("User authenticated - " + authed);
//                 //     // });
//                 //
//                 //     //this.setState({ message: 'User successfully authenticated!' });
//                 // }).catch(err => {
//                 //     if (err.response.status === 401) {
//                 //         //setMessage('Authentication failed! Please check your credentials and try again.');
//                 //         // setError("test", { type: "focus" }, { shouldFocus: true });
//                 //     }
//                 // }).finally(() => {
//                 //     // dispatch({ type: 'SIGN_IN', token: authToken });
//                 //     setAuthed(false);
//                 //     res();
//                 // });
//             });
//         },
//         logout() {
//             return new Promise<void>((res) => {
//                 setAuthed(false);
//                 res();
//             });
//         },
//     };
// }