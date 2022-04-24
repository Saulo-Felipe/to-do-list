import styled from "styled-components";


type HeaderProps = {
  bgColor: string;
  textColor: string;
}

type CreateNewTaskProps = {
  isOk: boolean;
}

type TaskContainer = {
  finish: boolean;  
}

export const Header = styled.header<HeaderProps>`

  width: 100%;
  min-height: 15rem;
  background-color: ${props => props.bgColor ? props.bgColor : "#0f3f86"};
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;

  padding: 1rem;

  > div:nth-child(1) {
    align-self: self-end;
    
    > a div:nth-child(1) {

      display: flex;
      align-items: end;

      img {
        margin-right: 1rem;
      }

      h2 {
        color: white;  
      }
    }
  }

  > div:nth-child(2) {
    align-items: end;
    display: flex;

    > div:nth-child(1) {
      background-color: rgb(255, 255, 255, .1);
      align-items: end;
      display: flex;

      padding: 0.5rem;
      border-radius: 0.5rem;

      h1 {
        margin-left: 1rem;
        color: ${props => props.textColor ? props.textColor : "#fff"};
      }
    }
  }

`;


export const Section = styled.section`
  padding: 2rem;
`;

export const Container = styled.main`


`;

export const CreateNewTask = styled.div<CreateNewTaskProps>`

  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;

  //padding: 1rem;
  background: #ffffff0f;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;

  > div:nth-child(1) {
    border-radius: 50%;
    background-color: ${({isOk}) => isOk ? "green" : "white"};
    color: ${({isOk}) => isOk ? "white" : "black"};
    cursor: ${({isOk}) => isOk ? "pointer" : "not-allowed"};
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 1rem;
    margin-right: 0.5rem;
  }

  > div:nth-child(2) {
    color: white;
    margin-right: 1rem;
    width: 100%;

    > input {
      background-color: #ffffff00;
      border: none;
      height: 3rem;
      outline: none;
      font-size: 1.5rem;
      color: white;
      padding-left: 1rem;
      width: 100%;

      :focus {
        background-color: #ffffff0f;
      }
    }

    :hover > input {
        background-color: #ffffff0f;
    }
  }
`;

export const TaskContainer = styled.div<TaskContainer>`
  opacity: ${ ({finish}) => finish ? 0.5 : 1 };
  display: flex;
  background-color: #ffffff0f;
  font-size: 1.4rem;
  align-items: end;

  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;

  transition: all 300ms;

  cursor: pointer;

  > div:nth-child(1) {
    .fa-circle {
      opacity: 0.5;
      color: gray;    
      margin-right: 0.5rem;
    }
    .fa-circle-check {
      color: #5162ff;
      margin-right: 0.5rem;
    }
  }

  > div:nth-child(2) {
    color: white;
    text-decoration: ${({finish}) => finish ? "line-through" : "none"};
  }

  :hover {
    box-shadow: 0 5px 10px rgb(0, 0, 0, 0.2);
  }

`;


export const WithOutTasks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  opacity: 0.5;
  user-select: none;

  h1 {
    color: #696a70;
    font-size: 1.75rem
  }

  img {
    width: 5rem;
    opacity: 0.5;
  }

`;


export const Details = styled.details`
  color: white;
  margin-top: 2rem;

  summary {
    font-size: 1.4rem;
    width: max-content;
    background: #ffffff1f;
    padding: 0.5rem;
    cursor: pointer;
  }

`;