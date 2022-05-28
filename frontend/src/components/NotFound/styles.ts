import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  margin-top: 2.5rem;

  h1 {
    color: white;
  }

  button {
    border: none;
    padding: 0.5rem;
    margin-top: 1rem;
    transition: filter 0.4s;

    :hover {
      filter: brightness(0.6);
    }
  }

`;