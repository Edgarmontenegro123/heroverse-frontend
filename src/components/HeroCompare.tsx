import {useState} from 'react'
import type {Hero, HeroCompareProps} from '../types'

export default function HeroCompare({ heroes, onClear, t }: HeroCompareProps) {
    const [hero1, hero2] = heroes

    // Identificador único del enfrentamiento actual
    const fightKey = `${hero1?.id || 'none'}-${hero2?.id || 'none'}`

    // Guardamos la clave anterior para detectar el cambio durante el renderizado (sin useEffect)
    const [prevFightKey, setPrevFightKey] = useState<string>(fightKey)

    // --- Estados para el motor de simulación de batalla ---
    const [isFighting, setIsFighting] = useState<boolean>(false)
    const [activeStatIndex, setActiveStatIndex] = useState<number>(-1)
    const [battleFinished, setBattleFinished] = useState<boolean>(false)
    const [battleLog, setBattleLog] = useState<string[]>([])

    // Ajustamos los estados durante el renderizado si cambian los héroes (Patrón recomendado por React)
    if (fightKey !== prevFightKey) {
        setPrevFightKey(fightKey)
        setIsFighting(false)
        setActiveStatIndex(-1)
        setBattleFinished(false)
        setBattleLog([])
    }

    const getStatsTotal = (h: Hero | undefined) => {
        if (!h) return 0
        return Object.values(h.powerstats).reduce((acc, stat) => acc + (stat || 0), 0)
    }

    const total1 = getStatsTotal(hero1)
    const total2 = getStatsTotal(hero2)

    const statsList = [
        { key: 'intelligence', label: t.intelligence },
        { key: 'strength', label: t.strength },
        { key: 'speed', label: t.speed },
        { key: 'durability', label: t.durability },
        { key: 'power', label: t.power },
        { key: 'combat', label: t.combat }
    ]

    // Handler para iniciar la simulación animada
    const handleStartFight = () => {
        if (!hero1 || !hero2 || isFighting) return

        setIsFighting(true)
        setActiveStatIndex(0)
        setBattleFinished(false)
        setBattleLog([])

        let step = 0
        const logEntries: string[] = []

        const interval = setInterval(() => {
            const currentStat = statsList[step]
            const v1 = hero1.powerstats[currentStat.key as keyof typeof hero1.powerstats] || 0
            const v2 = hero2.powerstats[currentStat.key as keyof typeof hero2.powerstats] || 0

            // Generamos la frase descriptiva del round
            if (v1 > v2) {
                logEntries.push(`⚡ ${hero1.name} ${t.overcomes || 'supera a'} ${hero2.name} ${t.inStat || 'en'} ${currentStat.label} (+${v1 - v2} pts)`)
            } else if (v2 > v1) {
                logEntries.push(`⚡ ${hero2.name} ${t.overcomes || 'supera a'} ${hero1.name} ${t.inStat || 'en'} ${currentStat.label} (+${v2 - v1} pts)`)
            } else {
                logEntries.push(`⚖️ ${t.empateIn || 'Empate en'} ${currentStat.label}`)
            }

            setBattleLog([...logEntries])
            step++
            setActiveStatIndex(step)

            if (step >= statsList.length) {
                clearInterval(interval)
                setIsFighting(false)
                setBattleFinished(true)
            }
        }, 450)
    }

    const getWinnerClass = (val1: number, val2: number, current: 1 | 2, index: number) => {
        // Solo resaltamos ganadores de la fila si el paso de la animación ya la alcanzó
        if (!battleFinished && index > activeStatIndex) return ''
        if (val1 === val2) return ''
        if (val1 > val2) return current === 1 ? 'stat-winner' : 'stat-loser'
        return current === 2 ? 'stat-winner' : 'stat-loser'
    }

    return (
        <section className='compare-section'>
            <hr className='section-divider' />
            <div className='compare-header'>
                <h2>{t.versusTitle}</h2>
                <div className='compare-actions'>
                    {hero1 && hero2 && !isFighting && !battleFinished && (
                        <button className='control-btn fight-btn' onClick={handleStartFight}>
                            ⚔️ {t.startFight || '¡Luchar!'}
                        </button>
                    )}
                    <button className='control-btn' onClick={onClear}>
                        {t.clearArena}
                    </button>
                </div>
            </div>

            <div className='compare-arena-grid'>
                {/* LUCHADOR 1 */}
                <div className={`compare-card ${hero1 ? `alignment-${hero1.biography.alignment}` : ''} ${isFighting ? 'fighting-shake' : ''}`}>
                    {hero1 ? (
                        <>
                            <img src={hero1.images.sm} alt={hero1.name} />
                            <h3>{hero1.name}</h3>
                            <p className='compare-total-badge'>Total: {total1} pts</p>
                            {hero2 && battleFinished && total1 > total2 && (
                                <span className='winner-ribbon animate-bounce'>{t.winner}</span>
                            )}
                        </>
                    ) : (
                        <div className='placeholder-slot'>{t.selectHero}</div>
                    )}
                </div>

                {/* BARRAS CENTRALES */}
                <div className='compare-stats-center'>
                    {hero1 && hero2 ? (
                        statsList.map((stat, idx) => {
                            const v1 = hero1.powerstats[stat.key as keyof typeof hero1.powerstats] || 0
                            const v2 = hero2.powerstats[stat.key as keyof typeof hero2.powerstats] || 0
                            const isCurrentStep = idx === activeStatIndex
                            const isRevealed = idx <= activeStatIndex || battleFinished

                            return (
                                <div key={stat.key} className={`compare-stat-row-visual ${isCurrentStep ? 'highlight-step' : ''}`}>
                                    <span className={`side-stat ${getWinnerClass(v1, v2, 1, idx)}`}>
                                        {isRevealed ? v1 : '?'}
                                    </span>
                                    <div className='center-label-bar'>
                                        <span className='stat-name-label'>{stat.label}</span>
                                        <div className='dual-progress-bar'>
                                            <div
                                                className='bar-left'
                                                style={{ width: isRevealed ? `${v1}%` : '0%', transition: 'width 0.4s ease' }}
                                            ></div>
                                            <div
                                                className='bar-right'
                                                style={{ width: isRevealed ? `${v2}%` : '0%', transition: 'width 0.4s ease' }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className={`side-stat ${getWinnerClass(v1, v2, 2, idx)}`}>
                                        {isRevealed ? v2 : '?'}
                                    </span>
                                </div>
                            )
                        })
                    ) : (
                        <div className='waiting-message'>{t.waitingOpponent}</div>
                    )}
                </div>

                {/* LUCHADOR 2 */}
                <div className={`compare-card ${hero2 ? `alignment-${hero2.biography.alignment}` : ''} ${isFighting ? 'fighting-shake' : ''}`}>
                    {hero2 ? (
                        <>
                            <img src={hero2.images.sm} alt={hero2.name} />
                            <h3>{hero2.name}</h3>
                            <p className='compare-total-badge'>Total: {total2} pts</p>
                            {hero1 && battleFinished && total2 > total1 && (
                                <span className='winner-ribbon animate-bounce'>{t.winner}</span>
                            )}
                        </>
                    ) : (
                        <div className='placeholder-slot'>{t.selectSecondHero}</div>
                    )}
                </div>
            </div>

            {/* RELATOR Y LOG DE BATALLA EN VIVO */}
            {battleLog.length > 0 && (
                <div className='battle-log-container'>
                    <h4>📜 {t.battleLogTitle || 'Relato del Combate'}</h4>
                    <div className='battle-log-list'>
                        {battleLog.map((log, index) => (
                            <p key={index} className='battle-log-item animate-fade-in'>
                                {log}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}