import { useState, useRef } from "react";
import "./Admin.css";
import {
  FaClipboardList,
  FaFileInvoice,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { PiListHeartFill } from "react-icons/pi";

function CreateProduct() {
  const [data, setData] = useState({
    price: 0,
    name: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const imageInput = useRef(null);

  const [image, setImage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("subcategory", data.subcategory);
    formData.append("description", data.description);
    formData.append("image", image);

    try {
      const settings = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(
        "http://localhost:5100/api/product/create",
        settings
      );

      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        alert("Product Added Successfully!");
        setData({
          price: 0,
          name: "",
          category: "",
          subcategory: "",
          description: "",
        });
      } else {
        const { error } = await response.json();
        throw new Error(error.msg);
      }
    } catch (error) {
      alert(error.msg);
    }
    setImage("");
    imageInput.current.value = "";
  }

  return (
    <div className="adminContainer">
      <div className="sidebarAdmin">
        <FaUser className="userImageAdmin" />
        <button className="sidebarButtonAdmin">
          <p>Edit Profile</p>
          <FaUserEdit />
        </button>
        <button className="sidebarButtonAdmin">
          <p>My Orders</p>
          <FaClipboardList />
        </button>
        <button className="sidebarButtonAdmin">
          <p>My Invoices</p>
          <FaFileInvoice />
        </button>
        <button className="sidebarButtonAdmin">
          <p>Wishlist</p>
          <PiListHeartFill />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formBox">
          <div className="adminHeader">
            <h1>Admin Panel</h1>
          </div>
          <div className="selectImages">
            <p>Please select an image to upload</p>
            <img src={image && URL.createObjectURL(image)} alt="" width={100} />
            <label className="custom-file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                ref={imageInput}
              />
              Dosya Seç
            </label>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Name of Product"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price of Product"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
          </div>
          <div className="description">
            <p>Product Description</p>
            <textarea
              name="description"
              placeholder="Description"
              value={data.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="category-subcategory">
            <div className="category">
              <p>Category</p>
              <select
                name="category"
                value={data.category}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select your Option
                </option>
                <option value="Decor">Decor</option>
                <option value="Eustoma">Rolls</option>
                <option value="Flowers on Ocassion">Flowers on Ocassion</option>
                <option value="Gifts">Gifts</option>
                <option value="House Plants">House Plants</option>
                <option value="Peonies">Peonies</option>
                <option value="Roses">Roses</option>
              </select>
            </div>
            <div className="subcategory">
              <p>Subcategory</p>
              <select
                name="subcategory"
                value={data.subcategory}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select your Option
                </option>
                <option value="Artificial">Artificial</option>
                <option value="Christmas">Christmas</option>
                <option value="For Home">For Home</option>
                <option value="St. Valentine's Day">St. Valentine's Day</option>
                <option value="Wedding Anniversary">Wedding Anniversary</option>
                <option value="Birthday">Birthday</option>
              </select>
            </div>
          </div>
          <button className="createProductButton">Create Product</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
