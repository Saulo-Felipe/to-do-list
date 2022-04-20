import { Main } from "./styles";
import { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
}

export function MainContent({children}: MainContentProps) {

  return (
    <Main>
      {children}
    </Main>
  );
}