import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width:4rem;
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${(props) => props.theme["gray-100"]};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: border-color 0.2s;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme["yellow-500"]};
      }

      &.active {
       color: ${(props) => props.theme["yellow-500"]};
      }
    }
  }
`;