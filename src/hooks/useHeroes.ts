import { useState, useEffect } from 'react'
import axios from 'axios'
import type { Hero } from '../types'

export const useHeroes = (search: string) => {
    const [heroes, setHeroes] = useState<Hero[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchHeroes = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`http://localhost:5000/api/characters`, {
                    params: { name: search }
                })
                // Mantenemos los primeros 8 para conservar la interfaz dinámica y escaneable
                setHeroes(response.data.slice(0, 8))
            } catch (error) {
                console.error('Error fetching heroes:', error)
            } finally {
                setLoading(false)
            }
        }

        // Pequeño debounce implícito para no saturar al backend escribiendo rápido
        const delayDebounceFn = setTimeout(() => {
            fetchHeroes()
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search])

    return { heroes, loading }
}