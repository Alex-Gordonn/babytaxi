<template>
    <header>
        <nav>
            <a class="logo"ref="#">BabyTaxi</a>
            <ul>
                <li @click="goToUsers"><a><img src="../src/assets/pending_users.png" alt="Pending Users">Users</a></li>
                <li @click="goToCabbies" class="choosed"><a><img src="../src/assets/pending_cabbies.png" alt="Pending Cabbies">Cabbies</a></li>
                <li class="logout" @click="logout"><a>Log Out</a></li>
            </ul>
        </nav>

        <p><b>Full Name: </b>{{ users.full_name }}</p>
        <p><b>Phone Number: </b>{{ users.phone_number }}</p>
        <p><b>Car model: </b>{{ users.extra_info.car_model }}</p>
        <p><b>Car Number: </b>{{ users.extra_info.car_number }}</p>
        <p><b>Transportation License: </b>{{ users.extra_info.transportation_license }}</p>
        <p><b>Identification Card: </b>{{ users.extra_info.identification_card }}</p>
        <p><b>Criminal record certificate: </b>{{ users.extra_info.criminal_record_certificate }}</p>
        <p><b>Drug dispensary certificate: </b>{{ users.extra_info.drug_dispensary_certificate }}</p>
        <p><b>Psychiatric clinic certificate: </b>{{ users.extra_info.psychiatric_clinic_certificate }}</p>

        <button>Take To Work</button>
        <button>Refuse</button>

    </header>


</template>

<script>
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
        goToUsers() {
            this.$router.push({ name: 'users' });
        },
        async logout() {
            this.$root.logout();
            localStorage.removeItem('authToken');
            this.$router.push('/');
        },
        async fetchUsers() {
            const cabbieId = this.$route.query.id;
            try {
                const response = await axios.get(`cabbie/${cabbieId}`, {
                    Headers: {
                        'Content-type': 'appliction/json',
                    }});
                    this.users = response.data
            }catch(error) {
                console.error("error")
            }
        },
        async openCabbie(cabbieId) {
            this.$router.push({ name: 'cabbie', query: { id: cabbieId } });
        },
        }
}
</script>

<style>
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
    margin-left: 20px
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