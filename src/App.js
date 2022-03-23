import React from 'react';
import 'assets/css/style.css';
import 'assets/css/web_style.css';
import 'assets/css/responsive-web.css';
import 'assets/css/responsive.css';
import Main from 'components/Main/Main.js';
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import fontawesome from '@fortawesome/fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faCheckSquare, faCoffee);

function App() {
  return (
    <div className="App">
      <Header />
      <Main projectData="1" />
      <Footer />
    </div>
  );
}

export default App;
