import { NavLink } from "react-router-dom";

// Componente Access che fornisce i link per la login e la registrazione utilizzato nella pagina AccessPage
export function Access() {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    {/* Card Bootstrap per incapsulare il contenuto della sezione di Accesso*/}
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4 fw-bold text-success">Benvenuto nella pagina di Accesso</h1>
                            <h5 className="text-center mb-4">Effettua l'accesso o registrati per iniziare.</h5>
                            <div className="d-grid gap-2">
                                {/* Link per la pagina di login */}
                                <NavLink to="/login" className="btn btn-primary">Accedi</NavLink>
                                {/* Link per la pagina di registrazione */}
                                <NavLink to="/register" className="btn btn-secondary">Registrati</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}