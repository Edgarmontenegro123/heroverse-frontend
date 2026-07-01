import type {HeroModalProps} from '../types'

export default function HeroModal({hero, onClose, t}: HeroModalProps) {
    if (!hero) return null

    const alignmentClass = hero.biography.alignment || 'neutral'

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div
                className={`modal-content modal-alignment-${alignmentClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button className='modal-close-btn' onClick={onClose}>×</button>
                <div className='modal-body'>
                    <div className='modal-image-container'>
                        <img src={hero.images.sm} alt={hero.name} />
                    </div>
                    <div className='modal-info-container'>
                        <h2>{hero.name}</h2>
                        <div className='modal-details'>
                            <p><strong>{t.realName}:</strong> {hero.biography.fullName || '—'}</p>
                            <p><strong>{t.placeOfBirth}:</strong> {hero.biography.placeOfBirth || '—'}</p>
                            <p><strong>{t.firstAppearance}:</strong> {hero.biography.firstAppearance || '—'}</p>
                        </div>
                        <div className='modal-stats-section'>
                            <h3>{t.stats}</h3>
                            <div className='modal-stats-grid'>
                                <div className='modal-stat-item'><span>{t.intelligence}:</span> <strong>{hero.powerstats.intelligence || 0}</strong></div>
                                <div className='modal-stat-item'><span>{t.strength}:</span> <strong>{hero.powerstats.strength || 0}</strong></div>
                                <div className='modal-stat-item'><span>{t.speed}:</span> <strong>{hero.powerstats.speed || 0}</strong></div>
                                <div className='modal-stat-item'><span>{t.durability}:</span> <strong>{hero.powerstats.durability || 0}</strong></div>
                                <div className='modal-stat-item'><span>{t.power}:</span> <strong>{hero.powerstats.power || 0}</strong></div>
                                <div className='modal-stat-item'><span>{t.combat}:</span> <strong>{hero.powerstats.combat || 0}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}