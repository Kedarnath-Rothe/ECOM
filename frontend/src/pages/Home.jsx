import { NavLink } from "react-router-dom";

import About from './About';
import Contact from './Contact';

const Home = () => {

    return (
        <>
            <section className="section-home">

                <div className="container grid grid-two-cols">

                    <div className="section-content"> 
                        
                        <div className="content">

                            <h1>Wellcome to Our E-Commerce ...</h1> <br/>
                            <p>Discover a world of convenience with our e-commerce platform, offering a vast array of products from fashion to electronics. Enjoy exclusive deals, seamless shopping experience, and swift doorstep delivery, making online shopping a breeze.</p>
                            <br/>
                            <NavLink to="/register">
                                <img className="register-home" src="/images/register-home.png" alt="Contact Image" />
                            </NavLink> 
                            <br/><br/>
                            <NavLink to="/contact">
                                 <button >Contact</button>
                            </NavLink> 
                            <NavLink to="/service">
                                 <button >Services</button>
                            </NavLink>  

                        </div>

                    </div>

                    <div className="contact-img">
                        <img src="/images/home-image.png" alt="Contact Image" />
                    </div>

                </div>
            </section>
            <About/>
            <br/>
            <br/>
            <br/>
            <Contact/>
        </>
    );
};

export default Home;
