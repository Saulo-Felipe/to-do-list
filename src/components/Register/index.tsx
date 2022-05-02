import ReactModal from "react-modal";

import { Container, InputContainer, Button } from "./styles";
import ImgCloseModal from "../../assets/close.svg";

type RegisterProps = {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
}

export function Register(props: RegisterProps) {



  return (
    <ReactModal 
      isOpen={props.isOpen}
      className={"modal-content"}
      overlayClassName={"modal-overlay"}
      onRequestClose={() => props.setIsOpen(false)}
    >
      <img
        onClick={() => props.setIsOpen(false)}
        className="close-modal-icon"
        src={ImgCloseModal}
        alt="Fechar modal"
      />      
      <Container>

        <InputContainer>
          <label htmlFor="name">Nome completo</label>
          <input id="name" type="text" placeholder="Seu nome completo"/>
        </InputContainer>

        <InputContainer>
          <label>Email</label>
          <input id="email" type="email" placeholder="Endereço de email" />
        </InputContainer>

        <InputContainer>
          <label>Senha</label>
          <input id="password" type="password" placeholder="Digite uma senha" />
        </InputContainer>


        <InputContainer>
          <label>Digite a senha novamente</label>
          <input id="password" type="password" placeholder="Para confirmar, digite novamente sua senha" />
        </InputContainer>


        <Button>Cadastre-se</Button>

      </Container>
    </ReactModal>
  );
}