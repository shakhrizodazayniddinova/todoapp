import React from 'react';
import HeaderStyled from './HeaderStyled';
import logo from './logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../../redux/reducers/layout';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.layout.darkMode);

  const toggleTheme = () => {
    dispatch(toggleDarkMode())
  };

  return (
    <HeaderStyled theme={theme}>
        <div className="logoDiv">
          <span><img src={logo} alt="" /></span>
          <p className='logoText'>Todo App</p>
        </div>

        <div className="darkModeDiv" onClick={toggleTheme}>
          <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-brightness-high-fill'} darkModeBtn`}></i>
        </div>
    </HeaderStyled>
  )
}
