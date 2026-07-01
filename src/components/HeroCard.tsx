import type {HeroCardProps} from '../types'

export default function HeroCard({hero, t, onViewDetail, isFavorite, onToggleFavorite}: HeroCardProps) {
    return (
        <div className='hero-card'>
            <div className='image-container'>
                <img src={hero.images.sm} alt={hero.name} />
                <span className={`badge ${hero.biography.alignment}`}>
          {t[hero.biography.alignment] || hero.biography.alignment.toUpperCase()}
        </span>
            </div>
            <div className='hero-info'>
                <h3>{hero.name}</h3>
                <p className='publisher'>{hero.biography.publisher}</p>
                <div className='stats-box'>
                    <h4>{t.stats}:</h4>
                    <div className='stat-row'><span>{t.intelligence}:</span> <strong>{hero.powerstats.intelligence || 0}</strong></div>
                    <div className='stat-row'><span>{t.strength}:</span> <strong>{hero.powerstats.strength || 0}</strong></div>
                    <div className='stat-row'><span>{t.speed}:</span> <strong>{hero.powerstats.speed || 0}</strong></div>
                </div>
                <div className='card-actions'>
                    <button
                        className='action-btn detail-btn'
                        onClick={() => onViewDetail(hero)}
                    >
                        {t.viewProfile}
                    </button>
                    <button
                        className={`action-btn team-btn ${isFavorite ? 'remove' : 'add'}`}
                        onClick={() => onToggleFavorite(hero)}
                    >
                        {isFavorite ? t.removeFromTeam : t.addToTeam}
                    </button>
                </div>
            </div>
        </div>
    )
}