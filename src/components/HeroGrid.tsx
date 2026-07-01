import HeroCard from './HeroCard'
import type {HeroGridProps} from '../types'

export default function HeroGrid({heroes, t, onViewDetail, favorites, onToggleFavorite}: HeroGridProps) {
    return (
        <main className='heroes-grid'>
            {heroes.map((hero) => {
                const isFavorite = favorites.some((fav) => fav.id === hero.id)

                return (
                    <HeroCard
                        key={hero.id}
                        hero={hero}
                        t={t}
                        onViewDetail={onViewDetail}
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                    />
                )
            })}
        </main>
    )
}