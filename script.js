// script.js - Solution hybride avec chiffrement et stockage local
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const card = document.getElementById('oracle-card');
    const message = document.getElementById('oracle-message');
    const instruction = document.getElementById('instruction');
    const resetButton = document.getElementById('reset-button');
    
    // URL de la feuille Google Sheets publiée (À REMPLACER par votre URL)
    const sheetsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTx12BYMLCX5mBeGQEMP5uVFjttHL_EAzArFf2ePEiB_GgTWqSs8v459BpzJF6wsarr0bG2j_LTnBiJ/pubhtml?gid=0&single=true';
    
    // Clé de chiffrement simple (vous pouvez la changer)
    const encryptionKey = 'oracle2025';
    
    // Fonctions de chiffrement/déchiffrement
    function encrypt(text, key) {
        let result = '';
        for(let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const keyChar = key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode ^ keyChar);
        }
        return btoa(result); // Convertit en base64 pour stockage
    }
    
    function decrypt(encoded, key) {
        try {
            const text = atob(encoded); // Décode du base64
            let result = '';
            for(let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i);
                const keyChar = key.charCodeAt(i % key.length);
                result += String.fromCharCode(charCode ^ keyChar);
            }
            return result;
        } catch(e) {
            console.error('Erreur de déchiffrement:', e);
            return '';
        }
    }
    
    // Fonction pour charger les messages
    async function loadMessages() {
        try {
            // Vérifier s'il y a des messages en cache
            const cachedData = localStorage.getItem('oracleMessages');
            const lastUpdate = localStorage.getItem('oracleLastUpdate');
            const now = new Date().getTime();
            
            // Si le cache existe et a moins de 24h
            if (cachedData && lastUpdate && now - parseInt(lastUpdate) < 86400000) {
                // Utiliser le cache
                const decryptedData = decrypt(cachedData, encryptionKey);
                return JSON.parse(decryptedData);
            }
            
            // Sinon, charger depuis Google Sheets
            instruction.textContent = "Chargement des messages...";
            
            const response = await fetch(sheetsURL);
            const csvData = await response.text();
            
            // Traitement simple du CSV (une ligne = un message)
            const messages = csvData.split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
            
            // Sauvegarder dans le stockage local (chiffré)
            const encryptedData = encrypt(JSON.stringify(messages), encryptionKey);
            localStorage.setItem('oracleMessages', encryptedData);
            localStorage.setItem('oracleLastUpdate', now.toString());
            
            return messages;
        } catch (error) {
            console.error('Erreur lors du chargement des messages:', error);
            
            // En cas d'erreur, essayer d'utiliser le cache même s'il est ancien
            const cachedData = localStorage.getItem('oracleMessages');
            if (cachedData) {
                const decryptedData = decrypt(cachedData, encryptionKey);
                return JSON.parse(decryptedData);
            }
            
            // Si vraiment rien ne fonctionne, retourner un tableau vide
            return [];
        }
    }
    
    // Initialisation
    let oracleMessages = [];
    
    // Désactiver la carte pendant le chargement
    card.style.opacity = "0.5";
    card.style.pointerEvents = "none";
    
    // Charger les messages
    loadMessages().then(messages => {
        oracleMessages = messages;
        
        // Réinitialiser l'instruction une fois chargé
        instruction.textContent = "Concentrez-vous sur votre question, puis cliquez sur la carte pour recevoir un message de l'oracle.";
        
        // Activer la carte
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
    }).catch(error => {
        console.error('Erreur:', error);
        instruction.textContent = "Impossible de charger les messages. Veuillez rafraîchir la page.";
    });
    
    // Gestionnaire d'événement pour le clic sur la carte
    card.addEventListener('click', function() {
        if (!card.classList.contains('flipped') && oracleMessages.length > 0) {
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
