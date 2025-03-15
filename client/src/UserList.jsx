import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { Search } from "./Search";
import { UserItem } from "./UserItem";
import UserServices from "./services/UserServices";
import { UserCreate } from "./userCreate";
import { UserDetails } from "./userDetails";
import { UserDelete } from "./UserDelete";
import { NoContent } from "./NoContent";
import { LoadingShade } from "./LoadingShade";
import { NoMatch } from "./NoMatch";

export function UserList() {
  const [users, setUsers] = useState([]);
 
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  const [userDetails, setUserDetails] = useState(null);
  const [userIdEdit, setUserIdEdit] = useState(null);
  const [noUsers, setNoUsers] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    const userData = UserServices.getAll()
        .then((result) => {
            setUsers(result)
            setIsLoading(false)
        })
        .catch( (error) => {
            console.log('Error fetching users:', error);
            setIsLoading(false);
            setNoUsers(true)
        })
  }, []);

  useEffect( () => {
    if (users.length < 1){
        setNoUsers(true)
    } else {
        setNoUsers(false)
    }
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

  //Pagination
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersToShow = users.slice(startIndex, endIndex);

  return (
    <section className="card users-container">
      <Search 
        users={users}
        onSearch={setUsers}
        NotMatching={setNoMatch}
      />

      {isLoading && <LoadingShade/>}

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

            {noMatch 
                ? <NoMatch />
                : <table className="table">
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
                  {noUsers
                      ? <NoContent />
                      :  usersToShow.map((user) => (
                          <UserItem key={user._id} {...user} 
                          onInfoClick={showDetailsClickHandler}
                          onDeleteClick={userDeleteHandler}
                          onEditClick={showUserEditHandler} />
                      ))
                  }
                </tbody>
                  </table> 
            }
      </div>

      <button className="btn-add btn" onClick={addUserClickHandler}>
        Add new user
      </button>

      <Pagination 
        totalUsers ={users.length}
        usersPerPage={usersPerPage}
        currPage={currentPage}
        onPageChange={setCurrentPage}
        onLimitChange={setUsersPerPage}
      />
    </section>
  );
}
