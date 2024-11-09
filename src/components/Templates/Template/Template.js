import React from 'react';
import TemplateStyled from './TemplateStyled';
import Header from '../Header/Header';
import TodoApp from '../TodoApp';
import { useSelector } from 'react-redux';

export default function Template() {
  const theme = useSelector(state => state.layout.darkMode);

  return (
    <TemplateStyled theme={theme}>
      <header>
        <Header/>
      </header>

      <main>
        <TodoApp/>
      </main>
    </TemplateStyled>
  )
}
