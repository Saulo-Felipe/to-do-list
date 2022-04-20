import { Container } from "./styles";
import { Emoji } from "emoji-mart";

import Options from "../../../assets/options.svg"

type CategoryCardProps = {
  data: {
    emojiID: string;
    content: string;
    bgColor: string;
    textColor: string;  
  }
}

export function CategoryCard({ data }: CategoryCardProps) {

  return (
    <Container style={{ backgroundColor: data.bgColor }}>
      <header>
        <Emoji emoji={data.emojiID} set='facebook' size={64} />

        <img src={Options} alt="Configurações da categoria" />
      </header>

      <section style={{ color: data.textColor }}>
        {data.content}
      </section>
    </Container>
  );
}