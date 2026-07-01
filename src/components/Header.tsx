import type {HeaderProps} from '../types'

export default function Header({ theme, toggleTheme, lang, setLang, t }: HeaderProps) {
    return (
        <header className='app-header'>
            <h1>{t.title}</h1>
            <div className='header-controls'>
                <button onClick={toggleTheme} className='control-btn'>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as any)}
                    className='lang-select'
                >
                    <option value='es'>ES</option>
                    <option value='en'>EN</option>
                </select>
            </div>
        </header>
    )
}