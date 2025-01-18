import {createBrowserRouter} from "react-router-dom"
import App from "./App";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FriendRequest from "./components/FriendRequest";
import Profile from "./components/Profile";





const router = createBrowserRouter([
    {path: '/',element:<App/>},
    {path: '/register',element:<Register/>},
    {path: '/login',element:<Login/>},
    {path: '/friend',element:<FriendRequest/>},
    {path: '/profile',element:<Profile/>},


   
    
])

export default router;