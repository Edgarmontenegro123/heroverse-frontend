import { useState, useEffect } from 'react'
import type { Language } from '../types'

export const useAppFeatures = () => {
    // Inicializa el tema buscando en localStorage; si no hay nada, el default es 'dark'
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('app-theme')
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark'
    })

    const [lang, setLang] = useState<Language>('es')

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    // Aplica el atributo al HTML y guarda la elección en localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return { theme, toggleTheme, lang, setLang }
}