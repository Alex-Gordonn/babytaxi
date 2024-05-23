<template>
    <header>
      <nav>
        <a class="logo" ref="#">BabyTaxi</a>
        <ul>
          <li @click="goToUsers"><a><img src="../src/assets/pending_users.png" alt="Pending Users">Users</a></li>
          <li @click="goToCabbies" class="choosed"><a><img src="../src/assets/pending_cabbies.png" alt="Pending Cabbies">Cabbies</a></li>
          <li class="logout" @click="logout"><a>Log Out</a></li>
        </ul>
      </nav>
    </header>
    <div class="body">
    <div class="main_block">
      <h3>Job Applications</h3>
      <div class="block">
        <ul class="filter-bar">
          <li :class="{ active: filter === 'all' }" @click="filter = 'all'"><a>All</a></li>
          <li :class="{ active: filter === 'approved' }" @click="filter = 'approved'"><a>Approved</a></li>
          <li :class="{ active: filter === 'not-considered' }" @click="filter = 'not-considered'"><a>Not considered</a></li>
        </ul>
        <div class="filter-container">
          <input type="text" v-model="searchFullName" placeholder="Search by Full Name" class="search-input">
          <input type="text" v-model="searchPhoneNumber" placeholder="Search by Phone Number" class="search-input">
          <button @click="resetFilters" class="reset-button">Reset</button>
          <button @click="applyFilters" class="search-button">Search</button>
        </div>
        <table class="table_cabbies" v-if="filteredUsers.length">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.full_name }}</td>
              <td>{{ user.phone_number }}</td>
              <td>
                <span :class="{'approved': user.is_active, 'not-considered': !user.is_active}">
                  {{ user.is_active ? 'Approved' : 'Not considered' }}
                </span>
              </td>
              <td>
                <button :class="{'button': true, 'open-button': user.is_active}" @click="openCabbie(user.id)">
                  {{ user.is_active ? 'Open employee' : 'Take to Work' }}
                </button>
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
  import axios from './axios';
  export default {
    data() {
      return {
        users: [],
        filter: 'all',
        searchFullName: '',
        searchPhoneNumber: ''
      }
    },
    computed: {
      filteredUsers() {
        let users = this.users;
  
        if (this.filter === 'approved') {
          users = users.filter(user => user.is_active);
        } else if (this.filter === 'not-considered') {
          users = users.filter(user => !user.is_active);
        }
  
        if (this.searchFullName) {
          users = users.filter(user =>
            user.full_name.toLowerCase().includes(this.searchFullName.toLowerCase())
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
          const response = await axios.get('cabbie/', {
            headers: {
              'Content-type': 'application/json',
            }
          });
          this.users = response.data.filter(user => user.type === 0)
        } catch (error) {
          console.error("error")
        }
      },
      async openCabbie(cabbieId) {
        this.$router.push({ name: 'cabbie', query: { id: cabbieId } });
      },
      resetFilters() {
        this.searchFullName = '';
        this.searchPhoneNumber = '';
        this.filter = 'all';
      },
    }
  }
  </script>
  
  <style>
  .table_cabbies {
    width: 90%;
    border-collapse: collapse;
    margin-left: 60px;
    margin-top: 30px;
  }
  .table_cabbies th, .table_cabbies td {
    border: none;
    padding: 8px;
    text-align: left;
  }
  .table_cabbies th {
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
  </style>
