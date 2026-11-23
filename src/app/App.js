import React from 'react';
import 'bootswatch/dist/lux/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Rotas from './routes/routes.js';
import { AuthProvider } from '../context/auth.context.js';

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    )
  }
}

export default App;