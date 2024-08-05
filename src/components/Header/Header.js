import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom";
import { postLogOut } from '../../services/AuthServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    // console.log('accont: ', account, 'isAuthenticated', isAuthenticated)
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/signup')
    }

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

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>

                <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar-brand active' : 'navbar-brand')} >React-Bootstrap</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{t('Header.title-1')}</NavLink>
                        <NavLink to="users" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{t('Header.title-2')}</NavLink>
                        <NavLink to="admins" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{t('Header.title-3')}</NavLink>
                    </Nav>
                    <Nav>
                        {/* <Link to="/login">
                            <button className="btn-login">Log in</button>
                        </Link> */}
                        {isAuthenticated === false ?
                            <>

                                <button className="btn-login" onClick={() => handleLogin()}>{t('Header.setting.login')}</button>
                                <button className="btn-signup" onClick={() => handleSignup()}>{t('Header.setting.signup')}</button>
                            </>
                            :
                            <NavDropdown className="nav-dropdown" title={t('Header.setting.title')} id="basic-nav-dropdown">
                                <NavDropdown.Item >{t('Header.setting.profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>{t('Header.setting.logout')}</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;