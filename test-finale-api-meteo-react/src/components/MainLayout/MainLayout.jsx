
import { useOutlet } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useContext } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Fouter";

// Componente MainLayout che definisce il layout principale dell'applicazione (con dentro la Navbar e il Fouter) utilizzato dentro il Routes
export function MainLayout() {

    // Utilizzo del contesto di autenticazione per verificare la validità del token
    const { tokenValid } = useContext(AuthContext);

    // Utilizzo dell' Hook useOutlet per ottenere il componente renderizzato dal router
    const outlet = useOutlet();

    return (
        <>
            {tokenValid && <Navbar/>} {/* Visualizza la Navbar solo se il token è valido */}
            {outlet} {/* Visualizza il componente renderizzato dal router */}
            <Footer/> {/*Visualizza il Footer fisso in basso */}
        </>
    )
}