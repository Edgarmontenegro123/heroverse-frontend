import {useState, useEffect} from 'react'
import axios from 'axios'
import type {Hero, FilterState} from '../types'

export const useHeroes = (search: string, filters: FilterState, page: number) => {
    const [heroes, setHeroes] = useState<Hero[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchHeroes = async () => {
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/characters', {
                    params: {
                        name: search,
                        publisher: filters.publisher,
                        alignment: filters.alignment
                    }
                })

                let data: Hero[] = Array.isArray(response.data) ? response.data : response.data.data || []

                // Por si las moscas el backend no filtró por bando/empresa, lo aseguramos en el cliente:
                if (filters.publisher) {
                    data = data.filter(h => h.biography.publisher === filters.publisher)
                }
                if (filters.alignment) {
                    data = data.filter(h => h.biography.alignment === filters.alignment)
                }

                // Paginación manual infalible en el cliente para evitar la lista enorme
                const limit = 12
                const startIndex = (page - 1) * limit
                const endIndex = startIndex + limit

                setHeroes(data.slice(startIndex, endIndex))
            } catch (error) {
                console.error('Error fetching heroes:', error)
            } finally {
                setLoading(false)
            }
        }

        const delayDebounceFn = setTimeout(() => {
            fetchHeroes()
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search, filters.publisher, filters.alignment, page])

    return {heroes, loading}
}