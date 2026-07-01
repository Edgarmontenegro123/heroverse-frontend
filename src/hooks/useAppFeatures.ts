import {useState, useEffect} from 'react'
import type {Language} from '../types'

export const useAppFeatures = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [lang, setLang] = useState<Language>('es')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return { theme, toggleTheme, lang, setLang }
}