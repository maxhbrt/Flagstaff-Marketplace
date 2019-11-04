import React from 'react';
import Landing from './components/Landing/Landing';
import Map from './Map/Map';
import Header from './components/Header/Header';



import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      
      
      <Landing/>
      <Map/>
      
    </div>
  );
}

export default App;
