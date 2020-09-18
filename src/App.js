import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        
        <Route exact path='/home' component={Home} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={Login} />

        <Route exact path='/' component={Home} />
      </Switch>
  
    </BrowserRouter>
  );
}

export default App;
