import React, { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { toast } from "react-toastify";
import { FaMagnifyingGlass } from "react-icons/fa6";
import NewProduct from "../Components/NewProduct";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const PathAPI = "https://66bed4f942533c4031442a3e.mockapi.io/products1";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const respons = await fetch(`${PathAPI}`);
        const data = await respons.json();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to fetch Products", { autoClose: 2000 });
      }
    };
    fetchProducts();
  }, []);
  console.log(products);

  const addProduct = async (product) => {
    try {
      const response = await fetch(`${PathAPI}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      toast.success("Product added successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to add product!", { autoClose: 2000 });
    }
  };

  const updateProduct = async (updatedProduct, id) => {
    try {
      const { pro_id } = products[id];
      const response = await fetch(`${PathAPI}/${pro_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const updated = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((p, index) => (index === id ? updated : p))
      );
      toast.info("Product updated successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to update product!", { autoClose: 2000 });
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { pro_id } = products[id];
      await fetch(`${PathAPI}/${pro_id}`, {
        method: "DELETE",
      });
      setProducts((prevProducts) =>
        prevProducts.filter((_, index) => index !== id)
      );
      toast.error("Product deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to delete product!", { autoClose: 2000 });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.pro_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.pro_des.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center gap-2 mb-4 mt-20">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded bg-white"
        />
      </div>
      <NewProduct addProduct={addProduct} />
      {filteredProducts.length > 0 ? (
        <table className="min-w-full mt-1 border-collapse">
          <thead className="bg-gray-300">
            <tr className="bg-gray-200 justify-center-safe">
              <th className="px-4 py-2 text-center">#</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Description</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Quantity</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <ProductItem
                key={index}
                id={index}
                product={product}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-6 text-center text-gray-500">
          No Product found for matching your search
        </p>
      )}
    </>
  );
}

export default ProductPage;
