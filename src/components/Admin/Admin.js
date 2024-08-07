import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from "react"
import { Outlet } from "react-router-dom"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from '../../components/Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import Profile from '../Header/Profile';
import { postLogOut } from '../../services/AuthServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
const Admin = (props) => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate();

    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const [showProfile, setShowProfile] = useState(false);
    const handleLogOut = async () => {
        let res = await postLogOut(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout())
            navigate('/login')
        }
        else {
            toast.error(res.EM)
        }
    }
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
                        <NavDropdown className="nav-dropdown" title={t('Header.setting.title')} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setShowProfile(true)}>{t('Header.setting.profile')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>{t('Header.setting.logout')}</NavDropdown.Item>
                        </NavDropdown>
                    </div>

                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>
            <Profile
                show={showProfile}
                setShow={setShowProfile}
            />
        </div>


    )
}
export default Admin