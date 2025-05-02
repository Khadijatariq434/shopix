import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEdit, FaTrash, FaPlus, FaBoxOpen } from "react-icons/fa";

const ManageProducts = () => {
  const {
    products,
    fetchProducts,
    deleteProduct,
    updateProduct,
    addProduct,
    loading,
    user,
  } = useAuth();

  // State for editing products
  const [editProduct, setEditProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStock, setUpdatedStock] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  // State for adding products
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState(null);
  const [newPreviewImage, setNewPreviewImage] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");

  // State for delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showAddModal || editProduct || deleteConfirmation) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showAddModal, editProduct, deleteConfirmation]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // For editing a product
  const handleEdit = (product) => {
    setEditProduct(product);
    setUpdatedName(product.name);
    setUpdatedPrice(product.price);
    setUpdatedDescription(product.description || "");
    setUpdatedStock(product.stock || "");
    setUpdatedCategory(product.category ? product.category.join(", ") : "");
    setPreviewImage(product.image); // Show current image
  };

  // For image preview in edit modal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Show preview
  };

  // For updating a product
  const handleUpdate = async () => {
    if (!editProduct) return;

    console.log("Updated Price:", updatedPrice); // Debugging

    const formData = new FormData();
    formData.append("name", updatedName);
    formData.append("price", updatedPrice);

    if (updatedDescription) {
      formData.append("description", updatedDescription);
    }

    if (updatedStock) {
      formData.append("stock", updatedStock);
    }

    if (updatedCategory) {
      // Convert categories input into an array (comma-separated)
      const categoryArray = updatedCategory.split(",").map((cat) => cat.trim());
      // Append each category separately
      categoryArray.forEach((cat) => formData.append("category[]", cat));
    }

    if (updatedImage) {
      formData.append("image", updatedImage);
    }

    console.log("Final FormData Sent:", Object.fromEntries(formData));

    await updateProduct(editProduct._id, formData, user.token);
    setEditProduct(null);
  };

  // For image preview in add modal
  const handleImageChangeForAdd = (e) => {
    const file = e.target.files[0];
    setNewProductImage(file);
    setNewPreviewImage(URL.createObjectURL(file));
  };

  // Handle add product form submission
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProductName);
    formData.append("price", newProductPrice);
    formData.append("description", newProductDescription);
    formData.append("stock", newProductStock);
    formData.append("image", newProductImage);

    // Convert categories input into an array (comma-separated)
    const categoryArray = newProductCategory.split(",").map((cat) => cat.trim());

    // Append each category separately
    categoryArray.forEach((cat) => formData.append("category[]", cat));
    console.log("Final FormData Sent:", Object.fromEntries(formData));

    await addProduct(formData, user.token);

    // Reset form fields
    setShowAddModal(false);
    setNewProductName("");
    setNewProductPrice("");
    setNewProductDescription("");
    setNewProductStock("");
    setNewProductCategory("");
    setNewProductImage(null);
    setNewPreviewImage("");
  };

  // Handle delete confirmation
  const confirmDelete = (product) => {
    setDeleteConfirmation(product);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteConfirmation) return;
    await deleteProduct(deleteConfirmation._id);
    setDeleteConfirmation(null);
  };

  if (loading) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center bg-gray-50 min-h-screen"
      >
        <svg
          aria-hidden="true"
          className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-14 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaBoxOpen className="mr-3 text-purple-600" />
            Manage Products
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors flex items-center shadow-md hover:shadow-lg"
          >
            <FaPlus className="mr-2" /> Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No products available. Add some products to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={`https://shopix-backend-yzwb.onrender.com/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {product.stock && product.stock <= 5 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Low Stock: {product.stock}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-purple-600 font-bold text-xl my-1">₹{product.price}</p>

                  {product.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
                  )}

                  {product.category && product.category.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto mb-3">
                      {product.category.map((cat, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center p-3 border-t border-gray-100 bg-gray-50">
                  <button
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    className="flex items-center text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                    onClick={() => confirmDelete(product)}
                  >
                    <FaTrash size={16} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-3">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  value={newProductDescription}
                  onChange={(e) => setNewProductDescription(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows="3"
                  placeholder="Describe your product"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Stock Quantity</label>
                <input
                  type="number"
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Available quantity"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Categories</label>
                <input
                  type="text"
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Comma separated (e.g. Electronics, Gadgets)"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Separate categories with commas</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Product Image</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center p-3">
                      {newPreviewImage ? (
                        <img
                          src={newPreviewImage}
                          alt="Preview"
                          className="w-full h-full object-contain rounded"
                        />
                      ) : (
                        <>
                          <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="text-sm text-gray-500">Click to upload image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChangeForAdd}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-3">Edit Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows="3"
                  placeholder="Describe your product"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Stock Quantity</label>
                <input
                  type="number"
                  value={updatedStock}
                  onChange={(e) => setUpdatedStock(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Available quantity"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Categories</label>
                <input
                  type="text"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Comma separated (e.g. Electronics, Gadgets)"
                />
                <p className="text-xs text-gray-500 mt-1">Separate categories with commas</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Product Image</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center p-3">
                      {previewImage ? (
                        <img
                          src={typeof previewImage === 'string' && previewImage.startsWith('http')
                            ? previewImage
                            : `http://localhost:5000/${previewImage}`}
                          alt="Preview"
                          className="w-full h-full object-contain rounded"
                        />
                      ) : (
                        <>
                          <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="text-sm text-gray-500">Click to change image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  onClick={() => setEditProduct(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{deleteConfirmation.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                onClick={() => setDeleteConfirmation(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2.5 rounded-lg hover:bg-red-600 transition-colors font-medium"
                onClick={handleDeleteConfirmed}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
