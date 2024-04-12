import { useAuth } from "../store/auth";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const OrderHistory = () => {
    const { products, user } = useAuth();

    // Filter products based on user ID
    const userProducts = products.filter(product => product.cust_id === user._id && product.booked);

    const categoryCounts = userProducts.reduce((acc, product) => {
        if (product.category) {
            // Increment count for existing category or initialize with count of 1
            acc[product.category] = (acc[product.category] || 0) + 1;
        }
        return acc;
    }, {});

    // Prepare data for displaying category counts
    const data = [
        { Category: "Electronics", count: categoryCounts["Electronics"] || 0 },
        { Category: "Clothing", count: categoryCounts["Clothing"] || 0 },
        { Category: "Sports", count: categoryCounts["Sports"] || 0 },
        { Category: "Stationery", count: categoryCounts["Stationery"] || 0 },
        { Category: "Toys", count: categoryCounts["Toys"] || 0 },
        { Category: "Furniture", count: categoryCounts["Furniture"] || 0 },
    ];

    return (
        <>
            <div className="history_section">
                <h1>Order History</h1>
                <div className="table_container"> {/* Container for making the table responsive */}
                    <table className="history_table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>TransactionId</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userProducts.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.productname}</td>
                                    <td>Rs. {product.price}</td>
                                    <td>{product.booked ? "Bought" : "Not bought"}</td>
                                    <td>{product.category}</td>
                                    <td>{product.transaction_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div style={{ textAlign: "center", color: "white" }}> {/* Centered content with white text */}
                    <h1>Graphical Analysis</h1>
                    <div className="chart">
                        <div>
                            <h2 style={{ fontSize: "3rem", color: "blueviolet" }}><i>chart-1: LineChart</i></h2>
                            <LineChart
                                width={600}
                                height={300}
                                data={data}
                                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="Category"
                                    scale="point"
                                    style={{fontSize:"1.5rem"}}
                                    padding={{ left: 20, right: 20 }}
                                    tick={{ fill: "white" }} />
                                <YAxis style={{fontSize:"1.5rem"}} tick={{ fill: "white" }}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                        <div>
                            <h2 style={{ fontSize: "3rem", color: "blueviolet" }}><i>chart-1: BarChart</i></h2>
                            <BarChart
                                width={600}
                                height={300}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={30}
                            >
                                <XAxis
                                    dataKey="Category"
                                    scale="point"
                                    padding={{ left: 20, right: 20 }}
                                    tick={{ fill: "white" }} // White-colored ticks on X-axis
                                    style={{fontSize:"1.5rem"}}
                                />
                                <YAxis style={{fontSize:"1.5rem"}} tick={{ fill: "white" }} /> {/* White-colored ticks on Y-axis */}
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" stroke="#666" /> {/* Dashed grid lines */}
                                <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderHistory;
