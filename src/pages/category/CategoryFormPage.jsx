import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { 
    getCategoryByIdService, 
    createCategoryService, 
    updateCategoryService 
} from "../../services/CategoryService";

function CategoryFormPage() {
    const navigate = useNavigate();
    const { idcategoria } = useParams();

    const [category, setCategory] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar los datos de la categoría si se está editando
    useEffect(() => {
        if (idcategoria) {
            setIsLoading(true);
            getCategoryByIdService(idcategoria)
                .then((data) => {
                    setCategory({ name: data.name });
                })
                .catch((err) => {
                    console.error("Error al cargar la categoría:", err);
                    setError("Error al cargar los datos de la categoría.");
                })
                .finally(() => setIsLoading(false));
        }
    }, [idcategoria]);

    // Manejar cambios en el campo de la categoría
    const handleChange = (e) => {
        setCategory({
            ...category,
            name: e.target.value,
        });
    };

    // Manejar el envío del formulario (crear o actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = { name: category.name };

        try {
            setIsLoading(true);
            if (idcategoria) {
                await updateCategoryService(idcategoria, categoryData);
            } else {
                await createCategoryService(categoryData);
            }
            navigate("/categories"); // Redirigir a la página de categorías después de guardar
        } catch (err) {
            console.error("Error al guardar la categoría:", err);
            setError("Error al guardar la categoría.");
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar el cancelado del formulario
    const handleCancel = () => {
        navigate("/categories");
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
                            value={category.name}
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
