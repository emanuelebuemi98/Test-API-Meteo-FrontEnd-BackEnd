import { useState, useEffect } from 'react';

//Import di immagini create con l'Inteligenza artificiale
import sole from '../../assets/sole.jpg';
import vento from '../../assets/vento.jpg';
import pioggia from '../../assets/pioggia.jpg';
import neve from '../../assets/neve.jpg';

// Array che contiene i percorsi delle immagini
const images = [sole, vento, pioggia, neve];

//Componente CardCarosello utilizzato per creare un carousello con le immaggini alternate ad ogni 4 secondi contenuto dentro CardRicercaMeteo
export function CardCarosello() {

    // Stato per tenere traccia dell'indice dell'immagine attualmente visualizzata
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Effetto per cambiare l'immagine ogni 4 secondi
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Cambia immagine ogni 4 secondi

        return () => clearInterval(interval); // Pulisce l'intervallo quando il componente viene smontato
    }, []);

    return (
        <div className="card mt-3">
            <div className="card-body text-center">
                <img
                    src={images[currentImageIndex]} // Imposto l'immagine corrente basata sull'indice
                    alt="Carosello"
                    className="img-fluid" // Classe Bootstrap per rendere l'immagine responsive
                />
            </div>
        </div>
    );
}