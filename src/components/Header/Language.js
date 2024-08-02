
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
const Language = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <NavDropdown className="nav-dropdown languages" title={i18n.language === 'vi' ? 'Vienamese' : 'English'} id="basic-nav-dropdown2">
            <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>ENG</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>VIE</NavDropdown.Item>
        </NavDropdown>
    )
}
export default Language