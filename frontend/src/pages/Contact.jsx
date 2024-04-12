import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "", 
    });

    const [userData, setUserData] = useState(true);
    const { user } = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "", 
        });

        setUserData(false);
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

    

    // const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/api/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
    
            if (response.ok) {
                setContact({
                    ...contact,
                    message: "",
                });
    
                toast.success("Message sent successfully");
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
            toast.error("An error occurred");
        }
    };
     

    return (
        <>
            <section className="section-contact">

                <center><p className="car_provider" >If you have any query then Contact us...</p></center>

                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/images/contact.png" alt="Contact Image" />
                    </div>

                    <div className="section-form">

                        <h1 className="main-heading">Contact Us</h1>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                    required
                                    cols="30"
                                    rows="2"
                                ></textarea>
                            </div> 

                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Your map section */}
            </section>
        </>
    );
};

export default Contact;
