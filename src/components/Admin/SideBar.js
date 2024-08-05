import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaReact, FaRegLaughWink } from 'react-icons/fa';
import sidebarBg from '../../assets/images/bg2.jpg'
import { useTranslation } from 'react-i18next';
const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    const { t } = useTranslation();
    const navigate = useNavigate()
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <FaReact size={'3em'} color={'00bfff'} />
                        <span onClick={() => navigate('/')}> Admin </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            {t('Admin.SideBar.dashBoard')}
                            <Link to="/admins" />
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}> components </MenuItem> */}
                    </Menu>
                    <Menu iconShape="FaGem">
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            icon={<FaRegLaughWink />}
                            title={t('Admin.SideBar.feature')}
                        >
                            <MenuItem >
                                <Link to="/admins/manage-users " />
                                {t('Admin.SideBar.manage-users')}</MenuItem>
                            <MenuItem>
                                <Link to="/admins/manage-quiz" />{t('Admin.SideBar.manage-quizzes')}</MenuItem>
                            <MenuItem><Link to="/admins/manage-questions" />{t('Admin.SideBar.manage-question')}</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>


            </ProSidebar>
        </>
    )
}

export default SideBar;