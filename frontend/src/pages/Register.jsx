import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Register = () => {

    const [ user, setUser ] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        image: null, // New state variable for the image file
    })

 
    const navigate = useNavigate();
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // If the input is an image, update the image state
        if (name === "image") {
            value = e.target.files[0];
        }

        setUser({
            ...user,
            [name]: value,
        }) 
    }

    // Handling the form submission
    // const { storeTokenInLS } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("phone", user.phone);
            formData.append("password", user.password);
            formData.append("image", user.image); // Append the image file

            const response = await fetch('https://ecom-back-vert.vercel.app/api/auth/register', {
                method: "POST",
                body: formData,
            });

            console.log(response);

            const responseData = await response.json();
            console.log(responseData.message);

            if (response.ok) {
                toast.success("Registration successful");
                // storeTokenInLS(responseData.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    image: null, // Reset the image field after submission
                });
                console.log(responseData);
                navigate('/');
            } 
            else {
                toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
                console.log("Error inside response");
            }
        } catch (error) {
            console.error("ERROR", error);
        }
    }

    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img className="register_image" src="/images/register.png" alt="Register image" />
                        </div>

                        {/* Tackle registration form */}
                        <div className="registration-form" >
                            <h1 className="main-heading mb-3"> Registration Form </h1> 

                            <div className="form">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        id="username"
                                        required
                                        autoComplete="off" 
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        id="email"
                                        required
                                        autoComplete="off" 
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        placeholder="Phone"
                                        id="phone"
                                        minLength='10'
                                        maxLength='10'
                                        required
                                        autoComplete="off" 
                                        value={user.phone}
                                        onChange={handleInput}
                                    />
                                </div>

                                {/* Add image input field */}
                                <div>
                                    <label htmlFor="image">UserImage</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"  
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        id="password"
                                        required
                                        autoComplete="off" 
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div> 
                                
                                <button type="submit" className="btn btn-submit">
                                    Register Now
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
    )
}

export default Register;