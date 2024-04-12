import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

const Addproduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productname: "",
        price: "",
        username: "",
        phone: "",
        details: "",
        image: null,
        category: "" // New state variable for the product category
    });

    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && user) {
            setProduct(prevState => ({
                ...prevState,
                username: user.username || "",
                phone: user.phone || ""
            }));
        }
    }, [user, isLoading]);

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === "image") {
            setProduct({
                ...product,
                [name]: e.target.files[0]
            });
        } else {
            setProduct({
                ...product,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("productname", product.productname);
            formData.append("price", product.price);
            formData.append("username", product.username);
            formData.append("phone", product.phone);
            formData.append("details", product.details);
            formData.append("image", product.image);
            formData.append("category", product.category); // Append category to formData

            const response = await fetch('http://localhost:8080/api/data/addproduct', {
                method: "POST",
                body: formData,
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success("Product Added successfully...");
                setProduct({
                    productname: "",
                    price: "",
                    username: "",
                    phone: "",
                    details: "",
                    image: null,
                    category: "" // Reset category after submission
                });
                if (user.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/userhome');
                    window.location.reload();
                }
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error("ERROR", error);
        }
    };

    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img className="register_image" src="/images/addproduct.png" alt="Register image" />
                            </div>

                            <div className="registration-form" >
                                <h1 className="main-heading mb-3">Add Product...</h1>
                                <br />

                                <div className="form">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div>
                                            <label htmlFor="productname">Product Name</label>
                                            <input
                                                type="text"
                                                name="productname"
                                                placeholder="Product Name"
                                                id="productname"
                                                required
                                                autoComplete="off"
                                                value={product.productname}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="price">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                placeholder="Enter Price"
                                                id="price"
                                                required
                                                autoComplete="off"
                                                value={product.price}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="category">Category</label>
                                            <select
                                                className='category-select'
                                                name="category"
                                                id="category"
                                                value={product.category}
                                                onChange={handleInput}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Stationery">Stationery</option>
                                                <option value="Toys">Toys</option>
                                                <option value="Furniture">Furniture</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="details">Details</label>
                                            <textarea
                                                name="details"
                                                id="details"
                                                autoComplete="off"
                                                value={product.details}
                                                onChange={handleInput}
                                                required
                                                cols="30"
                                                rows="2"
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label htmlFor="image">Product Image</label>
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleInput}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-submit">
                                            Add Product
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Addproduct;
