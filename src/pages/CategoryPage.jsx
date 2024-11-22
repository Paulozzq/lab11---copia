import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import CategoryComponent from "../components/CategoryComponent";
import { getAllCategoryService } from "../services/CategoryService";

function CategoryPage() {
    const [categories, setCategories] = useState([]);

    const loadData = async () => {
        try {
            const resp = await getAllCategoryService();
            setCategories(resp.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h3>Categorías</h3>
                    <div>
                        <Link className="btn btn-primary" to="/categories/new">
                            Nueva Categoría
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {categories.map((category) => (
                        <div key={category.id} className="col-md-3 mb-3">
                            <CategoryComponent
                                id={category.id}
                                name={category.name}
                                lista={categories}
                                actualizarLista={setCategories}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryPage;
