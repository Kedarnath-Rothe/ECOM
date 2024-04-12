import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

const UserCart = () => {
    const { user, products } = useAuth();
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        let count = 0;
        products.filter(product => product.cust_id === user._id && !product.booked).forEach(product => {
            total += product.price;
            count++;
        });
        setTotalPrice(total);
        setNumberOfProducts(count);
    }, [products, user]);

    const generateTransactionId = () => {
        const segments = [];
    
        // Generate 16 random digits (0-9)
        for (let i = 0; i < 16; i++) {
            const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
            segments.push(randomDigit.toString()); // Add the digit to segments
        }
    
        // Insert dashes at specific positions to match the desired format
        return `T${segments.slice(0, 4).join('')}-${segments.slice(4, 8).join('')}-${segments.slice(8, 12).join('')}-${segments.slice(12).join('')}`;
    };
    
    

    const handleCheckout = async (product) => {
        try {
            await axios.put(`http://localhost:8080/api/data/products/${product._id}`, {
                cust_id: "",
                cust_name: "",
                booked: false,
                transaction_id: generateTransactionId() // Add transaction_id here
            });
            console.log("Removed from cart:", product.productname);

            // updateProducts(); // Assuming this function updates the products data in your context
            navigate('/user/usercart');
            window.location.reload();
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const handleCommonCheckout = async () => {
        const updatedProducts = products.map(product => {
            if (product.cust_id === user._id) {
                console.log("Hi");
                return { ...product, booked: true, transaction_id: generateTransactionId() };
            }
            return product;
        });

        try {
            await axios.post("http://localhost:8080/api/data/usercart", { updatedProducts });
            console.log("Updated schema for all products");
            toast.success("Products bought successfully!");
            navigate('/userhome');
        } catch (error) {
            console.error("Error updating schema:", error);
        }
    };

    return (
        <>
            <section className="cart_section">
                {numberOfProducts === 0 ? (
                    <h1 className="no_item">No items added in cart</h1>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.filter(product => product.cust_id === user._id && !product.booked).map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.productname}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <button onClick={() => handleCheckout(product)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="checkout_btn">
                            <h2>Total Price: Rs. {totalPrice}</h2>
                            <br />
                            <button style={{ backgroundColor: "green" }} onClick={handleCommonCheckout}>Checkout</button>
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default UserCart;
