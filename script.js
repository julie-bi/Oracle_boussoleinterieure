// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const card = document.getElementById('oracle-card');
    const message = document.getElementById('oracle-message');
    const instruction = document.getElementById('instruction');
    const resetButton = document.getElementById('reset-button');
    
    // Messages de l'oracle
    const oracleMessages = [
        "La patience est la clé de la réussite dans votre démarche actuelle.",
        "Une rencontre importante vous attend dans les prochains jours.",
        "C'est le moment d'oser sortir de votre zone de confort.",
        "Une opportunité se cache derrière ce qui vous semble être un obstacle.",
        "Prenez le temps de vous recentrer avant de prendre une décision importante.",
        "La réponse que vous cherchez est déjà en vous.",
        "Un cycle se termine, permettant à un nouveau de commencer.",
        "Faites confiance à votre intuition, elle vous guide correctement.",
        "La persévérance vous mènera au succès recherché.",
        "Il est temps de lâcher prise sur ce qui ne vous sert plus."
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
            instruction.textContent = "Voici votre message de l'oracle.";
            
            // Affiche le bouton de réinitialisation
            resetButton.classList.remove('hidden');
        }
    });
    
    // Gestionnaire d'événement pour le bouton de réinitialisation
    resetButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Empêche le clic de se propager à la carte
        
        // Réinitialise l'état
        card.classList.remove('flipped');
        instruction.textContent = "Concentrez-vous sur votre question, puis cliquez sur la carte pour recevoir un message de l'oracle.";
        resetButton.classList.add('hidden');
        
        // Petit délai pour effacer le message après l'animation
        setTimeout(() => {
            message.textContent = "";
        }, 300);
    });
});
