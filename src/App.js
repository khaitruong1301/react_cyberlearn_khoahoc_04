import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        
        <Route exact path='/home' component={Home} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/detail/:id' component={Detail} />
        <Route exact path='/' component={Home} />
        <Route path="*" component={PageNotFound}/>

      </Switch>
  
    </BrowserRouter>
  );
}

export default App;
