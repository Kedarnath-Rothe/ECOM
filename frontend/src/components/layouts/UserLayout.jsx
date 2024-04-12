import { IoMdLogOut } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

import { FaUserEdit } from "react-icons/fa";
import { MdManageHistory, MdTrolley } from "react-icons/md";



const UserLayout = () => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <section className="admin_section">
                <div className="conatiner service_head" >
                    <div className="main-heading service_heading"> User DashBoard ... </div>
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
                            <p>For users, explore a virtual marketplace where endless possibilities await. Browse through curated collections, personalized recommendations, and enjoy secure transactions with multiple payment options. Embrace the convenience of shopping from anywhere, anytime, and unlock a world of choice and convenience at your fingertips.</p>
                            <br />

                            <div className="card-container grid-links">
                                <NavLink to={`/user/users/${user._id}/edit`} >
                                    <div className="card">
                                        <FaUserEdit className="icons" />
                                        <h2>Edit Profile</h2>
                                    </div>
                                </NavLink>

                                <NavLink to='/oderhistory' >
                                    <div className="card">
                                        <MdManageHistory className="icons" />
                                        <h2>Orders History</h2>
                                    </div>
                                </NavLink>

                                <NavLink to="/service">
                                    <div className="card">
                                        <MdTrolley className="icons" />
                                        <h2>Buy Products</h2>
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

export default UserLayout;

