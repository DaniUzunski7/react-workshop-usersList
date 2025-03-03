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

export default {
  getAll,
  createUser
};
