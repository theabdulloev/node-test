import { allData } from "./allData.js";
import { headerCompanent } from "./headerCompanent.js";

export const directCompanent = {
  data() {
    return allData;
  },
  template: `
  
  <header-companent></header-companent>
  <div class="direct_inbox">
    <div class="persons">
      <div class="direct_header">
        <span>accauntlogin</span>
      </div>
      <div class="person_sms">

        <!--  -->
        <div v-for="item in 5" class="accauntlogindirect">
          <div class="accauntlogindirect_left">

            <div class="accauntlogindirect_logo"></div>
            <div class="accauntlogindirect_text">
              <div class="accauntlogindirect_accauntlogin">accauntlogin</div>
              <div class="accauntlogindirect_lastmessage">lastmessage</div>
            </div>
          </div>
          <div class="accauntlogindirect_right">!</div>
        </div>
        <!--  -->
      </div>

    </div>


    <div class="message">
    <div class="allmessage">
    <ul id="messages"></ul>    
    </div>
    <form @submit.prevent="direct" id="form" action="">
    <input ref="myinput" v-model="directsms" id="input" autocomplete="off" /><button>Send</button>
      </form>
    </div>
  
  </div>`,
  methods: {
    direct() {
      
      var socket = io();
      socket.emit("join", this.login);
      if (this.directsms != "") {
        socket.emit("chat message", [this.login,this.directsms]);
        this.directsms = "";
        this.$refs.myinput.focus()
      }
    },
  //   join(){
  //   }
  // },
  // mounted() {
  //   this.join();
  // 
},
  components: {
    "header-companent": headerCompanent,
  },
};
