
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';
const Language = () => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <NavDropdown className="nav-dropdown languages" title={i18n.language === 'vi' ? 'Việt nam' : 'English'} id="basic-nav-dropdown2">
            <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>Eng</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>VI</NavDropdown.Item>
        </NavDropdown>
    )
}
export default Language