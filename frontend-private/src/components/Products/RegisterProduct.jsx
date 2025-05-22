import React from 'react';

const RegisterProduct = ({
  name, setName,
  description, setDescription,
  price, setPrice,
  idCategory, setIdCategory,
  categories = [],
  stock, setStock,
  image, setImage,
  idBrand, setIdBrand,
  brands = [],
  idModel, setIdModel,
  models = [],
  discount, setDiscount,
  saveProduct,
  id,
  handleEdit
}) => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Descripción</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Precio</label>
            <input
              type="number"
              name="price"
              value={price}
              min={0}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              value={stock}
              min={0}
              onChange={e => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">Imagen (URL)</label>
            <input
              type="text"
              name="image"
              value={image}
              onChange={e => setImage(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Descuento */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="discount">Descuento (%)</label>
            <input
              type="number"
              name="discount"
              value={discount}
              min={0}
              max={100}
              onChange={e => setDiscount(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idCategory">Categoría</label>
            <select
              name="idCategory"
              value={idCategory}
              onChange={e => setIdCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Marca */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idBrand">Marca</label>
            <select
              name="idBrand"
              value={idBrand}
              onChange={e => setIdBrand(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona una marca</option>
              {brands.map(brand => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idModel">Modelo</label>
            <select
              name="idModel"
              value={idModel}
              onChange={e => setIdModel(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona un modelo</option>
              {models.map(model => (
                <option key={model._id} value={model._id}>{model.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón */}
        <div className="mt-6">
          <button
            type="submit"
            onClick={id ? handleEdit : saveProduct}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {id ? "Editar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterProduct;
