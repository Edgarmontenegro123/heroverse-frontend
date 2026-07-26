import {useState} from 'react'
import type {Hero, HeroCompareProps, BattleLogItem} from '../types'

export default function HeroCompare({heroes, onClear, onRandomMatchup, t}: HeroCompareProps) {
    const [hero1, hero2] = heroes

    // Identificador único del enfrentamiento actual
    const fightKey = `${hero1?.id || 'none'}-${hero2?.id || 'none'}`

    // Guardamos la clave anterior para detectar el cambio durante el renderizado
    const [prevFightKey, setPrevFightKey] = useState<string>(fightKey)

    // --- Estados para el motor de simulación de batalla ---
    const [isFighting, setIsFighting] = useState<boolean>(false)
    const [activeStatIndex, setActiveStatIndex] = useState<number>(-1)
    const [battleFinished, setBattleFinished] = useState<boolean>(false)

    // 💡 AHORA: battleLog guarda objetos de tipo BattleLogItem[], NO cadenas de texto estáticas
    const [battleLog, setBattleLog] = useState<BattleLogItem[]>([])

    // Ajustamos los estados durante el renderizado si cambian los héroes
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
        const logEntries: BattleLogItem[] = []

        const interval = setInterval(() => {
            const currentStat = statsList[step]
            const v1 = hero1.powerstats[currentStat.key as keyof typeof hero1.powerstats] || 0
            const v2 = hero2.powerstats[currentStat.key as keyof typeof hero2.powerstats] || 0

            // 💡 AHORA: En lugar de crear un string estático, guardamos los datos puros de la ronda
            if (v1 > v2) {
                logEntries.push({
                    winnerName: hero1.name,
                    loserName: hero2.name,
                    statKey: currentStat.key,
                    statLabel: currentStat.label,
                    diff: v1 - v2,
                    isTie: false
                })
            } else if (v2 > v1) {
                logEntries.push({
                    winnerName: hero2.name,
                    loserName: hero1.name,
                    statKey: currentStat.key,
                    statLabel: currentStat.label,
                    diff: v2 - v1,
                    isTie: false
                })
            } else {
                logEntries.push({
                    winnerName: '',
                    loserName: '',
                    statKey: currentStat.key,
                    statLabel: currentStat.label,
                    diff: 0,
                    isTie: true
                })
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
                    {/* Botón Aleatorio */}
                    <button
                        className='control-btn random-btn'
                        onClick={onRandomMatchup}
                        disabled={isFighting}
                    >
                        🎲 {t.randomMatchup || 'Aleatorio'}
                    </button>
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
                        {battleLog.map((item, index) => {
                            // 💡 AHORA: Traducimos la estadística y la frase EN TIEMPO REAL en cada renderizado usando 't'
                            const currentStatLabel = t[item.statKey] || item.statLabel

                            return (
                                <p key={index} className='battle-log-item animate-fade-in'>
                                    {item.isTie ? (
                                        `⚖️ ${t.empateIn || 'Empate en'} ${currentStatLabel}`
                                    ) : (
                                        `⚡ ${item.winnerName} ${t.overcomes || 'supera a'} ${item.loserName} ${t.inStat || 'en'} ${currentStatLabel} (+${item.diff} pts)`
                                    )}
                                </p>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    )
}