import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";
 
const Login = () => {

    const [ user, setUser ] = useState({ 
        email : "", 
        password : "",
    })

    // Handling the input value
    const handleInput = (e) => {                 //e --> event
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,                       //username : "kedar", email : "-----"
        })
    }

    // Handling the form submission
    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate(); 
    const handleSubmit = async(e) =>{
        e.preventDefault(); 
        console.log(user);

        try{
            const response = await fetch('https://ecom-back-vert.vercel.app/api/auth/login', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(user),
            })

            console.log(response);
            
            const res_data = await response.json();

            if(response.ok){
                toast.success("LOGIN SUCCESSFUL");

                storeTokenInLS(res_data.token);
                setUser({email : "", password : ""});

                navigate('/');
                window.location.reload();
            }
            else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("INVALID CREDENTIALS");
                setUser({email : "", password : ""});
            }


        }
        catch(error){
            console.error(error);
        }
    }

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/register.png" width="500" height="500" alt="Login image"  />
                        </div>

                        {/* Tackel registration form */}
                        <div className="registration-form" >
                            <h1 className="main-heading mb-3" > Login Form </h1>
                            <br/>

                            <form onSubmit={handleSubmit} > 

                                <div>
                                    <label htmlFor="email" >email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="enter your email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email} 
                                        onChange={handleInput}
                                    />
                                </div> 

                                <div>
                                    <label htmlFor="password" >password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div>

                                <br/>
                                <button type="submit" className="btn btn-submit" >
                                 Login 
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
}

export default Login;