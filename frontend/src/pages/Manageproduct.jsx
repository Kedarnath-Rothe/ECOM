// import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const Manageproduct = () => {

    const { products } = useAuth();

    const { user, isLoading } = useAuth();

    const { authorizationToken } = useAuth();

    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/products/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            console.log(response);
            toast.success("Product Deleted successfully");
            window.location.reload();

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <section className="admin-cars-section">
                <div className="container">
                    <h1>My Products Data</h1>
                </div>
                <div className="container admin-cars">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Status</th>
                                <th>Paid</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((curProduct, index) => {
                                // Check if the current products has an associated phone number
                                if (curProduct.phone == user.phone) {
                                    return (
                                        <tr key={index}>
                                            <td>{curProduct.productname}</td>
                                            <td>
                                                {
                                                    curProduct.booked ? (
                                                        <span>Booked by {curProduct.cust_name} <br /> <p>{curProduct.cust_phone}</p></span>
                                                    ) : (
                                                        <span>Available</span>
                                                    )
                                                }
                                            </td>
                                            <td> Rs.{curProduct.total} </td>
                                            <td>
                                                <img src={`../productimages/${curProduct.image}`} alt="product" width="100" />
                                            </td>
                                            <td className="delete">
                                                <button onClick={() => deleteProduct(curProduct._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null; // Skip rendering if the condition isn't met
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default Manageproduct;