const url = 'http://localhost:3030/jsonstore/users';

async function getAll() {
  const response = await fetch(url);
  
  const result = await response.json();

  const users = Object.values(result);
    
  return users;
}

async function createUser(userData) {

    const payload = {
        ...userData,
        address: {
            country: userData.country,
            city: userData.city,
            street: userData.street,
            streetNumber: userData.streetNumber,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    return result;
}

async function getOne(id){
    
    const response = await fetch(`${url}/${id}`);

    const result = await response.json();
    
    return result;    
}

async function deleteUser(id) {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });

    const result = await response.json();

    return result;
}

async function updateUser(id, newUserData) {
    const oldData = await getOne(id);
    
    const {country, city, street, streetNumber, ...newData} = newUserData;

    newData.address = {country, city, street, streetNumber}
    newData._id = id;
    newData.createdAt = oldData.createdAt;
    newData.updatedAt = new Date().toISOString()

    
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newData)
    });

    const result = await response.json();
    
    return result;
}

export default {
  getAll,
  createUser,
  getOne,
  deleteUser,
  updateUser
};
