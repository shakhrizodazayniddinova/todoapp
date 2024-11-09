import styled from "styled-components";

const TemplateStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background-color: ${(props) => props.theme === 'dark' ? '#15101C' : '#F8F9FA'};
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  
  @media (max-width: 420px){
    gap: 80px;
  }

  header{
    width: 100%;
  }
`;

export default TemplateStyled;