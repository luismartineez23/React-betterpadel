import axios from "axios";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { Link } from "wouter";
import './Navbar.css';
import logo from '../../images/Logo_en_grande-removebg-preview.png';

function Navbar() {

   const navigate = useNavigate();

    const logout = (event) => {

        event.preventDefault();
        axios.get('http://betterpadel.atwebpages.com/betterpadel/public/sanctum/csrf-cookie').then(response => {
           
        axios.post(`http://betterpadel.atwebpages.com/betterpadel/public/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate('/');
            } else if (res.data.status === 401) {
                swal("Warning", res.data.message, "warning");
            }
        });
    });
    }


    let Botones = '';

    if (localStorage.getItem('auth_token')===null) {
        Botones = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/Login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        );
    } else {
        Botones = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <button type="button" onClick={logout} className="nav-link btn btn-danger btn-small test-white">Logout</button>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg shadow sticky-top cabecera">
            <div className="sinespacio">
                <Link className="navbar-brand" to="/"><img className="imagen" src={logo} alt='Better padel'></img></Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        {Botones}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;