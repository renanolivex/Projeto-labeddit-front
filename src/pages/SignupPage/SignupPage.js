import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, TOKEN_NAME } from "../../constants/url";
import { goToHomePage, goToLoginPage } from "../../routes/coordinator";
import { BackgroundColor, ButtonEntrar, H1Signup, HeaderLoginContainer, InputCadastro, InputContainer, LogoHeader, P1, P2, Rules, RulesContainer } from "./SignupPageStyle";
import LogoLabe from "../../assets/Logo2.png"


export default function SignupPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });


  const changeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const signup = async (event) => {
    event.preventDefault()

    
      try {
        setIsLoading(true);

        const body = {
          name: form.name,
          email: form.email,
          password: form.password
        };

        const response = await axios.post(BASE_URL + "/users/signup", body);
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
    <main>
      <HeaderLoginContainer>
        <BackgroundColor></BackgroundColor>
      <LogoHeader src={LogoLabe}/>
      <P1 disabled={isLoading} onClick={() => goToLoginPage(navigate)}>
        <b>Entrar</b>
      </P1>
      </HeaderLoginContainer>


      <H1Signup>
        Olá, boas vindas ao LabEddit ;)
      </H1Signup>
      <InputContainer>

        <form onSubmit={signup} autoComplete="off">
          <InputCadastro
            placeholder="Apelido"
            name={"name"}
            value={form.name}
            onChange={changeForm}
          />


        

            <InputCadastro
              placeholder="E-mail"
              name={"email"}
              value={form.email}
              onChange={changeForm}
            />
       



            <InputCadastro
              placeholder="Senha"
              type={"password"}
              name={"password"}
              value={form.password}
              onChange={changeForm}
            />



        </form>
        <RulesContainer>
        <Rules>Ao continuar, você concorda com o nosso Contrato de usuário e nossa Política de Privacidade</Rules>
        <Rules><input type ="checkbox"></input> Eu concordo em receber emails sobre coisas legais no Labeddit</Rules>
          
       

      </RulesContainer>


        <ButtonEntrar disabled={isLoading} onClick={(signup)} ><P2><b>Cadastrar</b></P2></ButtonEntrar>

     
      </InputContainer>






    </main>
  );
}
