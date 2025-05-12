/**
 * Oracle de Retour à Soi - Application de tirage de cartes divinatoires
 * © 2025 Julie Bierge. Tous droits réservés.
 * 
 * Les messages de l'oracle, le concept et le code sont protégés par le droit d'auteur.
 * Toute reproduction ou utilisation non autorisée est strictement interdite.
 */

// script.js - Version sans réinitialisation
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const card = document.getElementById('oracle-card');
    const message = document.getElementById('oracle-message');
    const instruction = document.getElementById('instruction');
    
    // Messages de l'oracle personnalisés
    const oracleMessages = [
        "Et si tu faisais confiance à ce que tu sais déjà, qu'est-ce que tu ferais ?",
        "Quel est le mouvement que tu refuses de laisser venir ?",
        "À quelles représentations de ce que ta réalité devrait ressembler tu t'accroches encore ? Il est temps de te laisser surprendre, et d'avancer sans savoir ce que tu vas trouver.",
        "Ce n'est pas parce que tu ne perçois pas les possibilités qu'elles n'existent pas. Fais confiance en ton chemin.",
        "Émerveille-toi de ce que tu crées.",
        "À quel moment c'est devenu si sérieux que tu as perdu le sens de ce que tu fais ? Remets du jeu !",
        "Quel poids fais-tu porter sur ta création ?",
        "Agis comme si c'était ce qu'il y avait de plus précieux et de plus insignifiant au monde.",
        "Est-ce que ce désir est le tien ou celui du voisin ?",
        "Et si tu laissais l'amour te guider ? Quel serait le prochain pas que ton cœur ferait ?",
        "Il est temps de lâcher le BIEN faire pour se reconnecter à ce qui serait BON de faire.",
        "Il est temps de mettre plus de toi dans ce que tu fais.",
        "Qu'est-ce qui compte vraiment pour toi en ce moment ? Agis à partir de là.",
        "Qu'est-ce que tu essaies de ne pas ressentir quand tu fais ça ? Fais de la place pour ça, ça a le droit d'être là.",
        "Qu'est-ce que tu aimerais qu'il se passe vraiment ?",
        "Quels sont les jugements sur ta création que tu rends plus vrais que la réalité ?",
        "Tu n'es pas là pour réussir, tu es là pour expérimenter, apprendre, grandir.",
        "Y a-t-il un chemin plus simple, plus léger, plus joyeux que tu peux emprunter pour avancer ?",
        "Quelles sont les attentes qui ne servent plus ton projet ? Il est temps de les laisser partir.",
        "Parfois abandonner un projet, une idée, un résultat, est un acte d'amour pour soi.",
        "Fais confiance en ton idée, si elle t'a trouvé·e c'est que vous avez quelque chose à créer ensemble.",
        "Rappelle-toi qu'il existe un espace si vaste en toi qui peut tout accueillir. Retourne à cet endroit.",
        "Quelle part de toi s'exprime quand tu agis comme ça ? Quel message a-t-elle pour toi ?",
        "Tu n'as pas besoin de connaître le chemin pour avancer.",
        "Laisse ton art te guider, ta vérité te trouver.",
        "Qu'est-ce que ton ventre, ton cœur, ta tête te disent à propos de ça ? Comment peux-tu honorer chaque message et avancer avec tout ça ?",
        "Il est temps de te donner tes propres autorisations.",
        "Tu peux avancer avec la peur de ne pas y arriver, de ne pas être à la hauteur, de te tromper.",
        "Tu as besoin de ton énergie pour avancer, comment vas-tu la nourrir aujourd'hui ?",
        "Es-tu prêt·e à tout recevoir, qu'est-ce que tu oserais si tu t'ouvrais à tout recevoir ?",
        "Tu n'as pas besoin d'être ailleurs que là où tu es. Qu'est-ce que tu peux créer à partir de ce qui est présent ?",
        "Si tu arrêtes de fonctionner à partir du passé ou d'anticiper le futur, qu'est-ce que le moment présent te demande ?",
        "Et si tu avais totalement foi en toi, qu'est-ce que tu ferais ?",
        "Tu as le rythme parfait pour ce que tu vis en ce moment.",
        "Que se passe-t-il quand tu honores ton tempo et pas celui imposé par l'extérieur ?"
    ];
    
    // Gestionnaire d'événement pour le clic sur la carte
    card.addEventListener('click', function() {
        if (!card.classList.contains('flipped')) {
            // Sélectionne un message aléatoire
            const randomIndex = Math.floor(Math.random() * oracleMessages.length);
            message.textContent = oracleMessages[randomIndex];
            
            // Retourne la carte
            card.classList.add('flipped');
            
            // Change l'instruction
            instruction.textContent = "Voici ton message de l'oracle.";
        }
    });
});
