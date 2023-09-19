// import { response } from "express";
import { allData } from "./allData.js";
import { headerCompanent } from './headerCompanent.js';



export let profilAccaunt = {
  data() {
    return {
      myProfil: {}
    }
  },
  template: `
        <header-companent></header-companent>

<div class="profil">
<div class="profil_content">
  <div class="profil_header">
    <div class="profil_photo">
      <div class="profil_photos">
      <img style="width: 100%;height: 100%;object-fit: cover; border-radius: 50%;" :src="myProfil.photoUrl"></img>
      </div>
    </div>
    <div class="profil_text">
      <div class="profil_row1">
      <div>
      <span>{{myProfil.accauntlogin}}</span>
      <img style="margin-left: 3px;" v-if="myProfil.verify" src="/img/verify.svg" ></img>
      </div>
      <span>Подписаться</span>
      <span>Отправить сообщение</span>

      </div>
      <div class="profil_row2">
        <span>{{myProfil.posts.length}} публикация</span>
        <span>{{ myProfil.fallowers.length }} подписчиков</span>
        <span>{{ myProfil.fallowing.length }} подписок</span>
      </div>
      <div class="profil_row3">
        <div class="fullname">{{ myProfil.firstName }} {{myProfil.lastName}}</div>
        <div class="biografia">{{myProfil.biography}}</div>
      </div>
    </div>
  </div>

  <div class="topical">
    <div class="topical_item">
      <div class="topical_photo"></div>
      <div class="topical_title">актуальное</div>
    </div>
    <div class="topical_item">
      <div class="topical_photo"></div>
      <div class="topical_title">актуальное</div>
    </div>
    <div class="topical_item">
      <div class="topical_photo"></div>
      <div class="topical_title">актуальное</div>
    </div>
  </div>

  <div class="profil_posts">
    <div class="profil_posts_header">
      <span>ПУБЛИКАЦИИ</span>
      <span>СОХРАНЕННОЕ</span>
      <span>ОТМЕТКИ</span>
    </div>
    <div class="profil_posts_content">
      <div class="profil_posts_content_item" v-for="item in myProfil.posts">
      <img style="width: 100%;height: 100%;object-fit: cover;" :src="item.imageUrl" alt="icon">
      </div>
    </div>
  </div>

  <div v-for="item in users" >
  sucses
  </div>

</div>
</div>
  `,
  mounted() {
    const params = {login: this.$route.params.accaunts};
    axios.get("/api/profil",{params}).then((response) =>{
      this.myProfil = response.data
    })
  },

  components: {
    "header-companent": headerCompanent,
  }
};
