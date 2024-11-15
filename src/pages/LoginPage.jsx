import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/series");
    };

    return (
        <section className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" required />
                    <label>Contraseña:</label>
                    <input type="password" required />
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </section>
    );
}
export default LoginPage;
