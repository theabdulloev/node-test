import { allData } from "./allData.js";
import { router } from "./main.js";

export const sidebarCompanent = {
  data() {
    return allData
  },
    template: `
    <div class="sidebar">
    <div class="sidebar_content_accaunt">
      <div class="sidebar_content_accaunt_logo">
      <img style="width: 100%;height: 100%;object-fit: cover; border-radius: 50%;" :src="myProfil.photoUrl"></img>
      
      </div>
      <div class="sidebar_content_accaunt_text">
        <div class="sidebar_content_accaunt_text_login">
        {{myProfil.accauntlogin}}
        <img style="margin-left: 3px;" v-if="myProfil.verify" title="verify" src="/img/verify.svg" ></img>

        </div>
        <div class="sidebar_content_accaunt_text_fullname">
          {{ myProfil.firstName }} {{myProfil.lastName}}
        </div>
      </div>
      <div class="sidebar_content_switch" >
      <router-link to="/">
        <span>переключиться</span>
      </div>
    </div>
    <div class="sidebar_recommendations">
      <div class="sidebar_recommendations_header">
        <div class="sidebar_recommendations_header_text1">
          Рекомендации для вас
        </div>
        <div class="sidebar_recommendations_header_text2">Все</div>
      </div>
      <div class="sidebar_recommendations_content">
        <div v-for="item in myProfil.recomadation" class="sidebar_recommendations_content_item">
           <div @click="router(item)" class="sidebar_recommendations_content_item_accaunt">
            <div class="sidebar_recommendations_content_item_logo">
      <img style="width: 100%;height: 100%;object-fit: cover; border-radius: 50%;" :src="item.photoUrl"></img>
            
            </div>
            <div class="sidebar_recommendations_content_item_text">
              <div class="sidebar_recommendations_content_item_text_login">
              {{item.accauntlogin}}
              <img style="margin-left: 3px;" v-if="item.verify" title="verify" src="/img/verify.svg" ></img>
              </div>
              <div class="sidebar_recommendations_content_item_text_text">
              Рекомендации для вас
              </div>
            </div>
          </div>

          <div v-if="myProfil.fallowing.some(i => i.profil_fallowing_id === item.id)" class="sidebar_recommendations_content_unfallow">
            <span @click="fallow(item.id)">Отписаться</span>
          </div>
          <div v-else class="sidebar_recommendations_content_fallow">
          <span @click="fallow(item.id)">Подписаться</span>
        </div>

        </div>
      </div>
    </div>
  </div>
    `,
    methods: {
      async fallow(id){
        try {
          const response = await axios.post('/api/fallow',{myId: allData.myProfil.id,id: id})
          if(response.data == 'fallow'){
            this.myProfil.fallowing.push({profil_fallowing_id: id})
          }
          else if(response.data == 'unfallow'){
            this.myProfil.fallowing = this.myProfil.fallowing.filter(item => item.profil_fallowing_id !== id) ;
          }
        } catch (error) {
          console.log(error)
        }
      },
      router(item){
        router.push(`/${item.accauntlogin}`)
      }
    }
};

// function getCookieValue(cookieName) {
//   const cookies = document.cookie.split(';');
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     if (cookie.startsWith(cookieName + '=')) {
//       return cookie.substring(cookieName.length + 1);
//     }
//   }
//   return null; // Если куки с указанным именем не найдено
// }


