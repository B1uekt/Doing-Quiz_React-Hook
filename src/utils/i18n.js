import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HomePage from '../components/Home/Homepage';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    // here we will place our translations...
                    HomePage: {
                        maintitle: "There's a better way to ask",
                        title: `You don't want to make boring form. 
                        And your audience won't answer one. 
                        Create a typeform instead- and make everyone happy.`,
                        titlebtn: {
                            login: `Get's started.It's free`,
                            doquiz: `Doing Quiz Now`
                        }
                    }
                }
            },
            vi: {
                translation: {
                    // here we will place our translations...
                    HomePage: {
                        maintitle: "Có rất nhiều cách để hỏi",
                        title: `Không biết thì google`,
                        titlebtn: {
                            login: `Get's started. It's free`,
                            doquiz: `Doing Quiz Now`
                        }
                    }
                }
            },
        }
    });

export default i18n;