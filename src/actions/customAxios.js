import axios from 'axios';

const customAxios = axios.create({
    // baseURL: `https://jello-1.herokuapp.com/api`
    baseURL: `http://localhost:5000`
});

// Step-2: Create request, response & error handlers
const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    //request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwibmFtZSI6IlNhbXBsZSIsImlhdCI6MTUxNjIzODIzfQ.ZEBwz4pWYGqgFJc6DIi7HdTN0z5Pfs4Lcv4ZNwMr1rs';  
    request.headers['x-auth-token'] = localStorage.getItem('token');
    return request;
};

// const responseHandler = response => {
//     if (response.status === 401) {
//         window.location = '/login';
//     }

//     return response;
// };

const errorHandler = error => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);



// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;