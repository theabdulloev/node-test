import { allData } from "./allData.js";
import { headerCompanent } from './headerCompanent.js';

export let editCompanent = {
  data() {
    return allData;
  },
  template: `
  <header-companent></header-companent>
  <div class="edit">
    <div class="edit_content">
      <div class="edit_left">
        <ul class="edit_ul">
          <li>Редактировать профиль</li>
          <li>Профессиональный аккаунт</li>
          <li>Сменить пароль</li>
          <li>Приложения и сайты</li>
          <li>Уведомления по электронной почте</li>
          <li>Push-уведомления</li>
          <li>Управление контактами</li>
          <li>Конфиденциальность и безопасность</li>
          <li>Реклама</li>
          <li>Контроль</li>
          <li>Входы в аккаунт</li>
          <li>Электронные письма от Instagram</li>
          <li>Помощь</li>
        </ul>
      </div>
      <div class="edit_right"></div>
    </div>
  </div>
  `,
  components: {
    "header-companent": headerCompanent
  }
};
