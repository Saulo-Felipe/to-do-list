import ReactModal from "react-modal";
import { api } from "../../services/api";
import { useState } from "react";
import { ToastContainer, toast, Id } from "react-toastify";
import GoogleLogin from "react-google-login";

import { Container, InputContainer, Button } from "./styles";
import ImgCloseModal from "../../assets/close.svg";

type RegisterProps = {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  setLoginModalIsOpen: (params: boolean) => void;
  failureGoogleoAuth: () => void;
  successGoogleoAuth: (args: any) => void;
  setNewToken: (id: Id, data: any) => void;
}

type RegisterReturn = {
  data: {
    success: boolean;
    message: string;
    error?: boolean;
  }
}

export function Register(props: RegisterProps) {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const [showPassword, setShowPassword] = useState(false);

  async function Register() {
    if (register.name.length <= 2)
      toast.warn("Nome muito curto.");

    else if (register.email.indexOf("@") === -1)
      toast.warn("Email inválido.");

    else if (register.password.length < 6)
      toast.warn("A senha precisa ter no mínimo 6 digitos.");

    else if (register.password !== register.password2)
      toast.warn("As senhas não estão iguais.");

    else {

      const id = toast.loading("Aguarde um momento...")

      let {data}: RegisterReturn = await api.post("/register", { ...register });

      toast.update(id, {
        autoClose: 3000, 
        render: data.message, 
        type: data.error ? "error" : data.success ? "success" : "warning", 
        isLoading: false 
      });

      setTimeout(() => {
        if (data.success) {
          props.setIsOpen(false);
          props.setLoginModalIsOpen(true);
        }
      }, 2000);
    }
  } 

  return (
    <ReactModal
      isOpen={props.isOpen}
      className={"modal-content"}
      overlayClassName={"modal-overlay"}
      onRequestClose={() => props.setIsOpen(false)}
    >
      <ToastContainer />

      <img
        onClick={() => props.setIsOpen(false)}
        className="close-modal-icon"
        src={ImgCloseModal}
        alt="Fechar modal"
      />

      <h1>Registre-se</h1>
      
      <GoogleLogin 
        clientId="476588325667-kuibos8rechfr40phhgnt7cpf01ojsqg.apps.googleusercontent.com"
        buttonText="Entrar com Google"
        onSuccess={props.successGoogleoAuth}
        onFailure={props.failureGoogleoAuth}
        className={"google-button-oauth "}
      />

      <Container>

        <InputContainer>
          <label htmlFor="name">Nome</label>
          <input 
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
            id="name" 
            type="text" 
            placeholder="Seu nome"
          />
        </InputContainer>

        <InputContainer>
          <label>Email</label>
          <input 
            value={register.email}
            onChange={(e) => setRegister({ ...register, email: e.target.value })}
            id="email" 
            type="email" 
            placeholder="Endereço de email" 
          />
        </InputContainer>

        <InputContainer>
          <label>Senha</label>
          <input 
            value={register.password}
            onChange={(e) => setRegister({ ...register, password: e.target.value })}
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Digite uma senha" 
          />
        </InputContainer>


        <InputContainer>
          <label>Digite a senha novamente</label>
          <input 
            value={register.password2}
            onChange={(e) => setRegister({ ...register, password2: e.target.value })}
            id="password2" 
            type={showPassword ? "text" : "password"} 
            placeholder="Para confirmar, digite novamente sua senha" />
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

        <Button onClick={Register} >Cadastre-se</Button>

      </Container>
    </ReactModal>
  );
}