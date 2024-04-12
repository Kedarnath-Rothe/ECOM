import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

import { Link, Navigate } from 'react-router-dom';

 const AdminUsers = () => {

  const[users, setUsers] = useState([]);

  const { user, authorizationToken } = useAuth();

  const getAllUsersData = async() => {
    try{
      const response = await fetch("http://localhost:8080/api/admin/users", {
        method : "GET",
        headers : {
          Authorization : authorizationToken,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      // console.log(data);
      setUsers(data);

    }
    catch(error){
      console.log(error.message);
      toast.error("Failed to fetch user data. Please try again later.");
    }
  }

  //Delete the use on delete button
  const deleteUser = async(id) => {
    try{
      const response = await fetch(`http://localhost:8080/api/admin/users/delete/${id}`, {
        method : "DELETE",
        headers : {
          Authorization : authorizationToken,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();
      console.log(data);
      
      if(response.ok){
        getAllUsersData();
        toast.success("User Deleted Successfully...")
      }
    }
    catch(error){
      console.log(error.message);
      toast.error("Failed to delete user....");
    }
  }

  useEffect(() => {
    getAllUsersData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationToken])

  if (!user.isAdmin) {
    return <Navigate to="/userhome" />
  }


  return (
    <>
     <section className="admin-users-section">
      <div className="container">
        <h1 style={{margin:"auto"}}>Update Users</h1>
      </div>
      <div className="container admin-users">
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th> 
                <th>Update</th>
                <th>Dalete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((curUser) => 
                  ( 
                    !curUser.isAdmin && (
                      <tr key={curUser._id}>
                        <td>{ curUser.username }</td>
                        <td>{ curUser.email }</td>
                        <td>{ curUser.phone }</td> 
                        <td className="edit" ><button><Link className="edit2" to = {`/admin/user/${curUser._id}/edit`}>Edit</Link></button></td>
                        <td className="delete" > <button onClick={() => deleteUser(curUser._id) }>Delete</button> </td>
                      </tr>
                    ) 
                  )
                )
              }
            </tbody>
        </table>
      </div>
     </section>
    </>
  )
}

export default AdminUsers
