<template>
  <!-- nell index è comodo mettere la navigazione dell'app -->
  <div>
    <v-app>
      <div class="mainBox" v-scroll="scrolled">
        <!-- header menu -->
        <div
          class="mTop included"
          v-if="loaded"
          :class="[{ menuBkg: scroll > 200 }]"
        >
          <!-- <div class="mTopEl mCont" v-if="false">
            <div class="mLine" :class="[{ bkgBlack: notHome }]"></div>
            <router-link class="menuEl" :to="{ name: 'mContacts' }">
              <div
                class="mContText"
                :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
              >
                CONTACTS
              </div>
            </router-link>
          </div>
          <router-link :to="{ name: 'mHome' }" class="mTopEl mLogo">
            <div>
              <img
                class="logoImg"
                :src="`https://endorphinoutdoor.com/wp-content/uploads/2021/01/Senza-titolo-1-Recuperato-e1611066754719.png`"
              />
            </div>
          </router-link>
          <div class="mTopEl mMenu" :class="[{ colorBlack: notHome }]">
            <div
              class="menuOpen"
              :class="[{ showMenu: menu, showMenuLong: isLoggedIn && menu }]"
              v-click-outside="{
                handler: onClickOutsideSideBar,
                include: include,
              }"
            >
              <router-link :to="{ name: 'mHome' }" class="menuEl">
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.mHome.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('mHome')"
                >
                  HOME
                </div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link :to="{ name: 'mWeAre' }" class="menuEl">
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.mAbout.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('mAbout')"
                >
                  WE ARE
                </div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link :to="{ name: 'mWeDo' }" class="menuEl">
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.mContents.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('mContents')"
                >
                  WE DO
                </div>
              </router-link>
              <div class="menuElDivider">/</div>
              <router-link :to="{ name: 'mWeTell' }" class="menuEl">
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.mBlog.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('mBlog')"
                >
                  WE TELL
                </div>
              </router-link>
              <div class="menuElDivider">/</div> -->
          <!-- <router-link :to="{ name: 'mShop' }" class="menuEl">
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.mShop.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('mShop')"
                >
                  SHOP
                </div>
              </router-link> -->
          <!-- <div class="menuElDivider">/</div> -->
          <!-- <router-link :to="{ name: 'mContacts' }" class="menuEl">
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.mContacts.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('mContacts')"
                >
                  CONTACTS
                </div>
              </router-link> -->
          <!-- <div class="menuElDivider">/</div> -->

          <!-- login -->
          <!-- <router-link
                v-if="!isLoggedIn"
                :to="{ name: 'login' }"
                class="menuEl"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.login.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('login')"
                >
                  Login
                </div>
              </router-link> -->

          <!-- logout -->
          <!-- <router-link
                v-if="isLoggedIn"
                :to="{ name: 'mHome' }"
                class="menuEl"
              >
                <div
                  class="menuLine"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="logout"
                >
                  Logout
                </div>
              </router-link>
              <div class="menuElDivider" v-if="isLoggedIn">/</div>
              -->
          <!-- settings -->
          <!--
              <router-link
                v-if="isLoggedIn"
                :to="{ name: 'userProfile' }"
                class="menuEl"
              >
                <div
                  class="menuLine"
                  :class="[{ menuLineShow: menuEl.userProfile.val }]"
                  :style="{ background: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                ></div>
                <div
                  :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
                  @click="selectEl('userProfile')"
                >
                  Settings
                </div>
              </router-link> -->
          <!--  -->
          <!-- </div>
            <div
              class="mMenuText fade-in fade-out"
              :class="[{ hideMenu: menu }]"
            >
              MENU
            </div>

            <div
              v-if="!menu"
              class="mLineMenu fade-in fade-out"
              @click="toggleMenu"
              :class="[{ bkgBlack: notHome, bkgBlack_2: notHome }]"
            >
              <div
                class="mLineMenuCenterLine"
                :class="[{ bkgBlack: notHome }]"
              ></div>
            </div>
            <v-icon
              v-if="menu"
              @click="toggleMenu"
              class="menuCross fade-in fade-out"
              :style="{ color: notHome ? 'rgb(65, 65, 65)' : 'white' }"
              >mdi-close</v-icon
            >
          </div> -->
        </div>
        <!--  -->
        <!-- le transitions messe qua rallentano molto il router, meglio metterle come classe di ogni componente -->
        <!-- <transition name="fade-in">
        </transition> -->

        <router-view></router-view>

        <!-- footer -->
        <div class="mFooter" v-if="notHome">
          <div class="fBody">
            <div class="fbCol">
              <div class="metaFooter">
                <img
                  class="logoImgFooter"
                  :src="`https://endorphinoutdoor.com/wp-content/uploads/2021/01/Senza-titolo-1-Recuperato-e1611066754719.png`"
                />
              </div>
              <div class="metaFooter">Metamorphosi 2020</div>
            </div>

            <div class="fbCol">
              <div class="sitemapText">sitemap</div>
              <router-link :to="{ name: 'mHome' }"
                ><div class="sitemapEl">home</div></router-link
              >
              <router-link :to="{ name: 'mWeAre' }"
                ><div class="sitemapEl">weare</div></router-link
              >
              <router-link :to="{ name: 'mWeDo' }"
                ><div class="sitemapEl">wedo</div></router-link
              >
              <router-link :to="{ name: 'mWeTell' }"
                ><div class="sitemapEl">wetell</div></router-link
              >
              <router-link :to="{ name: 'mContacts' }"
                ><div class="sitemapEl">contacts</div></router-link
              >
            </div>
          </div>
        </div>

        <!-- for some type of notification -->
        <global-message
          v-if="globalMessage"
          :globalMex="globalMessage"
          :error="false"
        ></global-message>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import axios from "axios";
import firebase from "firebase";
import store from "./store";

export default {
  // this can be used alternatively to the meta in the head of welcome.blade.php page, for seo purpose
  // metaInfo: {
  //   title: "Metamorphosi",
  //   titleTemplate: "%s - Digital Agency",
  //   htmlAttrs: {
  //     lang: "en",
  //     amp: true,
  //   },
  // },
  data() {
    return {
      // lastSearch: this.$store.state.lastSearch,
      menuOpen: false,
      loaded: false,
      scroll: null,
    };
  },
  async created() {
    this.loaded = false;
    console.log(process.env.NODE_ENV);
    console.log(process.env.VUE_APP_DB_ENV);

    // carico l utente firebase dopo il refresh
    this.$store.dispatch("loadFirebaseUserAfterRefresh");
    this.$store.commit("getUserOnRefresh");

    // carico il carrello al refresh
    this.$store.dispatch("loadBasketOnRefresh");

    // prendo l userRole nello storage
    this.$store.commit("getUserRole");

    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  },
  methods: {
    onClickOutsideSideBar() {
      this.$store.commit("closeMenu");
    },
    include() {
      return [document.querySelector(".included")];
    },
    scrolled(position) {
      this.scroll = position;
    },
    // menu
    selectEl(value) {
      console.log("select el");
      this.$store.commit("selectEl", value);
    },
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
    closeMenu() {
      this.$store.commit("closeMenu");
    },
    async logout() {
      this.$store.dispatch("signOut");
    },
  },
  watch: {
    $route(to, from) {
      console.log(this.$route);
      var value = this.$route.name;
      console.log("select el");
      var menu = this.menuEl;
      for (const el in menu) {
        if (menu[el].slug.includes(value)) {
          menu[el].val = true;
        } else {
          menu[el].val = false;
        }
      }
      this.closeMenu();
    },
  },
  computed: {
    ...mapState({
      isLoggedIn: "isLoggedIn",
      userRole: "userRole",
      globalMessage: "globalMessage",
      isMetamorphosis: "isMetamorphosis",
      menu: "menu",
      menuEl: "menuEl",
      notHome: "notHome",
    }),
    ...mapGetters({ itemsInBasket: "itemsInBasket" }),
  },
};
</script>
<style lang="scss">
.mainBox {
  height: 100%;
}
.sitemapText {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.sitemapEl {
  cursor: pointer;
  color: white !important;
  text-decoration: none !important;
}
.fBody {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
}
.mFooter {
  width: 100%;
  height: 250px;
  background: rgb(41, 41, 41);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
}
.colorBlack {
  color: rgb(65, 65, 65) !important;
}
.bkgBlack {
  border-bottom: 2px solid rgb(65, 65, 65) !important;
}
.bkgBlack_2 {
  border-top: 2px solid rgb(65, 65, 65) !important;
}
.menuBkg {
  background: rgba(167, 167, 167, 0.596);
  transition: 1s;
}
.mTop {
  width: 100%;
  height: 70px;
  transition: 1s;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 9800;
  background: rgb(141, 141, 141) !important;
  .mTopEl {
    width: 33.3%;
    display: flex;
    align-items: center;
  }
  .mLogo {
    .logoImg {
      width: 150px;
    }
    justify-content: center;
    color: red;
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
    z-index: 9994;
    &:hover {
      text-decoration: none !important;
    }
  }

  .mCont {
    justify-content: flex-start;
    font-weight: bold;
    color: white;
    z-index: 9999;

    .mContText {
      margin-left: 10px;
      transition: 1s;
      cursor: pointer;
      &:hover {
        margin-left: 30px;
        transition: 1s;
      }
    }
  }
  .mMenu {
    justify-content: flex-end;
    z-index: 9999;
    color: white;
    font-weight: bold;
    cursor: pointer;

    .mMenuText {
      margin-right: 10px;
    }
    .hideMenu {
      display: none;
    }
    .menuEl {
      font-size: 14px;
      margin: 0 3px;
    }
  }
}

.menuOpen {
  position: fixed;
  top: 40px;
  right: -390px;
  transition: 0.5s;
  display: flex;
  justify-content: space-between;
  width: 380px;
}
.showMenu {
  transition: 0.5s;
  right: 100px;
}
.showMenuLong {
  right: 260px;
}
.menuCross {
  margin-right: 10px;
  font-size: 40px !important;
}
.mLineMenu {
  width: 50px;
  height: 20px;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  position: relative;
  transition: 1s;

  &:hover {
    // background: rgba(52, 55, 66, 0.356);
    width: 60px;
    transition: 0.5s;
  }
  .mLineMenuCenterLine {
    position: absolute;
    height: 1px;
    width: 100%;
    top: 7px;
    border-bottom: 2px solid white;
  }
}
.logoImgFooter {
  width: 80px;
}
.metaFooter {
  display: flex;
  justify-content: center;
  width: 200px;
}
// ##
@media (max-width: 1050px) {
  .mTop {
    background: rgba(255, 255, 255, 0.329);
  }
  .menuBkg {
    background: rgba(167, 167, 167, 0.596);
    transition: 1s;
  }
}
// ##
@media (max-width: 800px) {
  .menuOpen {
    width: 300px;
    top: 80px;
  }

  .showMenu,
  .showMenuLong {
    transition: 0.5s;
    right: 50px;
  }
  .mTop {
    .mMenu {
      .menuEl {
        font-size: 10px;
        margin: 0 3px;
        .menuLine {
          top: -3px;
        }
      }
    }
  }

  .menuElDivider {
    display: none;
  }
  .mContText {
    &:hover {
      margin-left: 0px !important;
      transition: 1s;
    }
  }
}
// ##
@media (max-width: 600px) {
  .mLogo {
    .logoImg {
      width: 100px !important;
    }
  }
}
// ##
@media (max-width: 400px) {
  .mLogo {
    .logoImg {
      width: 80px !important;
    }
  }
  .mFooter {
    height: 300px;
  }
  .fBody {
    flex-direction: column;
  }
  .fbCol {
    text-align: center;
  }
  .sitemapText {
    margin-top: 20px;
    font-size: 15px;
  }
  .sitemapEl {
    font-size: 10px;
    margin-top: 5px;
  }
  .menuOpen {
    width: 200px;
  }
  .showMenu,
  .showMenuLong {
    transition: 0.5s;
    right: 70px;
  }
  .mTop {
    .mMenu {
      .menuEl {
        font-size: 8px;
        margin: 0 2px;
        .menuLine {
          top: -3px;
        }
      }
    }
  }
}
</style>
