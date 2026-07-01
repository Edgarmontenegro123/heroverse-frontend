import { useState, useEffect } from 'react'
import type { Hero } from '../types'

export const useVersus = () => {
    // Inicializa el estado de la arena buscando si había una batalla guardada
    const [compareHeroes, setCompareHeroes] = useState<Hero[]>(() => {
        const savedArena = localStorage.getItem('hero_verse_arena')
        return savedArena ? JSON.parse(savedArena) : []
    })

    // Guarda automáticamente los contrincantes seleccionados en el navegador
    useEffect(() => {
        localStorage.setItem('hero_verse_arena', JSON.stringify(compareHeroes))
    }, [compareHeroes])

    const handleSelectForCompare = (hero: Hero) => {
        setCompareHeroes((prev) => {
            // Si ya está en la arena, no hace nada
            if (prev.some((h) => h.id === hero.id)) return prev
            // Máximo 2 héroes en combate
            if (prev.length >= 2) return [prev[1], hero]
            return [...prev, hero]
        })
    }

    const clearArena = () => {
        setCompareHeroes([])
    }

    return {
        compareHeroes,
        handleSelectForCompare,
        clearArena
    }
}