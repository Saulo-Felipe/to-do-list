import styled from "styled-components";


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

  :hover {
    animation-name: onHoverAnimation;
  }

  display: flex;
  flex-direction: column;

  animation-duration: 200ms;

  @keyframes onHoverAnimation {
    0% { transform: rotate(0deg) };
    25% { transform: rotate(4deg) };
    50% { transform: rotate(-4deg) };
    100% { transform: rotate(0deg) };
  }

  header {
    padding: 0.85rem 0 0 0.85rem;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: 0.5rem;

    img {
      padding: 0.4rem 0.8rem 0 0;
      transition: all 0.3s;
      opacity: 0;
      width: 3rem;

      :hover {
        transform: scale(1.1);
      }
    }

    .dropdown-category-options {
      position: absolute;
      right: 0.8rem;
      box-shadow: 0 0 20px rgb(0, 0, 0, 0.25);
      border-radius: 0.25rem;
      /* border: solid 1px rgb(0, 0, 0, 0.5); */
      background-color: #fff;
    

      div:nth-child(1) {
        :hover {
          background-color: rgb(0, 0, 255, 0.2);
        }
        border-bottom: solid 1px rgb(0, 0, 0, 0.25);
        
        i {
          color: blue;
        }
      }

      div:nth-child(2) {
        :hover {
          background-color: rgb(255, 0, 0, 0.3);
        }

        i {
          color: red;
        }
      }


      div {
        padding: 0.25rem 0.75rem;
        transition: all 200ms;
      }
    }

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