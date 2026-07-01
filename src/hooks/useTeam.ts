import {useState, useEffect} from 'react'
import type {Hero} from '../types'

export const useTeam = () => {
    const [favorites, setFavorites] = useState<Hero[]>(() => {
        const saved = localStorage.getItem('hero_team')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('hero_team', JSON.stringify(favorites))
    }, [favorites])

    const handleToggleFavorite = (hero: Hero) => {
        const isFav = favorites.some((fav) => fav.id === hero.id)
        if (isFav) {
            setFavorites(favorites.filter((fav) => fav.id !== hero.id))
        } else {
            setFavorites([...favorites, hero])
        }
    }

    return { favorites, handleToggleFavorite }
}