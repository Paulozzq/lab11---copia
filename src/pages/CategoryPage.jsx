import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function CategoryPage() {
    const urlApi = 'http://127.0.0.1:8000/categories/';
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const resp = await axios.get(urlApi);
            console.log(resp);
            console.log(resp.data); 
            setCategories(resp.data); 
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/categories/edit/${id}`); // Navigate to edit page with category ID
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${urlApi}${id}/`);
            const updatedCategories = categories.filter((item) => item.id !== id);
            setCategories(updatedCategories); // Update state to remove deleted category
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
        }
    };

    const handleAdd = () => {
        navigate('/categories/add');
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <h3>Categorías</h3>
                <button onClick={handleAdd} className="btn btn-primary mb-3">Agregar Nueva Categoría</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Id</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.id}</td>
                                <td>
                                    <button onClick={() => handleEdit(item.id)} className="btn btn-warning me-2">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CategoryPage;
