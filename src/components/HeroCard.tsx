import type { HeroCardProps } from '../types'

export default function HeroCard({ hero, t }: HeroCardProps) {
    return (
        <div className='hero-card'>
            <div className='image-container'>
                <img src={hero.images.sm} alt={hero.name} />
                <span className={`badge ${hero.biography.alignment}`}>
          {hero.biography.alignment.toUpperCase()}
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

                {/* Acción real: Redirección limpia a una búsqueda externa con target _blank */}
                <button
                    className='action-btn'
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(hero.name + ' ' + hero.biography.publisher)}`, '_blank')}
                >
                    {t.viewProfile}
                </button>
            </div>
        </div>
    )
}