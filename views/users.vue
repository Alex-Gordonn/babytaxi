<template>
<header>
    <nav>
        <a class="logo"ref="#">BabyTaxi</a>
        <ul>
            <li @click="goToUsers" class="choosed"><a><img src="../src/assets/pending_users.png" alt="Pending Users">Users</a></li>
            <li @click="goToCabbies"><a><img src="../src/assets/pending_cabbies.png" alt="Pending Cabbies">Cabbies</a></li>
            <li class="logout" @click="logout"><a>Log Out</a></li>
        </ul>
    </nav>
</header>


    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Is Active</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.phone_number }}</td>
                <td>{{ user.email }}</td>
                <td>{{ formatDateString(user.last_login) }}</td>
                <td>{{ user.is_active }}</td>
                <td>
                    <button @click="activateUser(user.id)" v-if="!user.is_active">Activate</button>
                    <button @click="deactivateUser(user.id)" v-if="user.is_active">Deactivate</button>
                </td>            
            </tr>
        </tbody>
    </table>
</template>

<script>
//chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials

import axios from './axios';

export default {
    data() {
        return {
            users: [],
        }
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        goToCabbies() {
            this.$router.push({ name: 'cabbies' });
        },
        async logout() {
            this.$root.logout();
            localStorage.removeItem('authToken');
            this.$router.push('/');
        },
        async fetchUsers() {
            try {
                const response = await axios.get('users/', {
                    Headers: {
                        'Content-type': 'appliction/json',
                    }});
                    this.users = response.data.filter(user => user.type === 1 && !user.is_superuser);
            }catch(error) {
                console.error("error")
            }
        },
        async openCabby(cabbyId) {
            this.$router.push({ name: 'user_info', query: { id: cabbyId } });
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
    formatDateString(dateString) {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');

                return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
}
}
</script>

<style>
 table {
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-top: 20px;
}

td, th {
  border: 1px solid #dee2e6;
  text-align: left;
  padding: 12px;
}

th {
  background-color: #f8f9fa;
  color: #343a40;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
button {
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  font-size: medium;
  padding-bottom:10px;
  border-radius: 5px;
  background-color: #333;
  color: white;
}
button:hover {
  background-color: #555;
}
header nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-grow: 1; /* Позволяет списку расширяться и занимать доступное пространство */
}

nav li {
    margin-right: 20px; /* Отступ между элементами */
}

nav li:last-child {
    margin-right: 0; /* Убираем отступ с последнего элемента */
}

nav a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

nav a img {
    margin-right: 10px; /* Отступ между иконкой и текстом */
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
    border-bottom: 2px solid #27AE60; /* Выделение активной вкладки */
}

.logout {
    margin-left: auto; /* Автоматический отступ слева, выравнивает элемент по правому краю */
}

</style>