import { FaSun, FaMoon, FaLanguage } from 'react-icons/fa'
import type { HeaderProps } from '../types'

export default function Header({ theme, toggleTheme, lang, setLang, t }: HeaderProps) {
    return (
        <header className='main-header'>
            <h1>{t.title}</h1>
            <div className='header-controls'>
                <button onClick={toggleTheme} className='control-btn' title='Toggle Theme'>
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <button
                    onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                    className='control-btn'
                    title='Change Language'
                >
                    <FaLanguage /> <span className='lang-text'>{lang.toUpperCase()}</span>
                </button>
            </div>
        </header>
    )
}