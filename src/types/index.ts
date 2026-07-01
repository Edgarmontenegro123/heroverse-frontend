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

export interface HeaderProps {
    theme: 'light' | 'dark'
    toggleTheme: () => void
    lang: Language
    setLang: (lang: Language) => void
    t: Record<string, string>
}

export interface SearchBarProps {
    search: string
    setSearch: (value: string) => void
    t: Record<string, string>
}

export interface HeroCardProps {
    hero: Hero
    t: Record<string, string>
}

export interface HeroGridProps {
    heroes: Hero[]
    t: Record<string, string>
}

export interface FilterState {
    publisher: string
    alignment: string
}

export interface HeroModalProps {
    hero: Hero | null
    onClose: () => void
    t: Record<string, string>
}