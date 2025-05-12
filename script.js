// script.js - Compatible avec le format TSV
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const card = document.getElementById('oracle-card');
    const message = document.getElementById('oracle-message');
    const instruction = document.getElementById('instruction');
    const resetButton = document.getElementById('reset-button');
    
    // URL de la feuille Google Sheets publiée en format TSV
    const sheetsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTx12BYMLCX5mBeGQEMP5uVFjttHL_EAzArFf2ePEiB_GgTWqSs8v459BpzJF6wsarr0bG2j_LTnBiJ/pub?gid=0&single=true&output=tsv';
    
    // Messages de secours au cas où la récupération échoue
    const fallbackMessages = [
        "Aaaaahhhhh parfois l'informatique ça ne marche pas. Réessaye à un autre moment"
    ];
    
    // Clé de chiffrement simple
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
    
    // Fonction pour traiter le TSV proprement
    function parseTSV(tsvText) {
        // Si le texte commence par <!DOCTYPE ou <html, ce n'est pas un TSV valide
        if (tsvText.trim().startsWith('<!DOCTYPE') || tsvText.trim().startsWith('<html')) {
            console.error('Le contenu récupéré ne semble pas être un TSV valide');
            return [];
        }
        
        // Diviser par lignes et filtrer les lignes vides
        return tsvText.split('\n')
            .map(line => {
                // Pour TSV, on divise par tabulations et on prend la première colonne
                const columns = line.split('\t');
                return columns[0].trim();
            })
            .filter(line => line.length > 0);
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
                try {
                    // Utiliser le cache
                    const decryptedData = decrypt(cachedData, encryptionKey);
                    const parsedData = JSON.parse(decryptedData);
                    
                    // Vérifier que le cache contient des données valides
                    if (Array.isArray(parsedData) && parsedData.length > 0) {
                        console.log('Utilisation du cache local');
                        return parsedData;
                    }
                } catch (e) {
                    console.error('Erreur lors de la lecture du cache:', e);
                    // Continue vers le chargement depuis Google Sheets
                }
            }
            
            // Sinon, charger depuis Google Sheets
            instruction.textContent = "Chargement des messages...";
            
            console.log('Chargement depuis l\'URL:', sheetsURL);
            const response = await fetch(sheetsURL);
            const tsvData = await response.text();
            
            console.log('Données reçues (premiers caractères):', tsvData.substring(0, 100));
            
            // Traiter le TSV
            const messages = parseTSV(tsvData);
            
            if (messages.length === 0) {
                console.warn('Aucun message trouvé dans le TSV ou format invalide');
                // Utiliser les messages de secours
                return fallbackMessages;
            }
            
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
                try {
                    const decryptedData = decrypt(cachedData, encryptionKey);
                    const parsedData = JSON.parse(decryptedData);
                    if (Array.isArray(parsedData) && parsedData.length > 0) {
                        return parsedData;
                    }
                } catch (e) {
                    console.error('Erreur lors de la lecture du cache de secours:', e);
                }
            }
            
            // Si rien ne fonctionne, utiliser les messages de secours
            return fallbackMessages;
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
        console.error('Erreur finale:', error);
        // Utiliser les messages de secours en cas d'erreur
        oracleMessages = fallbackMessages;
        
        instruction.textContent = "Concentrez-vous sur votre question, puis cliquez sur la carte pour recevoir un message de l'oracle.";
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
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
