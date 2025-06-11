import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from './productSlice';

const emptyProduct = { name: '', description: '', price: '' };

export default function ProductManager() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!editingId) {
      setFormState(emptyProduct);
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((f) => ({ ...f, [name]: value }));
  };

  const priceIsValid = () => {
    const priceNum = parseFloat(formState.price);
    return !isNaN(priceNum) && priceNum >= 0;
  };

  const canSubmit = formState.name.trim() && formState.description.trim() && priceIsValid();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (editingId) {
      dispatch(updateProduct({ id: editingId, ...formState, price: parseFloat(formState.price) }));
    } else {
      dispatch(addProduct({ ...formState, price: parseFloat(formState.price) }));
    }
    setEditingId(null);
    setFormState(emptyProduct);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setFormState({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormState(emptyProduct);
  };

  return (
    <main className="max-w-7xl mx-auto p-6 select-none">
      <h1 className="text-5xl font-extrabold mb-12 text-black">Product Management</h1>

      <section className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{editingId ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formState.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1 font-semibold text-gray-700">
              Price ($)
            </label>
            <input
              name="price"
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formState.price}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`px-6 py-2 rounded-md font-semibold text-white transition ${
                canSubmit ? 'bg-black hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2 rounded-md font-semibold border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Existing Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <li
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-default"
              >
                <h3 className="text-lg font-semibold mb-1 text-black">{product.name}</h3>
                <p className="text-gray-600 mb-3 line-clamp-3">{product.description}</p>
                <p className="font-semibold mb-4">${product.price.toFixed(2)}</p>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteProduct(product.id))}
                    className="px-3 py-1 rounded-md border border-red-400 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
