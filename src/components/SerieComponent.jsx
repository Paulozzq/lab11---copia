import { useNavigate } from "react-router-dom";
import { deleteSerieService } from "../services/SerieServices";

function SerieComponent({ codigo, nombre, categoria, imagen, lista, actualizarLista }) {
    const navigate = useNavigate();

    const gotoUrl = (codigo) => {
        navigate("/series/edit/" + codigo);
    };

    const handleDelete = async (codigo) => {
        console.log(codigo);
        if (window.confirm('¿Está seguro de eliminar este registro?')) {
            await deleteSerieService(codigo);
            const nuevaLista = lista.filter(item => item.id !== codigo); 
            actualizarLista(nuevaLista); 
        }
    };

    return (
        <div className="card">
            <img src={"https://dummyimage.com/400x250/000/fff&text=" + imagen} alt="img" />
            <div className="card-body">
                <h5>{nombre}</h5>
                <p>{categoria}</p>
                <button onClick={() => gotoUrl(codigo)} className="btn btn-warning">Editar</button>
                <button onClick={() => handleDelete(codigo)} className="btn btn-danger">Eliminar</button>
            </div>
        </div>
    );
}

export default SerieComponent;
