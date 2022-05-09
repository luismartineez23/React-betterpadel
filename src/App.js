import logo from './logo.svg';
import './App.css';
import { Redirect, Route } from 'wouter';
import Home from './Paginas/Home/Home';
import Registro from './Paginas/Auth/Registro';
import Login from './Paginas/Auth/Login';
import axios from 'axios';

axios.defaults.headers.post['Content-type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className='contenido'>
      <Route
        component={Home}
        path="/">
      </Route>
      <Route
        path="/Login">
        {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
      </Route>
      <Route
        path="/register">
        {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Registro />}
      </Route>
    </div>
  );
}

export default App;
