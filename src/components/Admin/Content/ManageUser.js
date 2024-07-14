import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUser } from "../../../services/UserServices";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
    const [showModelCreateUser, setShowModalCreateUser] = useState(false)
    const [listUser, setListUser] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})
    const [showModelDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelete] = useState({})

    useEffect(() => {
        fetchListUser();
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUser()
        if (res.EC === 0) {
            setListUser(res.DT)
        }

    }

    const handleAddUser = () => {
        setShowModalCreateUser(true);
    }

    const handleEditBtn = (user) => {
        setShowModalCreateUser(true);
        setDataUpdate(user);

    }
    const handleDeleteBtn = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user)
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => handleAddUser(true)}>
                        <FcPlus /> Add new user
                    </button>

                </div>
                <div className="table-users-container">
                    <TableUser listUser={listUser}
                        handleEditBtn={handleEditBtn}
                        handleDeleteBtn={handleDeleteBtn}
                    />

                </div>
                <ModalCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate} />

                <ModalDeleteUser
                    show={showModelDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUser={fetchListUser}
                    dataDelete={dataDelete} />
            </div>
        </div>
    )
}
export default ManageUser