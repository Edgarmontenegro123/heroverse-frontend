import type { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
    es: {
        title: 'HeroVerse Multiverse',
        searchPlaceholder: 'Buscar héroe o villano...',
        inputPlaceholderName: 'Tu Nombre',
        inputPlaceholderEmail: 'Tu Correo',
        inputPlaceholderMessage: 'Escribe tu mensaje aquí...',
        sendButton: 'Enviar Mensaje',
        formTitle: 'Contacto e Inbox de Héroes',
        viewProfile: 'Ver Perfil',
        stats: 'Estadísticas de Poder',
        intelligence: 'Inteligencia',
        strength: 'Fuerza',
        speed: 'Velocidad',
        durability: 'Durabilidad',
        power: 'Poder',
        combat: 'Combate',
        emptyInbox: 'El inbox está vacío. ¡Envía un mensaje arriba!',
        inboxTitle: 'Bandeja de Entrada (Mensajes Recibidos)',
        alertSuccess: '¡Mensaje enviado con éxito al inbox!'
    },
    en: {
        title: 'HeroVerse Multiverse',
        searchPlaceholder: 'Search hero or villain...',
        inputPlaceholderName: 'Your Name',
        inputPlaceholderEmail: 'Your Email',
        inputPlaceholderMessage: 'Write your message here...',
        sendButton: 'Send Message',
        formTitle: 'Contact & Heroes Inbox',
        viewProfile: 'View Profile',
        stats: 'Power Stats',
        intelligence: 'Intelligence',
        strength: 'Strength',
        speed: 'Speed',
        durability: 'Durability',
        power: 'Power',
        combat: 'Combat',
        emptyInbox: 'Inbox is empty. Send a message above!',
        inboxTitle: 'Inbox (Received Messages)',
        alertSuccess: 'Message successfully sent to the inbox!'
    }
};