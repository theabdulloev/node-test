import { accauntContentCompanent } from "./accauntContentCompanent.js";
import { accauntsCompanent } from "./accauntsCompanent.js";
import { allData } from "./allData.js";
import { directCompanent } from "./directCompanent.js";
import { editCompanent } from "./editCompanent.js";
import { exploreCompanent } from "./exploreCompanent.js";
import { profilCompanent } from "./profilCompanent.js";
import { profilAccaunt } from "./profilAccaunt.js";
const socket = io()
// const {socket} = allData

const routes = [
  { path: "/", component: accauntsCompanent },
  { path: "/home", component: accauntContentCompanent },
  { path: "/directinbox", component: directCompanent },
  { path: "/explore", component: exploreCompanent },
  { path: `/profil`, component: profilCompanent },
  { path: "/edit", component: editCompanent },
  { path: "/:accaunts", component: profilAccaunt }
];

export const router = VueRouter.createRouter({
  // предоставляем реализацию истории посещений
  history: VueRouter.createWebHistory(),
  routes,
});

let myapp = {
  data() {
    return allData
  },
  methods: {
    async CookieGet(){
      try {
        const response = await axios.get('/');
        if(response.data[0] === 'Good'){
          allData.login = response.data[1];
          this.fetchProfil();
          router.push('/home');
          // const socket =  io();
          // this.socket = socket;
          // socket.emit("join", this.login);
        }
        else{
          router.push('/')
          let formtitle = document.getElementById("formtitle")
          formtitle.innerText = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchProfil(){
      try {
         const params = {
          login: allData.login
        };
         const response = await axios.get("/api/profil",{params})
        this.myProfil = response.data
        this.Notification();
      } catch (error) {
        console.log(error)
      }
    },
    directSave(){
      // socket.emit('chat message', 'Присоединился новый пользователь');
      socket.on('chat message', function(msg) {
        allData.alllmsg.push(msg)
        console.log(msg)
          var item = document.createElement('li');
          item.innerHTML = `<div><strong>${msg.username}</strong> <span>${msg.message}</span> <span>${msg.fulldate}</span></div>`;
          messages.appendChild(item); 
          // var item = document.createElement('li');
          // item.innerHTML = `<strong style="text: align-center">${msg}</strong>`;
          // messages.appendChild(item); 

      })
    },
    async Notification(){
      const response = await axios.get('/notification',{params: {profilId: this.myProfil.id}})
      if(response.status == 200){
        this.notification = response.data
        // console.log(response)
      }
    },
    // ,
    // userLeft(){
    //   socket.on('userLeft', (username) => {
    //     var item = document.createElement('li');
    //       item.innerHTML = `<strong>${username} покинул чат</strong>`;
    //       messages.appendChild(item);
    //   });
    // },
    // userJoined(){
    //   socket.on('userJoined', (username) => {
    //     var item = document.createElement('li');
    //     item.innerHTML = `<strong>${username} присоединился к чату</strong>`;
    //     messages.appendChild(item);
    //   });
    // }
  
  },
  mounted() {
    // console.log("Rabotaet")
    this.CookieGet();
    this.directSave();
    // this.userLeft()
    // this.userJoined()
  },
};

const app = Vue.createApp(myapp);

app.use(router);
app.mount("#app");
