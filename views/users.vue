<template>
    <header>
      <nav>
        <a class="logo" ref="#">BabyTaxi</a>
        <ul>
          <li @click="goToUsers" class="choosed"><a><img src="../src/assets/pending_users.png" alt="Pending Users">Users</a></li>
          <li @click="goToCabbies" ><a><img src="../src/assets/pending_cabbies.png" alt="Pending Cabbies">Cabbies</a></li>
          <li class="logout" @click="logout"><a>Log Out</a></li>
        </ul>
      </nav>
    </header>
    <div class="body">
    <div class="main_block">
      <h3>Users</h3>
      <div class="block">
        <div class="filter-container">
          <input type="text" v-model="searchFirstName" placeholder="Search by First Name" class="search-input">
          <input type="text" v-model="searchLastName" placeholder="Search by Last Name" class="search-input">
          <input type="text" v-model="searchPhoneNumber" placeholder="Search by Phone Number" class="search-input">
          <button @click="resetFilters" class="reset-button">Reset</button>
          <button @click="applyFilters" class="search-button">Search</button>
        </div>
        <table class="table_user" v-if="filteredUsers.length">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.phone_number }}</td>
              <td>{{ user.is_active }}</td>
              <td>
                    <button @click="activateUser(user.id)" v-if="!user.is_active">Activate</button>
                    <button @click="deactivateUser(user.id)" v-if="user.is_active">Deactivate</button>
                </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="no-results">
          <p>Ничего не найдено</p>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  //chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials
  import axios from './axios';
  export default {
    data() {
      return {
        users: [],
        filter: 'all',
        searchFirstName: '',
        searchLastName: '',
        searchPhoneNumber: ''
      }
    },
    computed: {
      filteredUsers() {
        let users = this.users;

  
        if (this.searchFirstName) {
          users = users.filter(user =>
            user.first_name.toLowerCase().includes(this.searchFirstName.toLowerCase())
          );
        }
        if (this.searchLastName) {
          users = users.filter(user =>
            user.last_name.toLowerCase().includes(this.searchLastName.toLowerCase())
          );
        }
  
        if (this.searchPhoneNumber) {
          users = users.filter(user =>
            user.phone_number.includes(this.searchPhoneNumber)
          );
        }
  
        return users;
      }
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      goToCabbies() {
        this.$router.push({ name: 'cabbies' });
      },
      goToUsers() {
        this.$router.push({ name: 'users' });
      },
      async logout() {
        this.$root.logout();
        localStorage.removeItem('authToken');
        this.$router.push('/');
      },
      async fetchUsers() {
        try {
          const response = await axios.get('users/', {
            headers: {
              'Content-type': 'application/json',
            }
          });
          this.users = response.data.filter(user => user.type === 1 && !user.is_superuser);
        } catch (error) {
          console.error("error")
        }
      },
      resetFilters() {
        this.searchFirstName = '';
        this.searchLastName = '';
        this.searchPhoneNumber = '';
        this.filter = 'all';
      },
      async activateUser(userId) {
        try {
            const response = await axios.put(`https://baby-taxi.xyz/api/cabbie/is-active/`, null, {
                params: {
                    user_id: userId,
                    is_active: true
                }
            });
            this.fetchUsers();
        } catch (error) {
            console.error("error activating user", error);
        }
    },
    async deactivateUser(userId) {
        try {
            const response = await axios.put(`https://baby-taxi.xyz/api/cabbie/is-active/`, null, {
                params: {
                    user_id: userId,
                    is_active: false
                }
            });
            this.fetchUsers();
        } catch (error) {
            console.error("error deactivating user", error);
        }
    },
    }
  }
  </script>
  
  <style>
  .table_user {
    width: 90%;
    border-collapse: collapse;
    margin-left: 60px;
    margin-top: 30px;
  }
  .table_user th, .table_user td {
    border: none;
    padding: 8px;
    text-align: left;
  }
  .table_user th {
    background-color: #f2f2f2;
  }
  .orange-text {
    color: orange;
  }
  .button {
    background-color: white;
    color: #27AE60;
    padding: 5px 10px;
    text-align: center;
    border: 1px solid #27AE60;
    border-radius: 5px;
    cursor: pointer;
    width: 150px;
  }
  .button:hover {
    background-color: #27AE60;
    color: white;
  }
  .open-button {
    background-color: white;
    color: #FFB800;
    border: 1px solid #FFB800;
  }
  .open-button:hover {
    background-color: #FFB800;
    color: white;
  }
  header nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-grow: 1;
  }
  nav li {
    margin-left: 20px
  }
  nav li:last-child {
    margin-right: 0;
  }
  nav a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  nav a img {
    margin-right: 10px;
  }
  .logo {
    color: #FFB800;
    font-size: 20px;
    margin-right: 20px;
  }
  a img {
    width: 24px;
    height: 24px;
  }
  .choosed {
    border-bottom: 2px solid #FFB800;
  }
  .logout {
    margin-left: auto;
    cursor: pointer;
  }
  .body {
    background-color: #F0F1F3;
    padding-top: 20px;
  }
  .block {
    background-color: white;
    width: 90%;
    margin-left: 60px;
    padding-top: 20px;
    padding-bottom: 10px;
    border-radius: 10px;
  }
  .approved {
    background-color: #27AE60;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
  }
  .not-considered {
    background-color: #FF6B6B;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
  }
  .main_block h3 {
    margin-left: 60px;
    margin-bottom: 20px;
  }
  .main_block {
    height: 100vh;
  }
  .filter-bar {
    display: flex;
    justify-content: space-around;
    margin-left: 60px;
    margin-right: 60px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f2f2f2;
  }
  .filter-bar li {
    list-style: none;
    cursor: pointer;
  }
  .filter-bar li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  .filter-bar li.active a {
    color: #FFB800;
  }
  .filter-bar li.active::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #FFB800;
    margin-top: 5px;
  }
  .filter-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 60px;
    margin-right: 60px;
    margin-bottom: 20px;
  }
  .search-input {
    width: 30%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .reset-button, .search-button {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .reset-button {
    background-color: #ccc;
    color: white;
  }
  .search-button {
    background-color: #27AE60;
    color: white;
  }
  .no-results {
    text-align: center;
    color: #FF6B6B;
    font-size: 1.2em;
    margin-top: 20px;
  }
  .table_user button {
    padding: 8px;
    border: none;
    background-color: #F67272;
    color: white;
    border-radius: 8px;
  }
  </style>
