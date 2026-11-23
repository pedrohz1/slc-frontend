import React from 'react';
import 'bootswatch/dist/lux/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Rotas from './app/routes/rotas.js';

class App extends React.Component {
  render() {
    return <Rotas />;
  }
}

export default App;