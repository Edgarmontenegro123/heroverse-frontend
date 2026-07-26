export default function HeroSkeletonCard() {
    return (
        <div className='hero-card skeleton-card'>
            {/* Imagen esqueleto */}
            <div className='skeleton-image shimmer'></div>
            <div className='hero-card-content'>
                {/* Título esqueleto */}
                <div className='skeleton-text skeleton-title shimmer'></div>
                {/* Badge/Stats esqueleto */}
                <div className='skeleton-text skeleton-sub shimmer'></div>
                {/* Botón esqueleto */}
                <div className='skeleton-button shimmer'></div>
            </div>
        </div>
    )
}