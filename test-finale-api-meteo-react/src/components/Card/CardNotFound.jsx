import { NavLink } from "react-router-dom";

//Componente CardNotFound utilizzato nella pagina NotFound
export function CardNotFound() {
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-md-8 col-lg-6 mx-auto">
                    {/* Card per visualizzare il messaggio di pagina non trovata */}
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            {/* Testo principale */}
                            <h1 className="display-1 text-danger">404</h1>
                            <h2 className="mb-4">Pagina non trovata</h2>
                            {/* Messaggio  e link per tornare alla Home*/}
                            <p className="lead">La pagina che stai cercando potrebbe essere stata rimossa o non esiste.</p>
                            <NavLink to="/home" className="btn btn-primary mt-4">Torna alla Home</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}