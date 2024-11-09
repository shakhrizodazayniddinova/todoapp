import styled from "styled-components";

const HeaderStyled = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme === 'dark' ? '#1D1825' : '#E9ECEF'};
    color: #9E78CF;
    padding: 0px 30px;
    transition: 0.3s;

    @media (max-width: 420px){
        padding: 0px 10px;
    }

    .logoDiv{
        display: flex;
        align-items: center;
        gap: 10px;
        
        span{
            img{
                width: 40px;
                height: 40px;
            }
        }
        .logoText{
            font-size: 20px;
            font-weight: 500;
            margin: 0;
        }
    }
    .darkModeDiv{
        @media (max-width: 420px){
            height: 25px;
        }

        .darkModeBtn{
            font-size: 22px;
            cursor: pointer;
        }
    }
`;

export default HeaderStyled;