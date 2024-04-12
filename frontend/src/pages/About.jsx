import { NavLink } from "react-router-dom";

const Home = () => {

    return (
        <>
            <section className="section-home">

                <div className="container grid grid-two-cols">


                    <div className="contact-img">
                        <img src="/images/about.png" alt="Contact Image" />
                    </div>

                    <div className="section-content">

                        <div className="content">

                            <h2 className="about_heading" >About Our Company...</h2> <br />
                            <p>Discover a world of convenience with our e-commerce platform, offering a vast array of products from fashion to electronics. Enjoy exclusive deals, seamless shopping experience, and swift doorstep delivery, making online shopping a breeze.</p>
                             <br/>
                            <h2>Why Choose Us?</h2> 
                            <br/>

                            <p className="about_p">1)Choose us for top-notch quality and outstanding service that is all about you. </p>
                            <p className="about_p">2)We are your reliable partner, dedicated to making your experience exceptional. </p>
                            
                            <br /><br />
                            <NavLink to="/contact">
                                <button >Contact</button>
                            </NavLink>
                            <NavLink to="/service">
                                <button >Services</button>
                            </NavLink>

                        </div>

                    </div>

                </div>
            </section>
        </>
    );
};

export default Home;
