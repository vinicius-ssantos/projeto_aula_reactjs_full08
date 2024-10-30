import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import UserPage from './pages/User'
import EditUserPage from './pages/User/edit'

import './App.scss'
import RolePage from "./pages/Role";
import EditRolePage from "./pages/Role/edit";
import HomeRole from "./pages/Role/HomeRole";

const router = createBrowserRouter([
  { path: '/', Component: LoginPage },
  { path: '/login', Component: LoginPage },
  { path: '/home', Component: HomePage },
  { path: '/home/role', Component: HomeRole },
  { path: '/user/create', Component: UserPage },
  { path: '/user/:id/edit', Component: EditUserPage },
  { path: '/role/create', Component: RolePage },
  { path: '/role/:id/edit', Component: EditRolePage }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}