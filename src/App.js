import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Header from './components/Home/Header/Header';
import Modal from './HOC/Modal/Modal';
import About from './pages/About/About';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import Contact from './pages/Contact/Contact';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import Todolist from './pages/Todolist/Todolist';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';
import TodolistRFC from './pages/Todolist/TodolistRFC';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';

function App() {
  return (
    <BrowserRouter>
      <Modal />
      <LoadingComponent />
      <Switch>
        
        {/* <Route exact path='/home'  render={(propsRoute)=>{
          return <div>
                <Header />
                <Home {...propsRoute} />
          </div>
        }}/> */}

        <HomeTemplate path="/home" exact Component={Home} />

        <HomeTemplate exact path='/contact' Component={Contact}/>
        <HomeTemplate exact path='/about' Component={About} />
        <HomeTemplate exact path='/login' component={Login} />
        <HomeTemplate exact path='/detail/:id' component={Detail} />
        <HomeTemplate exact path='/profile' component={Profile} />
        <HomeTemplate exact path='/todolistrfc' component={TodolistRFC} />
        <HomeTemplate exact path='/todolistrcc' component={Todolist} />
        <HomeTemplate exact path='/todolistredux' component={ToDoListRedux} />
        <HomeTemplate exact path='/todolistsaga' component={BaiTapToDoListSaga} />
        <HomeTemplate exact path='/demohocmodal' component={DemoHOCModal} />
        <HomeTemplate exact path='/' component={Home} />
        <HomeTemplate path="*" component={PageNotFound}/>

      </Switch>
  
    </BrowserRouter>
  );
}

export default App;
