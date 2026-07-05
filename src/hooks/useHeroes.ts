import {useState, useEffect} from 'react'
import axios from 'axios'
import type {Hero, FilterState, SortState} from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useHeroes = (search: string, filters: FilterState, page: number) => {
    const [heroes, setHeroes] = useState<Hero[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    // Nuevo estado para controlar el ordenamiento dinámico por powerstats
    const [sort, setSort] = useState<SortState>({ field: 'none', direction: 'desc' })

    useEffect(() => {
        const fetchHeroes = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${API_URL}/api/characters`, {
                    params: {
                        name: search,
                        publisher: filters.publisher,
                        alignment: filters.alignment
                    }
                })

                let data: Hero[] = Array.isArray(response.data) ? response.data : response.data.data || []

                if (filters.publisher) {
                    data = data.filter(h => h.biography.publisher === filters.publisher)
                }
                if (filters.alignment) {
                    data = data.filter(h => h.biography.alignment === filters.alignment)
                }

                // --- INYECCIÓN DE ORDENAMIENTO DINÁMICO POR POWERSTATS ---
                if (sort.field !== 'none') {
                    data.sort((a, b) => {
                        const fieldKey = sort.field as keyof typeof a.powerstats

                        // Sanitización preventiva ante datos parciales de la Superhero API
                        const statA = Number(a.powerstats[fieldKey]) || 0
                        const statB = Number(b.powerstats[fieldKey]) || 0

                        if (sort.direction === 'asc') {
                            return statA - statB
                        } else {
                            return statB - statA
                        }
                    })
                }

                const limit = 12
                const total = Math.ceil(data.length / limit)
                setTotalPages(total > 0 ? total : 1)

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
        // Agregamos sort.field y sort.direction al array de dependencias para disparar el re-ordenamiento
    }, [search, filters.publisher, filters.alignment, page, sort.field, sort.direction])

    return { heroes, loading, totalPages, sort, setSort }
}