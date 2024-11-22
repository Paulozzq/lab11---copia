function CategoryComponent({ id, name, actualizarLista, lista }) {
    const handleDelete = async () => {
        if (window.confirm(`¿Seguro que deseas eliminar la categoría "${name}"?`)) {
            try {
                await deleteCategoryService(id);
                actualizarLista(lista.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error al eliminar categoría:", error);
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div className="d-flex justify-content-between">
                    <button 
                        className="btn btn-warning" 
                        onClick={() => (window.location.href = `/categories/edit/${id}`)}
                    >
                        Editar
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryComponent;
