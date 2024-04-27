<template>
    <h1>Baby Taxi</h1>

    <h2>Cabby info</h2>

    <p><b>Car model:</b> {{ cabby.car_model }}</p>
    <p><b>Car Numve: </b>{{ cabby.car_number }}</p>
</template>

<script>
import axios from './axios';
export default {
    data() {
        return {
            cabby: null,
        }
    },
    created() {
        this.fetchCabby();
    },
    methods: {
        async fetchCabby() {
            const cabbyId = this.$route.query.id;
            try {
                const response = await axios.get(`extra-info-cabbie/${cabbyId}/`, {
                    Headers: {
                        'Content-type': 'appliction/json',
                    }});
                    this.cabby = response.data
            }catch(error) {
                console.error("error")
            }
        }
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
</style>