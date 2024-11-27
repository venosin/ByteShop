import React, { useEffect, useState } from "react";
import "../styles/Categories.css"; // Importa el archivo de estilos

const Categories = () => {
  // Estados para almacenar los valores de los campos del formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar errores
  const [dataCategorie, setDataCategorie] = useState([]);

  const test = [
    {
      _id: "67474688b01c019ce82c70b9",
      name: "Test",
      description: "una shit",
      image: "laurl.jpg",
      createdAt: "2024-11-27T16:19:20.218Z",
      updatedAt: "2024-11-27T16:19:20.218Z",
      __v: 0,
    },
    {
      _id: "67474755b01c019ce82c70bb",
      name: "Deporte",
      description: "Descripción de los diferentes deportes",
      image: "https://images3.alphacoders.com/215/thumb-1920-215979.jpg",
      createdAt: "2024-11-27T16:22:45.144Z",
      updatedAt: "2024-11-27T16:22:45.144Z",
      __v: 0,
    },
    {
      _id: "67474768b01c019ce82c70bd",
      name: "Bryan desde el navegador",
      description: "Bryaaan myers",
      image: "https://images3.alphacoders.com/215/thumb-1920-215979.jpg",
      createdAt: "2024-11-27T16:23:04.359Z",
      updatedAt: "2024-11-27T16:23:04.359Z",
      __v: 0,
    },
    {
      _id: "674747a2b01c019ce82c70bf",
      name: "Wilfredo",
      description: "Mi mejor compañero",
      image: "https://wilfredo.jpg",
      createdAt: "2024-11-27T16:24:02.135Z",
      updatedAt: "2024-11-27T16:24:02.135Z",
      __v: 0,
    },
  ];

  // Función para manejar el envío del formulario
  const createCategorie = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const newCategorie = { name, description, image };

    // Configurar los parámetros para el fetch (POST)
    setLoading(true); // Activar el indicador de carga
    setError(""); // Limpiar cualquier error previo

    try {
      const response = await fetch("http://localhost:4000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicar que estamos enviando datos en formato JSON
        },
        body: JSON.stringify(newCategorie), // Convertir los datos del formulario a JSON
      });

      if (!response.ok) {
        throw new Error("Hubo un error al crear la categoría");
      }

      const data = await response.json();
      console.log("Categoría creada con éxito:", data);

      // Limpiar los campos después de enviar el formulario
      setName("");
      setDescription("");
      setImage("");

      alert("Categoría creada exitosamente");
    } catch (error) {
      setError(error.message); // Capturar cualquier error
      console.error("Error:", error);
    } finally {
      setLoading(false); // Desactivar el indicador de carga
    }
  };

  const getCategories = async () => {
    try {
      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(`http://localhost:4000/categories`, {
        method: "GET",
      });

      const data = await response.json();
      if (data) {
        setDataCategorie(data);
      } else {
        console.log(data);
        // Alert the user about the error
        alert("Error categorias", data.error);
      }
    } catch (error) {
      alert("Error", "Ocurrió un error al listar las categorias");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1 className="title">Crud Categorías con MERN</h1>

      <ul>
        <li>Nombre</li>
        <li>Descripción</li>
        <li>Imagen: URL</li>
      </ul>

      <div className="form-container">
        {/* Formulario de creación de categoría */}
        <form onSubmit={createCategorie} className="category-form">
          <div className="form-group">
            <label htmlFor="name">Nombre de la categoría:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Actualiza el estado de 'name'
              placeholder="Ingrese el nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Actualiza el estado de 'description'
              placeholder="Ingrese la descripción"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen (URL):</label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)} // Actualiza el estado de 'image'
              placeholder="Ingrese la URL de la imagen"
              required
            />
          </div>
          {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga */}
          {error && <p className="error">{error}</p>}{" "}
          {/* Mostrar mensaje de error */}
          <div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creando..." : "Crear Categoría"}
            </button>
          </div>
        </form>
      </div>
      <br></br>
      <div className="form-container">
        {" "}
        <h1>Listar categorías</h1>{" "}
        {dataCategorie.map((categories) => (
          <div key={categories._id}>
            {" "}
            <p>Categoria: {categories.name}</p>{" "}
            <p>Descripción: {categories.description}</p>{" "}
            <img src={categories.image} alt={categories.name} width="100px"/>{" "}
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default Categories;
