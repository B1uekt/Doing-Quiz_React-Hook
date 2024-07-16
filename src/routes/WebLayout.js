import { Route, Routes } from "react-router-dom";

import App from '../App';
import User from '../components/User/User'
import Admin from '../components/Admin/Admin'
import HomePage from '../components/Home/Homepage';
import ManageUser from '../components/Admin/Content/ManageUser';
import Dashboard from '../components/Admin/Content/DashBoard';
import Login from '../components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "../components/Auth/Register";

const WebLayout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="users" element={<User />}></Route>

                </Route>
                <Route path="/admins" element={<Admin />}>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="manage-users" element={<ManageUser />}></Route>
                </Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Register />} ></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    )
}
export default WebLayout;