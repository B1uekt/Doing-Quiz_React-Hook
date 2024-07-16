import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from "react";
import TableUserPaginate from "./TableUserPaginate";
import { getAllUser, getUserWithPaginate } from "../../../services/UserServices";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
    const LIMIT_USER = 7;
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewUser, setViewUser] = useState(false)
    const [showModelCreateUser, setShowModalCreateUser] = useState(false)

    const [listUser, setListUser] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})
    const [showModelDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelete] = useState({})

    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1)
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUser()
        if (res.EC === 0) {
            setListUser(res.DT)
        }

    }

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            //console.log('res.dt= ', res.DT)
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }

    }

    const handleAddUser = () => {
        setShowModalCreateUser(true);
    }

    const handleEditBtn = (user) => {
        setShowModalCreateUser(true);
        setDataUpdate(user);

    }
    const handleViewBtn = (user) => {
        setShowModalCreateUser(true);
        setDataUpdate(user);
        setViewUser(true)
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
                    <TableUserPaginate listUser={listUser}
                        handleEditBtn={handleEditBtn}
                        handleDeleteBtn={handleDeleteBtn}
                        handleViewBtn={handleViewBtn}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        isViewUser={isViewUser}
                        setViewUser={setViewUser}
                    />

                </div>
                <ModalCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isViewUser={isViewUser}
                    setViewUser={setViewUser}
                />

                <ModalDeleteUser
                    show={showModelDeleteUser}
                    setShow={setShowModalDeleteUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    dataDelete={dataDelete}
                    currentPage={currentPage} />
            </div>
        </div>
    )
}
export default ManageUser