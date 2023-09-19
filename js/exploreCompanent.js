import { allData } from './allData.js';
import { headerCompanent } from './headerCompanent.js';

export const exploreCompanent = {
  data() {
    return allData
  },
  template: `
  <header-companent></header-companent>
  <div class="explore">
   <div class="explore_content">
     <div v-for="item in allPosts" class="explore_item">
      <img style="width: 100%;height: 100%;object-fit: cover;" :src="item.imageUrl"></img>
     </div>
   </div>
  </div>
  `,
  components: {
    "header-companent": headerCompanent,
  }
};
