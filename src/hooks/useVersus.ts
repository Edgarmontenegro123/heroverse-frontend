import {useState} from 'react'
import type {Hero} from '../types'

export const useVersus = () => {
    const [compareHeroes, setCompareHeroes] = useState<Hero[]>([])

    const handleSelectForCompare = (hero: Hero) => {
        setCompareHeroes((prev) => {
            const exists = prev.some((h) => h.id === hero.id)
            if (exists) {
                return prev.filter((h) => h.id !== hero.id)
            }
            if (prev.length < 2) {
                return [...prev, hero]
            }
            return [prev[0], hero]
        })
    }

    const clearArena = () => setCompareHeroes([])

    return {
        compareHeroes,
        handleSelectForCompare,
        clearArena
    }
}