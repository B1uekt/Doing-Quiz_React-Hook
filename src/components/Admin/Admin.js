import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from "react"
import { Outlet } from "react-router-dom"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from '../../components/Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    return (

        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header d-flex justify-content-between align-items-center">
                    <span onClick={() => setCollapsed(!collapsed)}><FaBars className="btn-admin-header" /></span>
                    <div className="right-side d-flex">
                        <Language />
                        <NavDropdown className="nav-dropdown" title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item >Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>

                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>

        </div>


    )
}
export default Admin