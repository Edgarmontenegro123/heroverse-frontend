import {useState, useEffect} from 'react'
import axios from 'axios'
import type {Hero, FilterState} from '../types'

export const useHeroes = (search: string, filters: FilterState) => {
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
                setHeroes(response.data.slice(0, 8))
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
    }, [search, filters.publisher, filters.alignment])

    return { heroes, loading }
}