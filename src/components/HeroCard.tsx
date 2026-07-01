import type {HeroCardProps} from '../types'

export default function HeroCard({ hero, t, onViewDetail, isFavorite, onToggleFavorite }: HeroCardProps) {
    // Aseguramos una clase por defecto si viene vacío
    const alignmentClass = hero.biography.alignment || 'neutral'

    return (
        <div
            className={`hero-card alignment-${alignmentClass}`}
            onClick={() => onViewDetail(hero)}
            style={{ cursor: 'pointer' }} // Agrega el cursor de mano para indicar que es cliqueable
        >
            <div className='image-container'>
                <img src={hero.images.sm} alt={hero.name} />
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
                        className={`action-btn team-btn ${isFavorite ? 'remove' : 'add'}`}
                        onClick={(e) => {
                            e.stopPropagation() // 👈 Evita que se abra el modal al hacer clic en el botón del equipo
                            onToggleFavorite(hero)
                        }}
                    >
                        {isFavorite ? t.removeFromTeam : t.addToTeam}
                    </button>
                </div>
            </div>
        </div>
    )
}