import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "../constants/url";
import { goToHomePage, goToLoginPage } from "../routes/coordinator";
import { BackgroundColor, HeaderLoginContainer, HeaderStyle, LogoHeader, P1, Voltar } from "./HeaderStyle"
import Logolabe from "../assets/Logo2.png"
import Cross from "../assets/Cross.png"
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Header() {


    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem(TOKEN_NAME);
        goToLoginPage(navigate);
    };
    const context = useContext(GlobalContext);
    const { comments } = context;


    switch (location.pathname) {
        case "/posts":
            return (
                <HeaderLoginContainer>

                    <BackgroundColor></BackgroundColor>
                    <LogoHeader src={Logolabe} />

                    <P1 onClick={logout}><b>Logout</b></P1>
                </HeaderLoginContainer>
            );

        case `/comments/${comments.id}`:
            return (
                <HeaderLoginContainer>

                    <Voltar onClick={() => { goToHomePage(navigate) }} src={Cross} ></Voltar>
                    <LogoHeader src={Logolabe} />

                    <P1 onClick={logout}><b>Logout</b></P1>
                </HeaderLoginContainer>
            );
    }

}

