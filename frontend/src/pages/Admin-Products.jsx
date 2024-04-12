import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuth } from "../store/auth";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const { authorizationToken, user } = useAuth();
  const navigate = useNavigate();

  const getAllProductsData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/products", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (!response.ok) {
        toast.error("Failed to fetch products");
        navigate('/admin');
        return;
      }

      const data = await response.json();
      setProducts(data);

    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (response.ok) {
        getAllProductsData();
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllProductsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  // Function to calculate counts of booked and unbooked products by category
  const getCategoryCounts = () => {
    const categoryCounts = {};

    products.forEach(product => {
      const { category, booked } = product;
      if (!categoryCounts[category]) {
        categoryCounts[category] = { booked: 0, unbooked: 0 };
      }

      if (booked) {
        categoryCounts[category].booked++;
      } else {
        categoryCounts[category].unbooked++;
      }
    });

    return categoryCounts;
  };

  const categoryCounts = getCategoryCounts();

  // Prepare data for BarChart
  const barChartData = Object.keys(categoryCounts).map(category => ({
    category,
    booked: categoryCounts[category].booked,
    unbooked: categoryCounts[category].unbooked,
  }));

  return (
    <>
      <section className="admin-cars-section">
        <div className="container">
          <h1 style={{ margin: "auto" }}>Manage Products</h1>
        </div>
        <div className="container admin-cars">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((curProduct, index) => (
                <tr key={index}>
                  <td>{curProduct.productname}</td>
                  <td>Rs.{curProduct.price}</td>
                  <td>
                    <img src={`../productimages/${curProduct.image}`} alt="product" width="100" />
                  </td>
                  <td>
                    {curProduct.booked ? (
                      <span>Booked by {curProduct.cust_name} <br/> <p>{curProduct.cust_phone}</p></span>
                    ) : (
                      <span>Available</span>
                    )}
                  </td>
                  <td className="edit">
                    <button>
                      <Link className="edit2" to={`/admin/products/${curProduct._id}/edit`}>Edit</Link>
                    </button>
                  </td>
                  <td className="delete">
                    <button onClick={() => deleteProduct(curProduct._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Render Bar Chart */}
      <div className="chart" style={{ marginTop: '20px' }}>
        <div>
        <h2 style={{color:"blueviolet", textAlign:"center", fontSize:"3rem"}}>Product Category Counts</h2> <br/>
        <BarChart width={800} height={400} data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis style={{fontSize:"2rem"}} dataKey="category"  tick={{ fill: "white" }} />
          <YAxis style={{fontSize:"2rem"}} tick={{ fill: "white" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="booked" stackId="a" fill="#8884d8" />
          <Bar dataKey="unbooked" stackId="a" fill="#82ca9d" />
        </BarChart>
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
