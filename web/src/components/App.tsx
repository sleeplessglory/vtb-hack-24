import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Navbar from './Navbar';
import clientAPI from './Login';
interface TokenResponse {
    token: string,
    test: boolean
}
export default function App() {
    const [isAuthorised, setIsAuthorised] = useState(false);
    useEffect(() => {
        if(!localStorage.getItem('jwt')) {
            fetchToken();
        }
        else {
            setIsAuthorised(true);
        }
        async function fetchToken() {
            try {
                const response = await clientAPI.get<TokenResponse>('../../../examples/example');
                const {token, test} = response.data;
                if (token && test) {
                    localStorage.setItem('jwt', token);
                    setIsAuthorised(true);
                }
                else {
                    setIsAuthorised(false);
                }
            }
            catch(error) {
                console.error(`Error while fetching token: ${error}`);
                setIsAuthorised(false);
            }
        }
    }, []);
    /*switch(true) {
        case isAuthorised:
            return;
        case !isAuthorised:
            return(
            <div className="not-authorised">
                <div className="not-authorised__content">
                    Вы не авторизованы!
                </div>
            </div>
            );
    }*/
    return(
        <BrowserRouter>
            <Routes>
                <main>
                    <Route />
                </main>
            </Routes>
        </BrowserRouter>
    );
};