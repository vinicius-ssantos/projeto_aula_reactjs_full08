import React from 'react';
import LoginPage from './pages/Login';
import './App.scss';
import UserPage from "./pages/User";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
    {path: '/l', Component: LoginPage},
    {path: '/login', Component: LoginPage},
    {path: '/user/create', Component: UserPage},
]);
export default function App() {
    return (

        <RouterProvider router={router}/>

    )
}

