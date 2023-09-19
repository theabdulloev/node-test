import { allData } from "./allData.js";
import { headerCompanent } from "./headerCompanent.js";
import { sidebarCompanent } from "./sidebarCompanent.js";

export const accauntContentCompanent = {
  data() {
    return allData;
  },
  template: `
  <header-companent></header-companent>
  <section>
    <div class="container">
      <div class="content">
        <div class="content_header">
          <div class="content_header_item"></div>
        </div>
        <div class="content_main">



          <div v-for="item in allPosts" class="content_main_item">
            <div class="content_main_item_header">
              <div class="content_main_item_header_logo">
              <img style="width: 100%;height: 100%;object-fit: cover; border-radius: 50%;" :src="item.photoUrl"></img>
              </div>
              <div class="content_main_item_header_text">
                <div class="content_main_item_header_text_login">
                  {{item.accauntlogin}}
                  <img style="margin-left: 3px;" v-if="item.verify" src="/img/verify.svg" ></img>
                </div>
                <div class="content_main_item_header_text_soundname">
                  {{ item.soundName }}
                </div>
              </div>
            </div>
            <div :style="backgroundStyle(item.imageUrl)" class="content_main_item_photo">
            // 
            
            </div>
            <div class="action">
              <div class="left">
                <div class="like">
        <img src="../img/like.svg" alt="icon">
                
                </div>
                <div class="comment">
        <img src="../img/comment.svg" alt="icon">
                
                </div>
                <div class="repost">
        <img src="../img/send.svg" alt="icon">
                
                
                </div>
              </div>
              <div class="save">
        <img src="../img/save.svg" alt="icon">
              
              </div>
            </div>
            <div class="likeCount">
              <p> Нравится <b>{{ item.likeCount}}</b> </p>
            </div>
            <div class="opisaniye">
              <p>
                <span>
                  {{ item.accauntlogin }}
                </span>
                {{ item.titlePost }}
              </p>
            </div>
            <div class="commentAll">
              <span>Посметреть все комментарии({{ item.commentId}})</span>
            </div>
          </div>




          <!-- <div class="content_main_item"></div>
          <div class="content_main_item"></div>
          <div class="content_main_item"></div> -->
        </div>
      </div>
      <sidebar-companent></sidebar-companent>
    </div>
  </section>
  `,
  components: {
    "header-companent": headerCompanent,
    "sidebar-companent": sidebarCompanent,
  },
  methods: {
    async fetchPosts(){
      try {
        const response = await axios.get("/api/posts")
        this.allPosts = response.data
      } catch (error) {
        alert("Error")
        console.log(error)
      }
    },
    backgroundStyle(item){
      return {
        backgroundImage: `url(${item})`
      }
    }
  },
  mounted() {
    this.fetchPosts()

  }
};
{/* <img :src="item.imageUrl" alt="icon"> */}