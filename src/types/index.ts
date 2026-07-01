export type Language = 'es' | 'en'

export interface Hero {
    id: number
    name: string
    powerstats: {
        intelligence: number
        strength: number
        speed: number
        durability: number
        power: number
        combat: number
    }
    images: {
        sm: string
    }
    biography: {
        publisher: string
        alignment: string
    }
}

export interface Message {
    id: number
    name: string
    email: string
    text: string
    date: string
}

export interface HeaderProps {
    theme: 'light' | 'dark'
    toggleTheme: () => void
    lang: Language
    setLang: (lang: Language) => void
    t: Record<string, string>
}