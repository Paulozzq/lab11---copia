import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { loginService } from "../services/LoginServices"; 
import './LoginPage.css'; 

const initData = {
    username: '',
    password: ''
};

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    const [data, setData] = useState(initData);

    const onChangeUserName = (e) => {
        setData({
            ...data,
            username: e.target.value
        });
    };

    const onChangePassword = (e) => {
        setData({
            ...data,
            password: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await loginService(data);
            console.log(resp.data);
            login(resp.data);
            navigate("/series");
        } catch (error) {
            window.alert('El usuario o contraseña no es correcto');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Introduce tu usuario"
                            value={data.username}
                            onChange={onChangeUserName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Introduce tu contraseña"
                            value={data.password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
