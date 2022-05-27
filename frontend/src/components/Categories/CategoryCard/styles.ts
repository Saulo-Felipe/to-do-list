import styled from "styled-components";



type dropdownIsOpen = {
  isOpen: boolean;
}

export const Card = styled.div`
  position: relative;
  transition: all 0.5s;
  animation-duration: 200ms;

  :hover {
    .active-category-header {
      opacity: 1;
    }
    animation-name: onHoverAnimation;
  }

  @keyframes onHoverAnimation {
    0% { transform: rotate(0deg) };
    25% { transform: rotate(4deg) };
    50% { transform: rotate(-4deg) };
    100% { transform: rotate(0deg) };
  }

`;

export const Container = styled.div`
  width: 13.5rem;
  height: 13.5rem;
  background-color: #fff;
  position: relative;
  transition: all 0.5s;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);

  border-radius: 0.75rem;
  cursor: pointer;

  &:hover header img {
    opacity: 1;
  }


  display: flex;
  flex-direction: column;


  header {
    padding: 0.85rem 0 0 0.85rem;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: 0.5rem;

  }

  section {
    font-size: 2rem;
    padding: 0 1rem;
    height: max-content;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3; 
    -webkit-box-orient: vertical;
  }

`;

export const Header = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  height: 20%;
  transition: all 0.5s;
  background-image: linear-gradient(rgb(0, 0, 0, 0.75), rgb(0, 0, 0, 0.65), rgb(0, 0, 0, 0.6), rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.2), transparent);
  display: flex;
  align-items: end;
  justify-content: space-around;
  flex-direction: column;
  opacity: 0;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  > i {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    color: white;
    height: min-content;
    padding: 0.2rem;
    cursor: pointer;
  }
`;

export const Dropdown = styled.div<dropdownIsOpen>`
  > div {
    position: absolute;
    right: 0.5rem;
    background-color: white;
    /* color: white; */
    font-size: 0.75rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
    display: ${ ({isOpen}) => isOpen ? "block" : "none" };
    user-select: none;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);

    :hover {
      background-color: #dbdbdb;

      i {
        color: red;
      }
    }
  }
`;