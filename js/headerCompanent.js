import { allData } from "./allData.js";
import { router } from "./main.js";
export const headerCompanent = {
  data() {
    return allData
  },
    template: `
    <header>
    <div class="header_content">
      <div class="logo"></div>
      <div class="search">
        <form action="">
          <input @input="search()" v-model="searchTerm" type="search" placeholder="Поиск" />
        </form>
        <div class="showRes" v-show="showSearch">
        <span>Резултать поиска {{this.resSearch.length}}</span>
        <div v-for="item in resSearch" class="sidebar_recommendations_content_item">
          <div  class="sidebar_recommendations_content_item_accaunt">
            <div class="sidebar_recommendations_content_item_logo">
      <img style="width: 40px;height: 40px;object-fit: cover; border-radius: 50%;" :src="item.photoUrl"></img>
            
            </div>
            <div class="sidebar_recommendations_content_item_text">
              <div class="sidebar_recommendations_content_item_text_login">
              {{item.accauntlogin}}
              <img style="margin-left: 3px;" v-if="item.verify" title="verify" src="/img/verify.svg" ></img>
              </div>
              <div class="sidebar_recommendations_content_item_text_text">
              {{item.firstName}} {{item.lastName}}
              </div>
            </div>
          </div>

          <div class="sidebar_recommendations_content_fallow">
            <span @click="fallow(item.id)">Подписаться</span>
          </div>
        </div>
        </div>
      </div>
      <div class="media">
        <div class="media_item item1">
        <router-link to="/home">
        <img :src="icons.home.dark" alt="icon">
        </router-link>
        </div>
        <div class="media_item item2">
        <router-link to="/directinbox">
        <img src="../img/direct.svg" alt="icon">
        </router-link>
        </div>
        <div class="media_item item3">
        <router-link to="/explore">
        <img src="../img/explore.svg" alt="icon">
        </router-link>
        </div>
        <div @click="postContainer = !postContainer" class="media_item item99">
        <img src="../img/addphoto.svg" alt="icon">
        </div>
        <div class="media_item item4" @click="likecontent = !likecontent; profil = false">
        <img src="../../img/alertmsg.svg" alt="icon">
        </div>
        <div class="media_item item5" @click="profil = !profil; likecontent = false">
        <img :src="icons.profil.light" alt="icon">
        </div>
      </div>
      <div class="profil_content" v-if="profil">
      <router-link to="/profil">
      <p>Профиль</p>
      </router-link>
      <p>Сохраненное</p>
      <router-link to="/edit">
      <p>Настройки</p>
      </router-link>
      <p>Ваши действия</p>
      <p>Переключение между аккаунтами</p>
      <p @click="logout()">Выход</p>
      </div>



      <div class="like_content" v-if="likecontent">
      <div v-if="notification.length"  v-for="item in notification">
          <div  class="like_content_item">
              <div class="like_content_photo">
          <img style="width: 100%;height: 100%;object-fit: cover; border-radius: 50%;" :src="item.photoUrl"></img>
              </div>
              <div class="like_content_title">
          <p><strong style="margin-right: 3px;">{{item.accauntlogin}} 
          <img style="margin-left: 3px;" v-if="item.verify" title="verify" src="/img/verify.svg" ></img>
          
          </strong>подписался(-ась) на ваши обновления.</p>
              </div>
              <button v-if="myProfil.fallowing.some(i => i.profil_fallowing_id === item.id)" id="fallow">Отписаться</button>
              <button id="fallow" v-else>Подписаться</button>
          </div>
          <div class="data">
          <span>{{item.dateAndTime}}</span>
          </div>
          </div>
          <span v-else>Уведомление пока нет</span>
  
    </div>





    </div>
    <div v-if="postContainer" class="post_container">
      <span @click="postContainer = !postContainer" id="close">x</span>
      <div class="post_content">
    <form id="uploadForm" enctype="multipart/form-data" class="postForm"  @submit.prevent="CreatePost" name="userForm">
      <div id="logoform">
        <img :src="this.image"></img>
      </div>
      <div class="inputform">
      <input type="file" @change="download()" ref="photo" id="photo" accept="image/*">      
      </div>
      <div class="inputform">
      <label for="soundName">Добавить музыку:</label>
      <input type="text" autocomplete="off" v-model="soundName" name="soundName" id="soundName" />
      </div>
      <div class="inputform">
      <label for="title">Описание поста:</label>
      <input type="text" autocomplete="off" v-model="title" name="title" id="title" />
      </div>
          <button type="submit">Сохранить</button>
  </form>
      </div>
    </div>
  </header>
    `,
    methods: {

      async search(){
        if(this.searchTerm.length > 2){
          const response = await axios.get('/search', { params: { term: allData.searchTerm }});
          this.showSearch = true;
          if(this.resSearch.length < response.data.length){
            this.resSearch.length = 0;
            this.resSearch.push(...response.data);
          }
        }
        else{
          this.resSearch.length = 0;
          this.showSearch = false;
        }
      },
      async CreatePost() {
        const formData = new FormData();
        
        formData.append('photo', this.$refs.photo.files[0]);
        formData.append('soundName', this.soundName);
        formData.append('title', this.title);
        formData.append('login', this.login);
  
        axios.post('/upload', formData)
          .then(response => {
            console.log('Фотография успешно загружена!');
            console.log(response.data)
            this.postContainer = !this.postContainer;
            this.title = "";
            this.soundName = "";
            this.allPosts.unshift(response.data);
            // Дополнительные действия после успешной загрузки фотографии
          })
          .catch(error => {
            console.error('Ошибка при загрузке фотографии:', error);
          });

        },
        async logout(){
          const response =await  axios.get('/logout')
          if(response.status == 200){
            router.push('/')
            this.myProfil = null
            this.allPosts = null
          }
        }
,
        download(){
          // console.log(this.$refs.photo.files[0])
          // console.log(input)
          let file = this.$refs.photo.files[0]
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            allData.image = reader.result;
            allData.show = true;
            let doc = document.getElementById('logoform')
            let img = `<img src=${reader.result}></img>`
            doc.innerHTML = img;

            console.log(allData)
          };
        }

        // <input id="inputFile" type="file" onchange="download(this)">


        
        // const response = await fetch("api/posts", {
        //     method: "POST",
        //     headers: { "Accept": "application/json", "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       soundName: this.soundName,
        //       title: this.title,
        //       login: this.login
        //     })
        // });
        // this.postContainer = false;
        // this.title = ""
        // this.soundName = ""
    }
};
// Выйти                  