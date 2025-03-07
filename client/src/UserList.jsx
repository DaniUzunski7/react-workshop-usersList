import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { Search } from "./Search";
import { UserItem } from "./UserItem";
import UserServices from "./services/UserServices";
import { UserCreate } from "./userCreate";
import {UserDetails} from "./UserDetails"
import { UserDelete } from "./UserDelete";
import { NoContent } from "./NoContent";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userIdEdit, setUserIdEdit] = useState(null);
  const [noUsers, setNoUsers] = useState(false);

  useEffect(() => {
    const userData = UserServices.getAll().then((result) => {
      setUsers(result);
    });
  }, []);

  useEffect( () => {

    if(users.length < 1){
        setNoUsers(true)
    } else if (users.length >= 1){
        setNoUsers(false);
    }
    console.log(noUsers);
    
  }, [users])
  
  //Add user
  const addUserClickHandler = () => {
    setShowCreate(true);
  };

  const addUserCloseHandler = () => {
    setShowCreate(false);
    setUserIdEdit(null);
  };

  const saveNewUserHandler = async (e) => {
    e.preventDefault();
        
        const formData = new FormData(e.target.parentElement.parentElement);
        
        const userData = Object.fromEntries(formData.entries());
        
        const newUser = await UserServices.createUser(userData);
        
        setUsers(state => [...state, newUser]);
    

    setShowCreate(false);
  };

  //User details
  const showDetailsClickHandler = (userId) => {
    setUserDetails(userId)
    
    setShowDetails(true);
  }

  const hideDetailsHandler = () => {
    setShowDetails(false);
  }

  //User delete
  const userDeleteHandler = (userId) => {
    setUserDetails(userId);

    setShowDelete(true);
  }

  const hideUserDeleteHandler = () => {
    setShowDelete(false);
  }

  const deleteUserHandler = async () => {
     await UserServices.deleteUser(userDetails)

     setUsers(state => state.filter(user => user._id !== userDetails));

     setShowDelete(false)
  }

  //Edit user
  const showUserEditHandler = (userId) => {
    setUserIdEdit(userId)

    setShowCreate(true);
  }

  const editUserHander = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target.parentElement.parentElement);
    const userData = Object.fromEntries(formData);
    
    const updatedUser = await UserServices.updateUser(userIdEdit, userData);

    setUsers( state => state.map( user => user._id === userIdEdit ? updatedUser : user));

    setUserIdEdit(null);
    setShowCreate(false);
  }

  return (
    <section className="card users-container">
      <Search />

      {showCreate && 
        <UserCreate 
            onClose={addUserCloseHandler} 
            onSave={saveNewUserHandler}
            userId={userDetails}
        />}

        {showDetails && 
            <UserDetails 
               onClose={hideDetailsHandler}
               userId={userDetails}
            />
        }

        {showDelete && 
            <UserDelete 
               onClose={hideUserDeleteHandler}
               onDelete={deleteUserHandler}
            />
        }

        {userIdEdit && 
            <UserCreate
              onClose={addUserCloseHandler}
              userId={userIdEdit}
              onEdit={editUserHander}
        />}

        
      <div className="table-wrapper">
        <div>
          {/* <!-- Overlap components  --> */}

          {/* <!-- <div className="loading-shade"> --> */}
          {/* <!-- Loading spinner  --> */}
          {/* <!-- <div className="spinner"></div> --> */}
          {/* <!--  */}
          {/* No users added yet  --> */}

          {/* <!-- <div className="table-overlap"> */}
          {/* <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="triangle-exclamation"
                className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                ></path>
              </svg>
              <h2>There is no users yet.</h2> */}
          {/* </div> --> */}

         
        </div>

        {noUsers && <NoContent/>}
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>
                First name
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Last name
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Email
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Phone
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>
                Created
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-down"
                  className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                  ></path>
                </svg>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem 
                key={user._id} 
                {...user} 
                onInfoClick={showDetailsClickHandler}
                onDeleteClick={userDeleteHandler}
                onEditClick={showUserEditHandler}
                />
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn-add btn" onClick={addUserClickHandler}>
        Add new user
      </button>

      <Pagination />
    </section>
  );
}
