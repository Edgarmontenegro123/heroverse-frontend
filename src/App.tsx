import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import HeroGrid from './components/HeroGrid'
import HeroModal from './components/HeroModal'
import { useHeroes } from './hooks/useHeroes'
import { useAppFeatures } from './hooks/useAppFeatures'
import { useTeam } from './hooks/useTeam'
import { translations } from './utils/languages'
import type { FilterState, Hero } from './types'

export default function App() {
    const { theme, toggleTheme, lang, setLang } = useAppFeatures()
    const { favorites, handleToggleFavorite } = useTeam()

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null)
    const [filters, setFilters] = useState<FilterState>({ publisher: '', alignment: '' })

    // Desestructuramos totalPages desde nuestro hook actualizado
    const { heroes, loading, totalPages } = useHeroes(search, filters, page)
    const t = translations[lang]

    useEffect(() => {
        setPage(1)
    }, [search, filters])

    return (
        <div className='app-container'>
            <Header theme={theme} toggleTheme={toggleTheme} lang={lang} setLang={setLang} t={t} />
            <SearchBar search={search} setSearch={setSearch} t={t} />
            <FilterPanel filters={filters} setFilters={setFilters} t={t} />

            {loading ? (
                <div className='loading-spinner'>...</div>
            ) : (
                <>
                    <HeroGrid
                        heroes={heroes}
                        t={t}
                        onViewDetail={setSelectedHero}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                    />

                    {/* Nueva Paginación Avanzada */}
                    <div className='pagination-container'>
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className='pagination-btn'>◀</button>

                        <div className='pagination-info'>
                            <span>{lang === 'es' ? `Página ${page} de ${totalPages}` : `Page ${page} of ${totalPages}`}</span>

                            {/* Selector dinámico para saltar a una página específica */}
                            <select
                                value={page}
                                onChange={(e) => setPage(Number(e.target.value))}
                                className='page-select'
                            >
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <option key={p} value={p}>
                                        {lang === 'es' ? `Ir a pág. ${p}` : `Go to p. ${p}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className='pagination-btn'>▶</button>
                    </div>
                </>
            )}

            {favorites.length > 0 && (
                <section className='team-section'>
                    <hr className='section-divider' />
                    <h2>{t.myTeamTitle}</h2>
                    <HeroGrid
                        heroes={favorites}
                        t={t}
                        onViewDetail={setSelectedHero}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </section>
            )}

            <HeroModal hero={selectedHero} onClose={() => setSelectedHero(null)} t={t} />
        </div>
    )
}