import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/url";
import { goToHomePage, goToSignupPage } from "../../routes/coordinator";
import { ButtonCriarConta, ButtonEntrar, Cursor, Hr, InputLogin, LabeLogo, LoginStyle, LoginStyleComponent, Main, P, P2, P3 } from "./LoginPageStyle";
import LogoLabe from "../../assets/LabedditImage.png"


export default function LoginPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false)

  const changeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault()

    try {
      setIsLoading(true);

      const body = {
        email: form.email,
        password: form.password
      };

      const response = await axios.post(BASE_URL + "/users/login", body);
      window.localStorage.setItem(TOKEN_NAME, response.data.token);

      setIsLoading(false);
      goToHomePage(navigate);
    } catch (error) {
      setIsLoading(false);
      console.error(error?.response?.data);
      window.alert(error?.response?.data)
    }
  };

  return (
    <Main>
  

        <LabeLogo src = {LogoLabe}/>
        <P>O projeto de rede social da Labenu</P>

        <LoginStyleComponent>
          
          <form onSubmit={login} autoComplete="off">
         
              
              <InputLogin
                
                placeholder="E-mail"
                name={"email"}
                value={form.email}
                onChange={changeForm}
              />
         

           
            
              <InputLogin
              placeholder="Senha"
                type={showPassword ? "text" : "password"}
                name={"password"}
                value={form.password}
                onChange={changeForm}
              />
            
            <ButtonEntrar  disabled={isLoading}><P2><b>Continuar</b></P2></ButtonEntrar>
          </form>

          <Hr/>
          
            <ButtonCriarConta disabled={isLoading}  onClick={() => goToSignupPage(navigate)}><P3><b>Crie uma conta!</b></P3></ButtonCriarConta >
          

        

       {/*    <h3>Conta de teste</h3>
          <p>astrodev@email.com</p>
          <p>astrodev99</p>
          <button
            onClick={() => {
              setForm({
                email: "astrodev@email.com",
                password: "astrodev99"
              })
            }}
          >
            Autopreencher
          </button> */}
          </LoginStyleComponent>
     
    </Main>
  );
}
