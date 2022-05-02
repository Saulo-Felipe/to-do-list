import { useState } from "react";
import { Container } from "./styles";
import { Emoji } from "emoji-mart";
import { Link, useNavigate } from "react-router-dom";


type CategoryCardProps = {
  data: {
    isModel: boolean;
    categoryID: string;
    emojiID: string;
    content: string;
    bgColor: string;
    textColor: string;
  }
}

export function CategoryCard({ data }: CategoryCardProps) {
  const Navigate = useNavigate();

  function onLinkClick() {
    if (!data.isModel) {
      Navigate(`/${data.categoryID}/tasks`)
    }
  }

  return (
    <div onClick={onLinkClick}>
      <Container style={{ backgroundColor: data.bgColor }}>
        <header>
          <Emoji emoji={data.emojiID} set='facebook' size={52} />
        </header>

        <section style={{ color: data.textColor }}>
          {data.content.length === 0 ? "Título da categoria" : data.content}
        </section>
      </Container>
    </div>
  );
}