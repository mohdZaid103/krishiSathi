import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { createProduct } from "../services/sellerService.js";

function AddProduct() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createProduct(
          formData
        );

        navigate("/seller");

      } catch (error) {

        console.error(error);

        alert(
          "Failed to add product"
        );

      }
    };

  return (
    <MainLayout>

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="bg-white border rounded-3xl p-8">

          <h1 className="text-4xl font-bold mb-8">
            Add Product
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

            <input
              name="name"
              placeholder="Product Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3"
            />

            <input
              name="category"
              placeholder="Category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3"
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3"
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={
                formData.stock
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3"
            />

            <input
              name="image"
              placeholder="Image URL"
              value={
                formData.image
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3"
            />

            <button
              type="submit"
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
                py-3
                rounded-xl
              "
            >
              Add Product
            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default AddProduct;