import axios from './axios';

const UsersService = {};

UsersService.login = (username, password) => {
    return axios.get(`/user/?username=${username}&password=${password}`);
};

UsersService.register = (username, password, secretCode) => {
    return axios.post('/user', { username, password, secretCode });
};

export default UsersService;
