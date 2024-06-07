import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//Import di immagini create con l'Inteligenza artificiale
import SoleImg from "../../assets/sole.jpg";
import VentoImg from "../../assets/vento.jpg";
import PioggiaImg from "../../assets/pioggia.jpg";
import NeveImg from "../../assets/neve.jpg";

// Array di oggetti che contiene le informazioni sulle immagini
const images = [
    { img: SoleImg, alt: 'Sole' },
    { img: VentoImg, alt: 'Vento' },
    { img: PioggiaImg, alt: 'Pioggia' },
    { img: NeveImg, alt: 'Neve' }
];

// Componente CardBackground per l'inserimento dello sfondo contenuto dentro CardHome
export function CardBackground({ children }) {

    // Stato per tenere traccia dell'indice dell'immagine attualmente visualizzata.
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Effetto per cambiare l'immagine ogni 4 secondi.
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval); // Pulizia dell'intervallo quando il componente viene smontato
    }, []);

    // Stile per impostare l'immagine corrente come sfondo del contenitore.
    const backgroundStyle = {
        backgroundImage: `url(${images[currentImageIndex].img})`, // URL dell'immagine corrente
        backgroundSize: 'cover', // Dimensione dell'immagine per coprire completamente il contenitore
        backgroundPosition: 'center', // Posizione dell'immagine al centro del contenitore
        display: 'flex', // Impostazioni di layout flessibili
        justifyContent: 'center', // Centratura orizzontale del contenuto
        alignItems: 'center', // Centratura verticale del contenuto
        transition: 'background-image 1s ease-in-out', // Transizione fluida dell'immagine
        minHeight: '100vh', // Altezza minima del contenitore: 100% dell'altezza della finestra
        height: '100%', // Altezza del contenitore: 100%
    };

    // Restituiamo il contenitore con lo stile dello sfondo e i figli
    return <div style={backgroundStyle}>{children}</div>;
};

// Definizione dei tipi di props
CardBackground.propTypes = {
    children: PropTypes.node.isRequired, // I figli devono essere nodi React validi
};
