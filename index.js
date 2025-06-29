// Selecteert de knop en de afbeelding die erbij hoort
const plantButton = document.getElementById("plantButton");
const plantImage = document.querySelector("#plantButton img");

// Selecteert het element waar het aantal waterdruppels wordt weergegeven
const waterDisplay = document.querySelector("p");

// Selecteert de progressiebalk
const progressBar = document.getElementById("progress");

// Variabelen
let aantalWaterdruppels = 0; // Aantal verzamelde waterdruppels bijhouden
const audioElement = document.getElementById("lied"); // Geluid bij magische boom
const audioElement2 = document.getElementById("audio1"); // Geluid bij van vogels
let liedGespeeld = false; // Zorgt dat het magische boomlied maar één keer speelt
let audioIGespeeld = false; // Zorgt dat vogelgeluid maar één keer speelt

// Waterdrop geluid voor bij het klikken
const dropSound = new Audio('muziek/waterdrop.mp3');

// Event listener op de plantknop
plantButton.addEventListener("click", function () {
    // Speel waterdrop-geluid af
    dropSound.currentTime = 0;
    dropSound.play();

    // Telt er 1 bij op
    aantalWaterdruppels += 1;

    // Bonuspunten bij bepaalde aantallen
    if (aantalWaterdruppels >= 6000) {
        aantalWaterdruppels += 150;
    } else if (aantalWaterdruppels >= 3000) {
        aantalWaterdruppels += 60;
    } else if (aantalWaterdruppels >= 1200) {
        aantalWaterdruppels += 25;
    } else if (aantalWaterdruppels >= 600) {
        aantalWaterdruppels += 12;
    } else if (aantalWaterdruppels >= 200) {
        aantalWaterdruppels += 6;
    } else if (aantalWaterdruppels >= 75) {
        aantalWaterdruppels += 3;
    }

    // Updaten van de tekst, afbeelding en progressiebalk
    waterDisplay.textContent = "Waterdruppels: " + aantalWaterdruppels;
    updatePlant();
    animateImage();
    updateProgress();
});

// Functie om plantafbeelding te updaten op basis van de hoeveelheid waterdruppels
function updatePlant() {
    if (aantalWaterdruppels >= 6000) {
        plantImage.src = "afbeeldingen/plant7.png";
        if (!liedGespeeld) {
            audioElement.play(); // Magische boommuziek
            liedGespeeld = true;
        }
        startConfetti(); // Confetti voor op het eind
    } else if (aantalWaterdruppels >= 3000) {
        plantImage.src = "afbeeldingen/plant6.png";
    } else if (aantalWaterdruppels >= 1200) {
        plantImage.src = "afbeeldingen/plant5.png";
    } else if (aantalWaterdruppels >= 600) {
        plantImage.src = "afbeeldingen/plant4.png";
        if (!audioIGespeeld) {
            audioElement2.play(); // Vogelgeluid
            audioIGespeeld = true;
        }
    } else if (aantalWaterdruppels >= 200) {
        plantImage.src = "afbeeldingen/plant3.png";
    } else if (aantalWaterdruppels >= 75) {
        plantImage.src = "afbeeldingen/plant2.png";
    } else {
        plantImage.src = "afbeeldingen/plant1.png";
    }
}

// Laat de plant even op en neer bewegen bij klikken
function animateImage() {
    plantImage.classList.add("bounce");
    setTimeout(() => plantImage.classList.remove("bounce"), 400);
}


// Berekent en laat de voortgang zien
function updateProgress() {
    const percentage = (aantalWaterdruppels / 6000) * 100;
    progressBar.style.width = percentage + "%";
}

// Start het confetti-effect bij het einde
function startConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Bron confetti:
// Desborough, G. (z.d.). *Canvas Confetti*. GitHub. https://github.com/catdad/canvas-confetti

// Bronnen audio-effecten:
// - Vogelgeluiden: Mixkit (https://mixkit.co/free-sound-effects/birds/)
// - Magisch geluid: Mixkit (https://mixkit.co/free-sound-effects/magic/)
// - Waterdruppel: YouTube (https://www.youtube.com/watch?v=bCPKfDOYyOc)