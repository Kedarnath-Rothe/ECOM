import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";
 
const ProductUpdate = () => {
    const [data, setData] = useState({
        productname: "",
        price: "",
        username: "",
        phone: "",  
    });

    const params = useParams();
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();

    const getSingleProductData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/products/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const productData = await response.json();
            setData(productData);
        } catch (error) {
            console.log(error.message);
        }   
    };
    
    useEffect(() => {
        getSingleProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/admin/products/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Updated Successfully...");
                navigate('/admin/products');
            } else {
                toast.error("Not Updated...");
            }
        } catch(error) {
            console.log(error.message);
        }
    };

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading"> Update Product Data </h1>
            </div>
            <div className="car_container container grid grid-two-cols">

                <section>
                    <img className="car-update"  width="400" src="/images/product-update.png" alt="Register image" />
                </section>

                <section className="car_form section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="productname"> Product Name </label>
                            <input
                                type="text"
                                name="productname"
                                id="productname"
                                autoComplete="off"
                                value={data.productname}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price"> Price </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                autoComplete="off"
                                value={data.price}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="username"> User Name </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={data.username}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone"> Phone </label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                maxLength='10'
                                minLength='10'
                                autoComplete="off"
                                value={data.phone}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit"> Update </button>
                        </div>
                    </form>
                </section> 
            </div>
        </section>
    );
}

export default ProductUpdate;
