import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

const initData = {
    name: "",
    release_date: "",
    rating: 0,
    category: ""
};

function SerieFormPage() {
    const navigate = useNavigate();
    const { idserie } = useParams(); // Obtiene el ID de la serie si estamos editando una existente
    const [data, setData] = useState(initData); // Estado para los datos del formulario
    const [categories, setCategories] = useState([]); // Estado para las categorías
    const [image, setImage] = useState(null); // Para manejar la imagen

    // Cargar las categorías disponibles
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/categories/") // Asumiendo que tienes una API para obtener categorías
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error al obtener categorías:", error);
            });
    }, []);

    // Función para cargar los datos de la serie si estamos editando
    useEffect(() => {
        if (idserie) {
            // Obtener los datos de la serie desde la API usando el ID
            axios.get(`http://127.0.0.1:8000/series/${idserie}/`)
                .then(response => {
                    setData({
                        name: response.data.name,
                        release_date: response.data.release_date,
                        rating: response.data.rating,
                        category: response.data.category ? response.data.category.id : "" // Asegurarse de que la categoría esté en el formato correcto
                    });
                })
                .catch(error => {
                    console.error("Error al obtener la serie:", error);
                });
        }
    }, [idserie]);

    const onChangeName = (e) => {
        setData({ ...data, name: e.target.value });
    };

    const onChangeReleaseDate = (e) => {
        setData({ ...data, release_date: e.target.value });
    };

    const onChangeRating = (e) => {
        setData({ ...data, rating: e.target.value });
    };

    const onChangeCategory = (e) => {
        setData({ ...data, category: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("release_date", data.release_date);
        formData.append("rating", data.rating);
        formData.append("category", data.category);
        if (image) formData.append("image", image);

        try {
            if (idserie) {
                // Enviar PUT para actualizar la serie en la API
                await axios.put(`http://127.0.0.1:8000/series/${idserie}/`, formData);
            } else {
                // Enviar POST para agregar una nueva serie
                await axios.post("http://127.0.0.1:8000/series/", formData);
            }
            navigate("/series");  // Redirigir a la página de series después de guardar
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    const handleCancel = () => {
        navigate("/series");  // Redirigir a la página de series si el usuario cancela
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <h3>{idserie ? "Editar Serie" : "Agregar Serie"}</h3>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-4">
                        <img
                            id="fileImg"
                            className="card-img-top"
                            src={image ? URL.createObjectURL(image) : "https://dummyimage.com/400x250/000/fff&text=Imagen no disponible"}
                            alt="Imagen de la serie"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nombre</label>
                            <input
                                type="text"
                                onChange={onChangeName}
                                className="form-control"
                                id="inputName"
                                value={data.name}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputReleaseDate" className="form-label">Fecha de Lanzamiento</label>
                            <input
                                type="date"
                                onChange={onChangeReleaseDate}
                                className="form-control"
                                id="inputReleaseDate"
                                value={data.release_date}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputRating" className="form-label">Calificación</label>
                            <input
                                type="number"
                                onChange={onChangeRating}
                                className="form-control"
                                id="inputRating"
                                value={data.rating}
                                min="0"
                                max="10"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCategory" className="form-label">Categoría</label>
                            <select
                                onChange={onChangeCategory}
                                className="form-select"
                                id="inputCategory"
                                value={data.category}
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImage" className="form-label">Imagen</label>
                            <input
                                type="file"
                                className="form-control"
                                id="inputImage"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="d-flex">
                            <button type="submit" className="btn btn-primary me-2">Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieFormPage;
