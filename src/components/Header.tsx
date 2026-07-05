import type {HeaderProps} from '../types'
import logo from '../assets/logo.png'

export default function Header({ theme, toggleTheme, lang, setLang, t }: HeaderProps) {
    const toggleLanguage = () => {
        setLang(lang === 'es' ? 'en' : 'es')
    }

    return (
        <header className='app-header'>
            <div className='header-logo-container'>
                <img
                    src={logo}
                    alt={t['title'] || 'HeroVerse Multiverse'}
                    className='header-logo-img'
                />
            </div>
            <div className='header-controls'>
                <button onClick={toggleTheme} className='control-btn'>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <button onClick={toggleLanguage} className='control-btn lang-toggle-btn'>
                    {lang.toUpperCase()}
                </button>
            </div>
        </header>
    )
}