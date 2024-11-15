import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import SerieComponent from "../components/SerieComponent";
import { useNavigate } from "react-router-dom";

function SeriePage() {
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Llamar a la API para obtener la lista de series
        axios.get("http://127.0.0.1:8000/series/")
            .then((response) => {
                setSeries(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar las series:", error);
                setError("Error al cargar las series.");
                setIsLoading(false);
            });
    }, []);

    const handleAddSerie = () => {
        // Redirigir a la página de agregar serie
        navigate("/series/edit/:idserie");
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <h3>Series</h3>
                <button className="btn btn-primary mb-3" onClick={handleAddSerie}>Agregar Serie</button>
                {isLoading && <div>Cargando...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    {series.map((serie) => (
                        <div key={serie.id} className="col-md-3 mb-3">
                            <SerieComponent
                                codigo={serie.id}
                                nombre={serie.name}
                                categoria={serie.category.name}
                                imagen={serie.image}  // Asegúrate de que 'image' sea la propiedad correcta
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SeriePage;
