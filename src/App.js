import React from 'react';
import './App.css';

import ToDos from './component/ToDos'
import Routing from './containers/Routing/Routing'


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Routing/>
      </header>
    </div>
  );
}

export default App;
