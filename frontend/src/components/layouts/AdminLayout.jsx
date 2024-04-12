import { IoMdLogOut } from "react-icons/io";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

import { BiSolidCartAdd } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdContactSupport, MdManageHistory } from "react-icons/md";



export const AdminLayout = () => {

    const { user, isLoading } = useAuth();

    console.log(user);

    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    return (
        <>
            <section className="admin_section">
                <div className="conatiner service_head" >
                    <div className="main-heading service_heading"> Admin pannel ... </div>
                </div>
                <center>
                    <div className="admin_container grid" >

                        {/* First  */}
                        <div className="admin_pannel">
                            <div>
                                <img className="admin_image" src={`/userimages/${user.image}`} alt="User Image" width="300" />
                                <h2> {user.username} </h2>
                                <h2> {user.email} </h2>
                                <h2> <i>+91 {user.phone}</i> </h2>

                                <br />

                                <NavLink className='navlink' to="/logout"><IoMdLogOut className="logout" /></NavLink>
                            </div>
                        </div>

                        {/* Second */}
                        <div className="admin_details">
                            <hr /> <br />
                            <h2> Hello Dear, {user.username} </h2> <br />
                            <p>For admins, our intuitive dashboard provides real-time analytics, inventory management, and customer support tools, ensuring efficient operation and unparalleled control over your e-commerce venture. Harness the power of data-driven insights to optimize sales strategies and enhance customer satisfaction.</p>
                            <br />

                            <div className="card-container grid-links">
                                <NavLink to='/admin/users' >
                                    <div className="card">
                                        <FaUsers className="icons" />
                                        <h2>Users</h2>
                                    </div>
                                </NavLink>

                                <NavLink to='/admin/contacts' >
                                    <div className="card">
                                        <MdContactSupport className="icons" />
                                        <h2>Contacts</h2>
                                    </div>
                                </NavLink>

                                <NavLink to="/admin/products">
                                    <div className="card">
                                        <MdManageHistory className="icons" />
                                        <h2>Manage-Product</h2>
                                    </div>
                                </NavLink>

                                <NavLink to="/addproduct">
                                    <div className="card">
                                        <BiSolidCartAdd className="icons" />
                                        <h2>Add_Products</h2>
                                    </div>
                                </NavLink>
                            </div>


                        </div>

                    </div>
                </center>
            </section>
            <Outlet />
        </>
    )
}

