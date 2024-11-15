import { useNavigate } from "react-router-dom";

function SerieComponent({ codigo, nombre, categoria, imagen }) {
    const navigate = useNavigate();

    const gotoUrl = (codigo) => {
        navigate("/series/edit/" + codigo);
    };

    return (
        <div className="card">
            <img src={"https://dummyimage.com/400x250/000/fff&text=" + imagen} alt="img" />
            <div className="card-body">
                <h5>{nombre}</h5>
                <p>{categoria}</p>
                <button onClick={() => gotoUrl(codigo)}>Editar</button>
                <button>Eliminar</button>
            </div>
        </div>
    );
}
export default SerieComponent;
