// import MockAdapter from 'axios-mock-adapter';
// import axios from "axios";

// const mock = new MockAdapter(axios);

// mock.onPost('/login').reply(config => {
//     const { email, password } = JSON.parse(config.data);
//     if (email === 'quangnt1801' && password === '12345678x@X') {
//         return [200, { message: 'Login success', status: 'Success' }];
//     } else {
//         return [401, { message: 'Email or password failed', status: 'failed' }];
//     }
// });

// export const login = (param: any) => {
//     return new Promise((resolve, reject) => {
//         const email = param.email;
//         const password = param.password;

//         axios.post('/login', { email: email, password: password })
//             .then(response => {
//                 resolve(response.data)
//             })
//             .catch(error => {
//                 resolve(error)
//             });
//     })
// }