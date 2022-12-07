import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./routes/root";
import { Login, action as loginAction } from "./routes/login";
import ErrorPage from "./error-page";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root />}>
//       <Route path="login" element={<Login />} />
//     </Route>
//   )
// );

// let router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "login",
//         element: <Login />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login/",
        element: <Login />,
        action: loginAction
      },
    ],
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
