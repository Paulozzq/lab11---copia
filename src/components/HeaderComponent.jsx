import { NavLink } from "react-router-dom";

function HeaderComponent() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">SeriesApp</span>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><NavLink className="nav-link" to="/home">Inicio</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/categories">Categorías</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/series">Series</NavLink></li>
                    </ul>
                    <div>Bienvenido Paulo Garcia <a href="/">Salir</a></div>
                </div>
            </div>
        </nav>
    );
}
export default HeaderComponent;
