import HeroCard from './HeroCard'
import type { HeroGridProps } from '../types'

export default function HeroGrid({ heroes, t }: HeroGridProps) {
    return (
        <main className='heroes-grid'>
            {heroes.map((hero) => (
                <HeroCard key={hero.id} hero={hero} t={t} />
            ))}
        </main>
    )
}