import type { HeaderProps } from '../types'

export default function Header({ theme, toggleTheme, lang, setLang, t }: HeaderProps) {
    const toggleLanguage = () => {
        setLang(lang === 'es' ? 'en' : 'es')
    }

    return (
        <header className='app-header'>
            <h1>{t.title}</h1>
            <div className='header-controls'>
                {/* Botón de Tema Alternable */}
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