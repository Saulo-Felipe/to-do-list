import styled from "styled-components";

export const Container = styled.div`

`;


export const InputContainer = styled.div`
  label {
    font-weight: 550;
    display: block;
    margin-top: 0.75rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: solid 1px rgb(0, 0, 0, 0.2);
    outline: none;
    background-color: #7c7c7c0d;
    transition: all 300ms;

    :focus {
      background-color: white;
    }
  }

`;

export const Button = styled.button`
  border: none;
  padding: 0.75rem 1.5rem;
  background-color: #365683;
  color: white;
  border-radius: 0.25rem;
  width: 100%;
  margin-top: 1rem;
`;