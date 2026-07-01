import type { Hero } from '../types'

interface HeroCompareProps {
    heroes: Hero[]
    onClear: () => void
    t: any
    lang: string // Lo mantenemos por si tipado lo requiere, aunque usamos 't'
}

export default function HeroCompare({ heroes, onClear, t }: HeroCompareProps) {
    const [hero1, hero2] = heroes

    const getStatsTotal = (h: Hero | undefined) => {
        if (!h) return 0
        return Object.values(h.powerstats).reduce((acc, stat) => acc + (stat || 0), 0)
    }

    const total1 = getStatsTotal(hero1)
    const total2 = getStatsTotal(hero2)

    const getWinnerClass = (val1: number, val2: number, current: 1 | 2) => {
        if (val1 === val2) return ''
        if (val1 > val2) return current === 1 ? 'stat-winner' : 'stat-loser'
        return current === 2 ? 'stat-winner' : 'stat-loser'
    }

    const statsList = [
        { key: 'intelligence', label: t.intelligence },
        { key: 'strength', label: t.strength },
        { key: 'speed', label: t.speed },
        { key: 'durability', label: t.durability },
        { key: 'power', label: t.power },
        { key: 'combat', label: t.combat }
    ]

    return (
        <section className='compare-section'>
            <hr className='section-divider' />
            <div className='compare-header'>
                <h2>{t.versusTitle}</h2>
                <button className='control-btn' onClick={onClear}>
                    {t.clearArena}
                </button>
            </div>

            <div className='compare-arena-grid'>
                <div className={`compare-card ${hero1 ? `alignment-${hero1.biography.alignment}` : ''}`}>
                    {hero1 ? (
                        <>
                            <img src={hero1.images.sm} alt={hero1.name} />
                            <h3>{hero1.name}</h3>
                            <p className='compare-total-badge'>Total: {total1} pts</p>
                            {hero2 && total1 > total2 && <span className='winner-ribbon'>{t.winner}</span>}
                        </>
                    ) : (
                        <div className='placeholder-slot'>{t.selectHero}</div>
                    )}
                </div>

                <div className='compare-stats-center'>
                    {hero1 && hero2 ? (
                        statsList.map((stat) => {
                            const v1 = hero1.powerstats[stat.key as keyof typeof hero1.powerstats] || 0
                            const v2 = hero2.powerstats[stat.key as keyof typeof hero2.powerstats] || 0

                            return (
                                <div key={stat.key} className='compare-stat-row-visual'>
                                    <span className={`side-stat ${getWinnerClass(v1, v2, 1)}`}>{v1}</span>
                                    <div className='center-label-bar'>
                                        <span className='stat-name-label'>{stat.label}</span>
                                        <div className='dual-progress-bar'>
                                            <div className='bar-left' style={{ width: `${v1}%` }}></div>
                                            <div className='bar-right' style={{ width: `${v2}%` }}></div>
                                        </div>
                                    </div>
                                    <span className={`side-stat ${getWinnerClass(v1, v2, 2)}`}>{v2}</span>
                                </div>
                            )
                        })
                    ) : (
                        <div className='waiting-message'>{t.waitingOpponent}</div>
                    )}
                </div>

                <div className='compare-card ${hero2 ? `alignment-${hero2.biography.alignment}` : ""}_'>
                    {hero2 ? (
                        <>
                            <img src={hero2.images.sm} alt={hero2.name} />
                            <h3>{hero2.name}</h3>
                            <p className='compare-total-badge'>Total: {total2} pts</p>
                            {hero1 && total2 > total1 && <span className='winner-ribbon'>{t.winner}</span>}
                        </>
                    ) : (
                        <div className='placeholder-slot'>{t.selectSecondHero}</div>
                    )}
                </div>
            </div>
        </section>
    )
}