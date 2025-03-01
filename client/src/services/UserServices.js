const url = 'http://localhost:3030/jsonstore/users';

async function getAll() {
  const response = await fetch(url);
  
  const result = await response.json();

  const users = Object.values(result);
    
  return users;
}

export default {
  getAll,
};
