import ReactModal from "react-modal";
import { useState } from "react";
import { ToastContainer, toast, Id } from "react-toastify";
import { api } from "../../services/api";
import GoogleLogin from "react-google-login";

import { Container, Button, InputContainer, NotHaveAccount } from "../Register/styles";
import ImgCloseModal from "../../assets/close.svg";

type LoginProps = {
  isOpen: boolean;
  setIsOpen: (args: boolean) => void;
  setRegisterModalIsOpen: (args: boolean) => void;
  failureGoogleoAuth: () => void;
  successGoogleoAuth: (args: any) => void;
  setNewToken: (id: Id, data: any) => void;
}

export function Login(props: LoginProps) {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  function goToRegisterModal() {
    props.setIsOpen(false);
    props.setRegisterModalIsOpen(true);
  }

  async function Login() {
    if (login.email.indexOf("@") === -1 || login.email.length <= 4)
      toast.warn("Email inválido");

    else if (login.password.length <= 2)
      toast.warn("Senha inválida");
    
    else {
      const id = toast.loading("Aguarde um momento...");

      let {data} = await api.post("/login", { ...login });

      props.setNewToken(id, data);
    }
  }

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={() => props.setIsOpen(false)}
      className={"modal-content"}
      overlayClassName={"modal-overlay"}
    >

      <ToastContainer />

      <img
        onClick={() => props.setIsOpen(false)}
        className="close-modal-icon"
        src={ImgCloseModal}
        alt="Fechar modal"
      />

      <h1>Entrar</h1>

      <GoogleLogin 
        clientId="476588325667-kuibos8rechfr40phhgnt7cpf01ojsqg.apps.googleusercontent.com"
        buttonText="Entrar com Google"
        onSuccess={props.successGoogleoAuth}
        onFailure={props.failureGoogleoAuth}
        className={"google-button-oauth "}
      />
      
      <Container>

        <InputContainer>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            type="email"
            placeholder="Digite seu email para entrar"
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            type={showPassword ? "text" : "password"}
            placeholder="Senha de acesso"
          />
        </InputContainer>

        <div className="show-password-container">
          <input
            id="show-password"
            type="checkbox"
            onChange={(e) => setShowPassword(e.target.checked)}
            checked={showPassword}
          />
          <label htmlFor="show-password">Mostrar senha</label>
        </div>

        <Button onClick={Login}>Entrar</Button>

        <NotHaveAccount>
          Não tem uma conta? <span onClick={goToRegisterModal}>Cadastre-se</span>
        </NotHaveAccount>
        
      </Container>
    </ReactModal>
  );
}