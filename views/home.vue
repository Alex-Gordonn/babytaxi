<template>
  <!--Nav bar-->
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand logo_a" href="#">
        <img class="logo" src="..\src\assets\logo_2.png" alt="" width="146.65px" height="46.37px">
        <a class="text" href="">BabyTaxi</a>
      </a>
      <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" ref="offcanvasMenu" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header text-white border-bottom">
          <a class="navbar-brand fs-20" href="#"><img class="logo" src="../src/assets/img/logo.png" alt="" width="146.65px" height="46.37px"></a>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body nav_links">
          <ul class="navbar-nav justify-content-center flex-grow-1 pe-3 ul_nav">
            <li class="nav-item" v-for="section in sections" :key="section.id">
              <a :href="'#' + section.id" class="nav-link" :class="{ active: currentSection === section.id }" @click="closeOffcanvas">{{ section.title }}</a>
            </li>
            <li>
              <button @click="goToLogin()" class="button_home">Sign in</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <!--Nav bar-->
  <div class="container welcome_block" id="welcome">
    <div class="row">
      <div class="col">
        <div class="row welcome_to">
          <div class="col-6">
            <h1>Welcome to <span class="baby_taxi">BabyTaxi</span></h1>
          </div>
          <div class="col-6">
            <img src="../src/assets/big_logo.png" alt="">
          </div>
        </div>
        <p>Safety and comfort of your children is our concern</p>
        <h2>Download app now!</h2>
        <div class="store">
          <img src="../src/assets/googleplay.png" alt="">
          <img src="../src/assets/appstore.png" alt="">
        </div>
      </div>
      <div class="col">
        <img src="../src/assets/taxi_phone.png" alt="">
      </div>
    </div>
  </div>
  <div id="babyTaxiApp" class="container how_works">
    <div class="row">
      <div class="col application">
        <img src="../src/assets/application.png" alt="">
      </div>
      <div class="col parts">
        <h1>How BabyTaxi <span class="baby_taxi">App</span> works?</h1>
        <div class="parts_next">
          <h2>{{ steps[currentStep].title }}</h2>
          <p>{{ steps[currentStep].content }}</p>
        </div>
        <div class="left_right">
        <button @click="prevStep"><img src="../src/assets/left.png" alt=""></button>
        <button @click="nextStep"><img src="../src/assets/right.png" alt=""></button>
        </div>
      </div>
    </div>
  </div>
  <div id="transfers" class="regular_trips">
    <div class="container">
      <div class="row">
        <div class="col">
          <img src="../src/assets/regular_trips_img.png" alt="">
        </div>
        <div class="col">
          <h1>BabyTaxi <span class="baby_taxi">Regular Trips</span> Transfer</h1>
          <p>The ability to save and assign regular routes, making planning easier and ensuring reliability in transporting children</p>
        </div>
      </div>
    </div>
  </div>
  <div id="our_fleet" class="container our_fleet">
    <div class="row">
      <div class="fleet_text col-4">
        <h2>BabyTaxi</h2>
        <h1>OUR FLEET</h1>
        <h3 :class="{ selected: currentFleetKey === 'standard' }" @click="selectFleet('standard')">{{ fleets.standard.title }}</h3>
        <p v-if="currentFleetKey === 'standard'">{{ fleets.standard.description }}</p>

        <h3 :class="{ selected: currentFleetKey === 'lux' }" @click="selectFleet('lux')">{{ fleets.lux.title }}</h3>
        <p v-if="currentFleetKey === 'lux'">{{ fleets.lux.description }}</p>

        <h3 :class="{ selected: currentFleetKey === 'child' }" @click="selectFleet('child')">{{ fleets.child.title }}</h3>
        <p v-if="currentFleetKey === 'child'">{{ fleets.child.description }}</p>
      </div>
      <div class="status col-8">
        <img class="fleet_img" src="../src/assets/fleet_img.png" alt="">
        <div class="row">
          <div class="col-4">
            <img class="cars" :src="fleets.standard.img" alt="" @click="selectFleet('standard')">
            <h2 :class="{ selected: currentFleetKey === 'standard' }">Standard</h2>
          </div>
          <div class="col-4">
            <img class="cars" :src="fleets.lux.img" alt="" @click="selectFleet('lux')">
            <h2 :class="{ selected: currentFleetKey === 'lux' }">Lux</h2>
          </div>
          <div class="col-4">
            <img class="cars" :src="fleets.child.img" alt="" @click="selectFleet('child')">
            <h2 :class="{ selected: currentFleetKey === 'child' }">Childish</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="manage_booking" class="container book_taxi">
    <div class="row">
      <div class="col-8">
        <img src="../src/assets/book_taxi.png" alt="">
      </div>
      <div class="col-4">
        <h1>Book Your <span class="baby_taxi">First</span> Taxi</h1>
        <h3>Your Email</h3>
        <input type="text" placeholder="example@gmail.com">
        <h3>Your telephone number</h3>
        <input type="text" placeholder="+7 (XXX) XX XX"><br>
        <button class="back">Back</button><button class="order">Order a Taxi</button>
      </div>
    </div>
  </div>
  <div id="contact_us" class="get">
    <div class="row">
      <div class="col-8">
        <div class="address">
          <h2>BabyTaxi</h2>
          <h1>HEADQUARTERS</h1>
          <h3>Manas street 34/1, Almaty 050000</h3>
        </div>
        <iframe src="https://yandex.com/map-widget/v1/?um=constructor%3A67ed894b2f520e4400977f7e4d19884187b4f293edc473ec0ca1c0ecd3ed9a4a&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
      </div>
      <div class="get_in_touch col-4">
        <h2>Get in touch</h2>
        <h5>We would love to hear from you</h5>
        <input type="text" placeholder="Enter your Name"><br>
        <input type="text" placeholder="Enter your email"><br>
        <textarea name="" placeholder="Enter your message"></textarea><br>
        <div class="buttons">
          <button class="cancel">Cancel</button><button class="send">Send</button>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="row">
      <div class="info_foot col-3">
        <h3>BabyTaxi</h3>
        <h4>Company</h4>
        <p>About Us | Careers | FAQ</p>
        <h4>Download app now!</h4>
      </div>
      <div class="contacts col-9">
        <h4>Contact Info</h4>
        <div class="row">
          <div class="col-3">
            <p>+7 (776) 007 2444</p>
            <h6>zadagerei0405@gmail.com</h6>
          </div>
          <div class="col-3">
            <p>+7 (776) 007 2444</p>
            <h6>zadagerei0405@gmail.com</h6>
          </div>
          <div class="col-3">
            <p>+7 (776) 007 2444</p>
            <h6>zadagerei0405@gmail.com</h6>
          </div>
          <div class="col-3">
            <p>+7 (776) 007 2444</p>
            <h6>zadagerei0405@gmail.com</h6>
          </div>
        </div>
        <p class="last_address">Manas street 34/1, Almaty 050000</p>
      </div>
    </div>
    <hr>
    <p class="last_text">BabyTaxi All Right Reserved, 2024</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSection: '',
      sections: [
        { id: 'welcome', title: 'Welcome' },
        { id: 'babyTaxiApp', title: 'BabyTaxi App' },
        { id: 'transfers', title: 'Transfers' },
        { id: 'our_fleet', title: 'Our Fleet' },
        { id: 'manage_booking', title: 'Manage Booking' },
        { id: 'contact_us', title: 'Contact Us' },
      ],
      currentStep: 0,
      steps: [
        {
          title: "1. Booking and Order Processing",
          content: "Users book a trip with specified details, including departure, destination, and any additional requirements like child seats, processed by the system for driver and vehicle availability."
        },
        {
          title: "2. Driver Assignment and Navigation",
          content: "The system automatically assigns the nearest suitable driver and provides navigation assistance for an optimized route considering real-time traffic."
        },
        {
          title: "3. Safe Ride and Feedback",
          content: "Drivers ensure a safe and comfortable ride, while the system collects feedback from users to improve service quality in the future."
        }
      ],
      currentFleetKey: 'standard',
      fleets: {
        standard: {
          title: "Standard",
          description: "Cars are comfortable and safe. They are suitable for visiting school, studying or visiting. The price of this tariff is usually the most affordable.",
          img: '../src/assets/standard.png'
        },
        lux: {
          title: "Lux",
          description: "Offers special comfort and luxury. Cars in this class are more spacious, with soft seats and additional amenities such as Wi-Fi and drinks. It may be suitable for special occasions.",
          img: '../src/assets/lux.png'
        },
        child: {
          title: "Childish",
          description: "This fare is designed specifically for the youngest passengers - children under 3 years old. Cars in this class are equipped with child seats and other safety devices to ensure maximum protection for your baby during the trip.",
          img: '../src/assets/child.png'
        }
      },
      currentFleet: {
        title: "Standard",
        description: "Cars are comfortable and safe. They are suitable for visiting school, studying or visiting. The price of this tariff is usually the most affordable."
      }
    };
  },
  methods: {
    handleScroll() {
      const sections = this.sections.map(section => document.getElementById(section.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top + window.scrollY <= scrollPosition && rect.bottom + window.scrollY >= scrollPosition) {
          this.currentSection = section.id;
          break;
        }
      }
    },
    closeOffcanvas() {
      this.$refs.offcanvasMenu.classList.remove('show');
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    selectFleet(fleetKey) {
      this.currentFleetKey = fleetKey;
    },
    goToLogin() {
            this.$router.push({ name: 'login' });
        },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
body {
  background-color: white;
}
  .navbar {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1000;
  }
  .navbar-nav .nav-link.active {
    border-bottom: solid 2px #FFB800;
  }
  .logo {
    width: 61px;
    height: 67px;
  }
  .button_home {
    background-color: #FFB800;
    border: none;
    border-radius: 25px;
    padding-right: 20px;
    padding-left: 20px;
    margin-top: 10px;
  }
  .text {
    color: #ffb800;
    font-weight: bold;
    font-size: 30px;
  }
  .logo_a {
    margin: 0px;
  }
  .nav_links a {
    color: black;
    font-weight: bold;
  }
  .welcome_block img{
    width: 620px;
    height: 450px;
  }
  .welcome_block {
    margin-top: 50px;
  }
  .welcome_to img {
    width: 180px;
    height: 200px;
  }
  .welcome_to h1 {
    padding: 0px;
    margin-top: 60px;
    font-size: 40px;
  }
  .baby_taxi {
    color: #FFB800;
  }
  .welcome_block p {
    color: #8A8A8A;
    font-size: 18px;
  }
  .store img {
    width: 160px;
    height: 52px;
    margin-right: 15px;
  }
  .how_works img{
    width: 375px;
    height: 810px;
  }
  .how_works {
    margin-top: 50px;
  }
  .application {
    text-align: center;
  }
  .parts {
    text-align: left;
    padding-top: 150px;
  }
  .parts h1 {
    padding-right: 130px;
    font-size: 50px;
    margin-bottom: 20px;
  }
  .parts h2 {
    padding-right: 80px;
    color: #8A8A8A;
  }
  .parts p {
    padding-right: 50px;
    color: #8A8A8A;
  }
  .parts button {
    background-color: #FFB800;
    border: none;
    margin-right: 20px;
    font-size: larger;
    border-radius: 0px;
    color: black;
  }
  .regular_trips {
    background-color: #FDF8EE;
    padding-top: 60px;
    padding-bottom: 50px;
  }
  .regular_trips img {
    width: 620px;
    height: 370px;
  }
  .regular_trips h1{
    padding-right: 70px;
    margin-top: 40px;
    font-size: 50px;
  }
  .regular_trips p {
    color: #8A8A8A;
    font-size: 25px;
  }
  .fleet_text {
    background-color: #3E4958;
    margin-top: 30px;
    border-radius: 15px;
    color: white;
    padding-top: 80px;
    padding-left: 35px;
    padding-bottom: 50px;
  }
  .fleet_text h1 {
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .fleet_img{
    width: 630px;
    height: 265px;
  }
  .status{
    text-align: center;
  }
  .cars {
    width: 225px;
    height: 150px;
  }
  .our_fleet {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .book_taxi {
    margin-top: 100px;
    margin-bottom: 40px;
  }
  .book_taxi img {
    width: 800px;
    height: 400px;
  }
  .book_taxi input {
    background-color: #F5F5F5;
    border: none;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .book_taxi h1 {
    margin-top: 40px;
    padding-right: 200px;
  }
  .back {
    background-color: #B5B5B5;
    border: none;
    margin-right: 20px;
    padding: 8px;
    width: 100px;
    color: white;

  }
  .order {
    background-color: #FFB800;
    border: none;
    width: 100px;
    padding: 8px;
    color: white;
  }
  .get {
    margin-top: 100px;
  }
  .get_in_touch {
    background-color: #FFB800;
    padding-top: 50px;
    padding-left: 30px;
  }
  .get_in_touch input {
    background-color: #F5F5F5;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    width: 100%;
  }
  .get_in_touch textarea {
    background-color: #F5F5F5;
    border: none;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    border-radius: 5px;
  }
  .buttons {
    text-align: right;
  }
  .cancel {
    background-color: #FFB800;
    border: none;
    margin-right: 20px;
    width: 100px;
    padding: 8px;
  }
  .send {
    background-color: #8A8A8A;
    border: none;
    width: 100px;
    padding: 8px;
    border-radius: 10px;
    color: white;
  }
  .address {
    margin-left: 180px;
  }
  .address h3 {
    color: #8A8A8A;
  }
  .info_foot h3, .info_foot p, .info_foot h4{
    margin-left: 180px;
  }
  .footer {
    background-color: #FDF8EE;
  }
  .info_foot h3 {
    margin-top: 30px;
  }
  .contacts h4 {
    margin-top: 80px;
    text-align: center;
  }
  .contacts {
    text-align: center;
  }
  .last_address {
    text-align: center;
    margin-top: 10px;
  }
  .last_text {
    text-align: center;
  }
  .selected {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
.left_right img{
  width: 40px;
  height: 40px;
}
</style>
