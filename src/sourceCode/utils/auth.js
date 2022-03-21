const token = JSON.parse(localStorage.getItem("jwt"));

const authenticated = token ? true : false;

export { authenticated };
