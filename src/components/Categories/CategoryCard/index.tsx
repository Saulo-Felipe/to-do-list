import { useState } from "react";
import { Container } from "./styles";
import { Emoji } from "emoji-mart";
import { Link } from "react-router-dom";

import Config from "../../../assets/settings.png";


type CategoryCardProps = {
  data: {
    categoryID: string;
    emojiID: string;
    content: string;
    bgColor: string;
    textColor: string;
  }
}

export function CategoryCard({ data }: CategoryCardProps) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  function toggleDropdown() {
    if (dropdownIsOpen)
      setDropdownIsOpen(false);
    else
      setDropdownIsOpen(true);
  }

  function mouseLeave() {
    if (dropdownIsOpen)
      setDropdownIsOpen(false);
  }

  return (
    <Link to={`/${data.categoryID}/tasks`}>
      <Container style={{ backgroundColor: data.bgColor }} onMouseLeave={mouseLeave}>
        <header>
          <Emoji emoji={data.emojiID} set='facebook' size={64} />

          <div>
            <img src={Config} alt="Configurações da categoria" onClick={toggleDropdown}/>
            <div className="dropdown-category-options" style={{ display: dropdownIsOpen ? "block" : "none" }}>
              <div><i className="fa-solid fa-pen-to-square"></i> Editar</div>
              <div><i className="fa-solid fa-trash-can"></i> Deletar</div>
            </div>
          </div>
        </header>

        <section style={{ color: data.textColor }}>
          {data.content.length === 0 ? "Título da categoria" : data.content}
        </section>
      </Container>
    </Link>
  );
}