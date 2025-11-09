import axios from 'axios';

const refs = {
  fetchBtn: document.querySelector('.btn'),
  usersList: document.querySelector('.user-list'),
};

const LOCALE_STORAGE_KEY = 'fetchUsers';

// refs.fetchBtn.addEventListener('click', fetchUsers);

// function fetchUsers() {
//   fetch('https://jsonplaceholder.typicode.com/users?_limit=5&_sort=name')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(users => {
//       console.log(users);

//       const markup = users
//         .map(user => {
//           return `<li>
// 	          <p><b>User ID</b>: ${user.id}</p>
// 	          <p><b>Name</b>: ${user.name}</p>
// 	          <p><b>Email</b>: ${user.email}</p>
// 	          <p><b>Phone</b>: ${user.phone}</p>
// 	          <p><b>Company</b>: ${user.company.name}</p>
// 	        </li>`;
//         })
//         .join('');

//       refs.usersList.innerHTML = markup;

//       localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(users));
//       return users;
//     })
//     .catch(error => console.log(error));
// }

axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  })
  .catch(error => {
    console.log(error);
  });
