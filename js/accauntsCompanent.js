import { allData } from "./allData.js";
import { router } from './main.js';
export const accauntsCompanent = {
  data() {
    return allData;
  },
  template: `
  <div class="container_signup">
  <div class="container_signup_content">

    <div class="container_signup_logo">
      <div class="container_signup_logo_center"></div>
    </div>
    <div class="container_signup_accaunts">
      <div class="container_signup_accaunts_signin">
        <h1>INSTAGRAM</h1>


        <form @submit.prevent="autoregPost()" v-if="!Registration">
          <div>
            <input required v-model="l" autocomplete="off" type="text" placeholder="Телефон, имя пользователя или эл. адрес">
            <input required v-model="p" type="password" placeholder="Пароль">
          </div>
          <div>
          <button type="submit">Войти</button>
          <span id="formtitle"></span>
          </div>
          <h3>Забыли пароль?</h3>
        </form>
        <div v-if="!Registration" class="signup">
          <h3>У вас ещё нет аккаунта? <span @click=" Registration = !Registration " style="color: #267bc5; cursor: pointer">Зарегистрироваться</span></h3>
        </div>

      <form @submit.prevent="emailsignup" v-if="Registration"> 
      <div>
      <input required v-model="userEmail" autocomplete="off" type="text" placeholder="Моб. телефон или эл. адрес">
      <input required v-model="userFirstName" autocomplete="off" type="text" placeholder="Имя">
      <input required v-model="userLastName" autocomplete="off" type="text" placeholder="Фамилия">
      <input required v-model="userLogin" autocomplete="off" type="text" placeholder="Имя пользователя">
      <input required v-model="userPassword" autocomplete="off" type="password" placeholder="Пароль">
      </div>
      <span id="formtitle1"></span>
      <button id="submitbutton" type="submit">Регистрация</button>
      </form>

      <div v-if="Registration" class="signup">
      <h3>Есть аккаунт? <span @click=" Registration = !Registration " style="color: #267bc5; cursor: pointer">Вход</span></h3>
    </div>


      </div>
    </div>
  </div>
</div>
  `,
  methods: {
    async autoregPost(){
      axios.post('/autoreg', {
        userLogin: this.l,
        userPassword: this.p
      })
      .then(function (response) {
        console.log(response.data);
        // console.log(this.l)
        if(response.data[0] === 'Good'){
          allData.login = response.data[1];
          const params = {login: allData.login};
           axios.get("/api/profil",{params}).then((response) =>{
             allData.myProfil = response.data
             console.log('Myprofil',response.data)

             router.push('/home');
           })
          // const socket =  io();
          // this.socket = socket;
          // socket.emit("join", this.login);
        }
        else{
          router.push('/')
          let formtitle = document.getElementById("formtitle")
          formtitle.innerText = response.data
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    async emailsignup(){
      let proverka = false
      let exp = /[^а-я]/;
      let result = exp.test(this.userLogin);
      proverka = result
      if(proverka){
        axios.post('/emailsignup', {
          userEmail: this.userEmail,
          userFirstName: this.userFirstName,
          userLastName: this.userLastName,
          userLogin: this.userLogin,
          userPassword: this.userPassword
        })
        .then(function (response) {
          console.log(response.data);
          if(response.data[0] === "result"){
            allData.login = response.data[1]
            const params = {login: allData.login}
            axios.get("/api/profil",{params}).then((response) =>{
              allData.myProfil = response.data;
              router.push('/home');
            })
          }
          else{
            let formtitle = document.getElementById("formtitle1")
            formtitle.innerText = response.data
            router.push('/')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
};
