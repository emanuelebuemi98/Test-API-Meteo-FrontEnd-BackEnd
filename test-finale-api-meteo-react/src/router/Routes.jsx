import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { UserAccessPage } from "../pages/UserAccess/UserAccessPage";
import { MeteoPage } from "../pages/Meteo/MeteoPage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { AuthContextProvider } from "../contexts/AuthContext/AuthContextProvider";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { HomePage } from "../pages/Home/HomePage";

// Utilizzo createBrowserRouter per creare la struttura delle rotte.
const router = createBrowserRouter([
    {
        //Avvolge il layout principale (contenente navbar e footer) con il provider del contesto di autenticazione 
        //per fornire il contesto di autenticazione a tutti i componenti figli.
        element: <AuthContextProvider><MainLayout/></AuthContextProvider>,
        children: [
            {
                path: "/",
                children: [
                    {
                        path: "",
                        element: <UserAccessPage/> //Rotta per la pagina iniziale
                    },
                    {
                        path: "login",
                        element: <LoginPage/> //Rotta per la pagina di login
                    },
                    {
                        path: "register",
                        element: <RegisterPage/> //Rotta per la pagina di registrazione
                    },
                    {
                        path: "home",
                        element: <ProtectedRoute><HomePage/></ProtectedRoute> //Rotta per la homepage - è protetta da autenticazione
                    },
                    {
                        path: "meteo",
                        element: <ProtectedRoute><MeteoPage/></ProtectedRoute> //Rotta per la pagina meteo - è protetta da autenticazione
                    },
                ]
            }
        ]
    },
    {
      path: "*",
      element: <NotFoundPage/> //Rotta per tutte le pagine non trovate (404)
    }
])

// Funzione che fornisce il router dell'applicazione
export function Routes() {
    return (
        <RouterProvider router={router} />
    );
}