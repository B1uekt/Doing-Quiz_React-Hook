import { Route, Routes } from "react-router-dom";

import App from '../App';
// import User from '../components/User/User'
import Admin from '../components/Admin/Admin'
import HomePage from '../components/Home/Homepage';
import ManageUser from '../components/Admin/Content/ManageUser';
import Dashboard from '../components/Admin/Content/DashBoard';
import Login from '../components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "../components/Auth/Register";
import ListQuiz from "../components/User/ListQuiz";
import DetailQuiz from "../components/User/DetailQuiz";
import ManageQuiz from "../components/Admin/Content/Quiz/ManageQuiz";
import ManageQuestions from "../components/Admin/Content/Questions/ManageQuestions";
import PrivateRoute from "./PrivateRoute";
import { Suspense } from "react";
const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger ">
            404. Not found data with your current url
        </div>
    )
}


const WebLayout = () => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>}></Route>

                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />}></Route>

                <Route path="/admins" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>}>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="manage-users" element={<ManageUser />}></Route>
                    <Route path="manage-quiz" element={<ManageQuiz />}></Route>
                    <Route path="manage-questions" element={<ManageQuestions />}></Route>
                </Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Register />} ></Route>
                <Route path="*" element={<NotFound />} ></Route>
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
        </Suspense>
    )
}
export default WebLayout;