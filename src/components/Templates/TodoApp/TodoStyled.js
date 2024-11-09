import styled from "styled-components";

const TodoStyled = styled.div`
    width: 483px;
    height: 670px;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme === 'dark' ? '#1D1825' : '#E9ECEF'};
    border-radius: 20px;
    padding: 50px 40px;
    color: white;
    overflow: scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    @media (max-width: 420px){
        padding: 40px 10px;
        width: 300px;
        height: 520px;
    }

    .container{
        display: flex;
        flex-direction: column;
        gap: 58px;

        .formDiv{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
    
            .todoInput{
                width: 330px;
                height: 37px;
                outline: none !important;
                border: 1px solid #9E78CF !important;
                border-radius: 10px;
                background-color: transparent;
                color: ${(props) => props.theme === 'dark' ? 'white' : 'black'};
            }
        
            .addBtn{
                width: 37px;
                height: 37px;
                background-color: #9E78CF;
                color: white;
                border-radius: 10px;
            }
        }

        .todoLength{
            color: ${(props) => props.theme === 'dark' ? 'white' : 'black'};
        }

        .tasks{
            padding-bottom: 30px;

            .todoList{
                display: flex;
                align-items: center;
                gap: 15px;

                .todo{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 55px;
                    background-color: ${(props) => props.theme === 'dark' ? '#15101C' : '#F8F9FA'};
                    border: none;
                    color: #9E78CF;
                    border-radius: 10px;

                    @media (max-width: 420px){
                        padding: 8px 10px;
                    }

                    input{
                        background-color: transparent;
                        color: #9E78CF;
                        border: none;
                        outline: none;
                        width: 75%;
                        padding: 0;

                        @media (max-width: 420px){
                            padding-right: 8px;
                        }
                    }

                    .tasksBtn{
                        display: flex;

                        button{
                            color: #9E78CF;
                            outline: none !important;
                            background-color: transparent;
                            border: none;

                            @media (max-width: 420px){
                                font-size: 16px;
                                padding: 0 4px;
                            }
                        }
                    }
    
                }
            }
        }
    }
`;

export default TodoStyled;