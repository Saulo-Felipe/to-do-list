import { Container } from "./styles"
import notFoundImg from "../../assets/404.png";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const Navigate = useNavigate();

  return (
    <Container>
      <img src={notFoundImg} />

      <h1>Essa página não existe no sistema</h1>

      <button onClick={() => Navigate("/categories")}>Voltar para página principal</button>
    </Container>
  );
}