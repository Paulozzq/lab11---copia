import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

function CategoryFormPage() {
    const navigate = useNavigate();
    const { idcategoria } = useParams();
    const urlApi = 'http://127.0.0.1:8000/categories/';

    const [category, setCategory] = useState({ name: "" });  // Cambié 'nom' por 'name'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar los datos de la categoría si se está editando
    useEffect(() => {
        if (idcategoria) {
            setIsLoading(true);
            axios.get(`${urlApi}${idcategoria}/`)
                .then((response) => {
                    setCategory({ name: response.data.name });  // Cambié 'nom' por 'name'
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error al cargar la categoría:", error);
                    setError("Error al cargar los datos de la categoría.");
                    setIsLoading(false);
                });
        }
    }, [idcategoria, urlApi]);

    // Manejar cambios en el campo de la categoría
    const handleChange = (e) => {
        setCategory({
            ...category,
            name: e.target.value,  // Cambié 'nom' por 'name'
        });
    };

    // Manejar el envío del formulario (crear o actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            name: category.name,  // Enviar el nombre de la categoría
        };

        try {
            setIsLoading(true);
            if (idcategoria) {
                // Si estamos editando, actualizamos la categoría
                await axios.put(`${urlApi}${idcategoria}/`, categoryData);
            } else {
                // Si estamos añadiendo una nueva categoría
                await axios.post(urlApi, categoryData);
            }
            navigate("/categories"); // Redirigir a la página de categorías después de guardar
        } catch (error) {
            console.error("Error al guardar la categoría:", error);
            setError("Error al guardar la categoría.");
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar el cancelado del formulario
    const handleCancel = () => {
        navigate("/categories");  // Redirigir a la página de categorías sin guardar
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <h3>{idcategoria ? "Editar Categoría" : "Añadir Categoría"}</h3>
                {isLoading && <div>Cargando...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputCategoryName" className="form-label">
                            Nombre de la categoría
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCategoryName"
                            value={category.name}  // Asegúrate de que 'category.name' esté correctamente enlazado
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex">
                        <button type="submit" className="btn btn-primary me-2" disabled={isLoading}>
                            {idcategoria ? "Guardar Cambios" : "Guardar"}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CategoryFormPage;
