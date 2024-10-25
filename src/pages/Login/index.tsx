import React from 'react';
import './index.scss';
import MyInput from "../../components/MyInput";
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    let username = '';
    let password = '';

    function signIn() {
        if (username === 'vinicius' && password === 'vinicius') {
                navigate('/user/create');
        } else {
            alert('Login ou senha invalidos!');
        }
    }


    return (
        <div className="login-page">
            <header>
                Página de Acesso
            </header>
            <main>
                <MyInput id={username} label='Login' change={value => username = value}/>
                <MyInput id={password} label='Senha' change={value => password = value} type='password'/>
            </main>
            <footer>
                <button onClick={signIn}>Entrar</button>
            </footer>
        </div>
    );
}