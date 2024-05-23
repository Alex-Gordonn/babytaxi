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
      <div class="container">
      <div class="details">
      <h3>Take to work</h3>
        <table class="table_cabbie">
            <tr>
                <td><strong>Full Name</strong></td>
                <td>{{ user.full_name }}</td>
            </tr>
            <tr>
                <td><strong>Phone Number</strong></td>
                <td>{{ user.phone_number }}</td>
            </tr>
            <tr>
                <td><strong>Car model</strong></td>
                <td>{{ user.extra_info.car_model }}</td>
            </tr>
            <tr>
                <td><strong>Car Number</strong></td>
                <td>{{ user.extra_info.car_number }}</td>
            </tr>
            <tr>
                <td><strong>Documents</strong></td>
                <td>
                    <img class="attachment"src="../src/assets/icon-attachment.png" alt=""><a :href="user.extra_info.transportation_license" target="_blank">Transportation License</a><br>
                    <img class="attachment"src="../src/assets/icon-attachment.png" alt=""><a :href="user.extra_info.identification_card" target="_blank">Identification Card</a><br>
                    <img class="attachment"src="../src/assets/icon-attachment.png" alt=""><a :href="user.extra_info.criminal_record_certificate" target="_blank">Criminal Record Certificate</a><br>
                    <img class="attachment"src="../src/assets/icon-attachment.png" alt=""><a :href="user.extra_info.drug_dispensary_certificate" target="_blank">Drug Dispensary Certificate</a><br>
                    <img class="attachment"src="../src/assets/icon-attachment.png" alt=""><a :href="user.extra_info.drug_dispensary_certificate" target="_blank">Drug Dispensary Certificate</a>
            </td>
            </tr>
        </table>
        

  
        <div class="buttons">
            <button @click="goToCabbies" class="back-button">Назад</button>
          <button @click="approveUser" class="approve-button">Одобрить</button>
          <button @click="goToCabbies" class="reject-button">Отказать</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from './axios';
  export default {
    data() {
      return {
        user: {
          full_name: '',
          phone_number: '',
          extra_info: {
            car_model: '',
            car_number: '',
            transportation_license: '',
            identification_card: '',
            criminal_record_certificate: '',
            drug_dispensary_certificate: '',
            psychiatric_clinic_certificate: ''
          }
        }
      }
    },
    created() {
      this.fetchUserDetails();
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
      async fetchUserDetails() {
        const cabbieId = this.$route.query.id;
        try {
          const response = await axios.get(`cabbie/${cabbieId}`, {
            headers: {
              'Content-type': 'application/json',
            }
          });
          this.user = response.data;
        } catch (error) {
          console.error("error fetching user details");
        }
      },
      async approveUser() {
        const cabbieId = this.$route.query.id;
        const formData = new FormData();
        formData.append('is_active', 'true');
        try {
            const response = await axios.patch(`cabbie/${cabbieId}/`, formData, {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          });
          alert('User approved successfully');
          this.$router.push({ name: 'cabbies' });
        } catch (error) {
          console.error("error approving user");
        }
      },
    }
  }
  </script>
  
  <style>
  .table_cabbie {
    width: 90%;
    border-collapse: collapse;
    margin-top: 30px;
  }
  .table_cabbie th,.table_cabbie td {
    border: none;
    padding: 8px;
    text-align: left;
    border-bottom: 2px solid #f2f2f2;
  }
  .table_cabbie th {
    background-color: #f2f2f2;
  }
  .table_cabbie a {
    text-decoration: none;
  }
  .attachment {
    width: 16px;
    width: 16px;
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
    border-bottom: 2px solid #FFB800; /* Выделение активной вкладки */
  }
  .logout {
    margin-left: auto; /* Автоматический отступ слева, выравнивает элемент по правому краю */
  }
  .details {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .details h3 {
    margin-bottom: 20px;
  }
  .info-block {
    margin-bottom: 20px;
  }
  .details p, .details h4 {
    margin: 10px 0;
  }
  .documents-list {
    list-style: none;
    padding: 0;
  }
  .documents-list li {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  .documents-list li a {
    margin-right: 10px;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .approve-button, .reject-button, .back-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .approve-button {
    background-color: #27AE60;
    color: white;
  }
  .reject-button {
    background-color: #FF6B6B;
    color: white;
  }
  .back-button {
    background-color: #ccc;
    color: white;
  }
  .table.cabbie {
    text-align: left;
  }
  </style>
  