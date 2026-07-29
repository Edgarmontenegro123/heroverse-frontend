import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import type {Hero, FilterState, SortState} from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useHeroes = (search: string, filters: FilterState, page: number) => {
    const [heroes, setHeroes] = useState<Hero[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    // Referencia para mantener TODOS los personajes descargados de la API (para el sorteo aleatorio)
    const allHeroesRef = useRef<Hero[]>([])

    // Estado para controlar el ordenamiento dinámico por powerstats
    const [sort, setSort] = useState<SortState>({field: 'none', direction: 'desc'})

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

                // Guardamos la lista completa en nuestra referencia
                allHeroesRef.current = data

                if (filters.publisher) {
                    data = data.filter(h => h.biography.publisher === filters.publisher)
                }
                if (filters.alignment) {
                    data = data.filter(h => h.biography.alignment === filters.alignment)
                }

                // --- ORDENAMIENTO DINÁMICO POR POWERSTATS ---
                if (sort.field !== 'none') {
                    data.sort((a, b) => {
                        const fieldKey = sort.field as keyof typeof a.powerstats
                        const statA = Number(a.powerstats[fieldKey]) || 0
                        const statB = Number(b.powerstats[fieldKey]) || 0

                        return sort.direction === 'asc' ? statA - statB : statB - statA
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
            void fetchHeroes()
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [search, filters.publisher, filters.alignment, page, sort.field, sort.direction])

    // 🎲 Función dedicada a obtener 2 héroes aleatorios de la base completa de datos
    const getRandomHeroes = (): Hero[] => {
        const fullList = allHeroesRef.current
        if (fullList.length < 2) return []

        const idx1 = Math.floor(Math.random() * fullList.length)
        let idx2 = Math.floor(Math.random() * fullList.length)

        while (idx2 === idx1) {
            idx2 = Math.floor(Math.random() * fullList.length)
        }

        return [fullList[idx1], fullList[idx2]]
    }

    return {heroes, loading, totalPages, sort, setSort, getRandomHeroes}
}