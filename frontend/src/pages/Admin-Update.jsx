import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

 

const AdminUpdate = () => {

    const [data, setData] = useState({
        username : "",
        email : "",
        phone : "", 
    }) 

    const params = useParams();
    console.log(params);

    const { user, isLoading, authorizationToken } = useAuth();

    //get singleUserData
    const navigate = useNavigate();
    const getSingleUserData = async() => {
        try{
            const response = await fetch(`http://localhost:8080/api/admin/users/${params.id}`,{
                method : "GET",
                headers : {
                    Authorization : authorizationToken,
                }
            })

            const data = await response.json();
            setData(data);
        }
        catch(error){
            console.log(error.message);
        }   
    }
    
    useEffect(() => {
        getSingleUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name] : value,
        })
    }

    //
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch(`http://localhost:8080/api/admin/users/update/${params.id}`,{
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : authorizationToken
                },
                body : JSON.stringify(data),
            })

            if(response.ok){
                toast.success("Updated Successfully...");
                navigate('/admin');
            }
            else{
                toast.error("Not Updated...");
            }

        }
        catch(error){
            console.log(error.message);
        }
    }

    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    return (
        <>
            <section className="section-contact" >
                <div className="contact-content container" >
                    <h1 className="main-heading" > Update User Data </h1>
                </div>

                <div className="container grid grid-two-cols" >

                    <section>
                        <img className="car-update"  width="500" src="/images/edit_user.png" alt="Register image" />
                    </section>

                    <section className="section-form" >
                        <form onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="username" > username </label>
                                <input
                                    type="text"
                                    name= "username"
                                    id="username"
                                    autoComplete="off"
                                    value={data.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" > email </label>
                                <input
                                    type="email"
                                    name= "email"
                                    id="email"
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" > phone </label>
                                <input
                                    type="number"
                                    name= "phone"
                                    maxLength='10'
                                    minLength='10'
                                    id="phone"
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div> 

                            <div>
                                <button type="submit" > Update </button>
                            </div>

                        </form>
                    </section> 
                </div>
            </section>
        </>
    )

}

export default AdminUpdate;