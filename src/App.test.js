// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import App from './App';
// import Login from './pages/Login'

// const mockSignUp = jest.fn(() => {
//   return Promise.resolve({
//       user: {
//           uid: "fakeuid",
//       },
//   });
// })
// const mockSignIn = jest.fn(() => Promise.resolve({
//   user: {
//       uid: "fakeUid"
//   }
// }))

// const mockGetAuth = jest.fn()

// jest.mock('firebase/auth', () => {
//   const mockGetAuth = jest.fn()
//   return {
    
//       getAuth: () => {mockGetAuth},
//       signInWithEmailAndPassword: () => mockSignIn,
//       createUserWithEmailAndPassword: () => mockSignUp
//   }
// })

// test('renders learn react link', () => {
//   // render(<Login />);
//   // const linkElement = screen.getByText(/learn react/i);
//   const email = 'abc@gmail.com'
//         const password = '123456'
//   const mockSignUp = jest.fn(() => {
//     return Promise.resolve({
//         user: {
//             uid: "fakeuid",
//         },
//     });
//   })
//   const mockSignIn = jest.fn(() => Promise.resolve({
//     user: {
//         uid: "fakeUid"
//     }
//   }))
  
//   const mockGetAuth = jest.fn()
  
//   jest.mock('firebase/auth', () => {
//     return {
//         getAuth: () => mockGetAuth,
//         signInWithEmailAndPassword: () => mockSignIn,
//         createUserWithEmailAndPassword: () => mockSignUp
//     }
//   })
  
//   mockSignIn(mockGetAuth, email, password)
//   expect(mockSignIn).toBeCalledWith(mockGetAuth, email, password)
// });


// // test('renders learn react link', () => {
// //   render(<App />);
// //   const linkElement = screen.getByText(/learn react/i);
// //     expect(linkElement).toBeInTheDocument();
    
// //   });


// import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

