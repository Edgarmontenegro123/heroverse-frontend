import type { Language } from '../types'

export const translations: Record<Language, Record<string, string>> = {
    es: {
        // --- Base & Header ---
        title: 'HeroVerse Multiverse',
        searchPlaceholder: 'Buscar héroe o villano...',
        viewProfile: 'Ver Detalle',
        close: 'Cerrar',

        // --- Atributos / Power Stats ---
        stats: 'Estadísticas de Poder',
        intelligence: 'Inteligencia',
        strength: 'Fuerza',
        speed: 'Velocidad',
        durability: 'Durabilidad',
        power: 'Poder',
        combat: 'Combate',

        // --- Filtros & Selectores ---
        allPublishers: 'Todas las Editoriales',
        allAlignments: 'Todos los Bandos',
        good: 'Héroe',
        bad: 'Villano',
        neutral: 'Neutral',

        // --- Gestión de Equipo (Mis Favoritos) ---
        addToTeam: 'Añadir al Equipo',
        removeFromTeam: 'Quitar del Equipo',
        myTeamTitle: 'Mi Equipo Personalizado',
        emptyTeam: 'Aún no has reclutado a nadie para tu equipo.',
        teamInstruction: '💡 Haz clic en los personajes de tu equipo para enviarlos a la Arena de Comparación Versus.',

        // --- Modal de Detalle de Perfil ---
        realName: 'Nombre Real',
        placeOfBirth: 'Lugar de Nacimiento',
        firstAppearance: 'Primera Aparición',

        // --- Arena Versus ---
        versusTitle: '⚔️ Arena Versus Multiverso',
        clearArena: 'Limpiar Arena',
        selectHero: 'Selecciona un héroe',
        selectSecondHero: 'Selecciona un segundo héroe',
        waitingOpponent: 'Falta elegir un oponente para iniciar la batalla...',
        winner: '🏆 GANADOR',

        // --- Paginación ---
        pageOf: 'Página',
        pageConnector: 'de',
        goToPage: 'Ir a pág.'
    },
    en: {
        // --- Base & Header ---
        title: 'HeroVerse Multiverse',
        searchPlaceholder: 'Search hero or villain...',
        viewProfile: 'View Details',
        close: 'Close',

        // --- Atributos / Power Stats ---
        stats: 'Power Stats',
        intelligence: 'Intelligence',
        strength: 'Strength',
        speed: 'Speed',
        durability: 'Durability',
        power: 'Power',
        combat: 'Combat',

        // --- Filtros & Selectores ---
        allPublishers: 'All Publishers',
        allAlignments: 'All Alignments',
        good: 'Hero',
        bad: 'Villain',
        neutral: 'Neutral',

        // --- Gestión de Equipo (Mis Favoritos) ---
        addToTeam: 'Add to Team',
        removeFromTeam: 'Remove from Team',
        myTeamTitle: 'My Custom Team',
        emptyTeam: "You haven't recruited anyone to your team yet.",
        teamInstruction: '💡 Click characters in your team to send them to the Versus Comparison Arena.',

        // --- Modal de Detalle de Perfil ---
        realName: 'Real Name',
        placeOfBirth: 'Place of Birth',
        firstAppearance: 'First Appearance',

        // --- Arena Versus ---
        versusTitle: '⚔️ Multiverse Versus Arena',
        clearArena: 'Clear Arena',
        selectHero: 'Select a hero',
        selectSecondHero: 'Select a second hero',
        waitingOpponent: 'Waiting for an opponent to start battle...',
        winner: '🏆 WINNER',

        // --- Paginación ---
        pageOf: 'Page',
        pageConnector: 'of',
        goToPage: 'Go to p.'
    }
}