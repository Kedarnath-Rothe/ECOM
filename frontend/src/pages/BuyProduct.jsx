import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";


const BuyProduct = () => {

    const { user, isLoggedIn } = useAuth();

    const [productData, setProductData] = useState({
        productname: "",
        price: "",
        username: "",
        phone: "",
        start_date: "",
        end_date: "",
        cust_id: user._id,
        cust_name: user.username,
        cust_phone: user.phone,
        total: ""
    });

    console.log(productData);

    const params = useParams();
    // const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    useEffect(() => {
        const getSingleProductData = async () => {
            try {
                const response = await fetch(`https://ecom-back-vert.vercel.app/api/auth/bookproduct/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });

                if (response.ok) {
                    const productData = await response.json();
                    setProductData({ ...productData, cust_id: user._id, cust_name: user.username, cust_phone: user.phone });
                } else {
                    // toast.error("Failed to fetch product data");
                }
            } catch (error) {
                console.log(error.message);
                toast.error("Failed to fetch products data");
            }
        };

        getSingleProductData();
    }, [authorizationToken, params.id, user._id, user.username, user.phone]);


    const handleInput = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (!isLoggedIn) {
        toast.error("Plese, You Have to Login...")
        return <Navigate to="/" />
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const updatedProductData = { ...productData, booked: false };

            const response = await fetch(`https://ecom-back-vert.vercel.app/api/auth/bookproduct/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(updatedProductData),
            });

            if (response.ok) {
                toast.success("Added Successfully...");
                navigate('/service');
                // window.location.reload();
            } else {
                toast.error("Not Updated...");
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <section className="section-bookcar">
            <div className="card">
                <img src={`../../productimages/${productData.image}`} alt={productData.productname} />
                <hr style={{height:"2px", backgroundColor:"black"}}/>
                <div className="card-content">
                    <h2>{productData.productname}</h2>
                    <h2>RS. {productData.price}</h2>

                    <form onSubmit={handleSubmit}>
                        <div> 
                            <input
                                type="text"
                                name="productname"
                                id="productname"
                                autoComplete="off"
                                value={productData.productname}
                                onChange={handleInput}
                                required
                                disabled
                            />
                        </div>

                        <div>
                            <button type="submit">Add to cart</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    );
}

export default BuyProduct;
