<template>
  <div class="mWorksBox">
    <div
      class="wFilters"
      :class="[
        {
          workCategorySelected: !workCategorySelected,
        },
      ]"
    >
      <div
        class="wOverl"
        :class="[
          {
            catSelectedWorks: 'photo_video' == catSelected,
            wOverlShowSx: overlaySx,
            wOverlShowCenter: overlayCenter,
            wOverlShowDx: overlayDx,
          },
        ]"
      ></div>

      <div
        class="wFi"
        :class="[
          {
            catSelectedWorks: 'photo_video' == catSelected,
            wFiSmaller: workCategorySelected,
          },
        ]"
        @click="filterTax(48, 'categories', 'photo_video')"
        :style="{
          backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(https://endorphinoutdoor.com/wp-content/uploads/2020/09/wavesHunters2-scaled.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
        @mouseenter="
          overlaySx = true;
          overlayCenter = false;
          overlayDx = false;
        "
      >
        <div class="wFiTitle">PHOTO/VIDEO</div>
      </div>
      <div
        class="wFi"
        :class="[
          {
            catSelectedWorks: 'dev' == catSelected,
            wFiSmaller: workCategorySelected,
          },
        ]"
        @click="filterTax(47, 'categories', 'dev')"
        :style="{
          backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(https://endorphinoutdoor.com/wp-content/uploads/2020/12/snowboarder_1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
        @mouseenter="
          overlaySx = false;
          overlayCenter = true;
          overlayDx = false;
        "
      >
        WEB/MOBILE DEVELOPMENT
      </div>
      <div
        class="wFi"
        :class="[
          {
            catSelectedWorks: 'graphics' == catSelected,
            wFiSmaller: workCategorySelected,
          },
        ]"
        @click="filterTax(49, 'categories', 'graphics')"
        :style="{
          backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(https://endorphinoutdoor.com/wp-content/uploads/2021/01/la-sportiva-copertina.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
        @mouseenter="
          overlaySx = false;
          overlayCenter = false;
          overlayDx = true;
        "
      >
        GRAPHICS
      </div>
    </div>
    <q-circular-progress
      indeterminate
      size="45px"
      :thickness="1"
      color="grey-8"
      track-color="blue-grey-14"
      class="q-ma-md loaderWorks"
      v-if="!works && workCategorySelected"
    />
    <carousel
      :class="[
        {
          worksSelectionContainer: !isMobile,
          worksSelectionContainerFullWidth: isMobile,
        },
      ]"
      :perPageCustom="[
        [300, 1],
        [500, 2],
        [800, 2],
        [1024, 3],
      ]"
      :autoplay="true"
      :autoplayTimeout="4000"
      :navigationEnabled="true"
      :navigationNextLabel="'▶'"
      :navigationPrevLabel="'◀'"
      :paginationSize="25"
      :paginationPadding="5"
      :paginationActiveColor="'#323238'"
      v-if="workCategorySelected"
    >
      <slide
        class="work"
        v-for="(work, i) in works"
        :key="`work_${i}`"
        :class="[
          {
            pushedSingleWorkClass: pushedSingleWork,
          },
        ]"
      >
        <v-img
          v-if="work.featured_image_src"
          :src="work.featured_image_src"
          class="grey lighten-2 workImage"
          :aspect-ratio="16 / 9"
          @mouseover="showByIndex = i"
          @mouseout="showByIndex = null"
          @click="pushSingleWork(work.id)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <div
            class="workImageOverlay"
            :class="[
              {
                'fade-out-worktitle': showByIndex !== i,
                'fade-in': showByIndex === i,
              },
            ]"
          ></div>
          <div
            class="imgTitle"
            :class="[
              {
                'fade-out-worktitle': showByIndex !== i,
                'fade-in': showByIndex === i,
              },
            ]"
          >
            {{ work.title.rendered }}
          </div>
        </v-img>
      </slide>
    </carousel>
    <div class="worksSelectionContainer" v-if="workCategorySelected && test">
      <div
        class="work"
        v-for="(work, i) in works"
        :key="i + `_work`"
        @click="pushSingleWork(work.id)"
        :class="[
          {
            pushedSingleWorkClass: pushedSingleWork,
          },
        ]"
      >
        <v-img
          v-if="work.featured_image_src"
          :src="work.featured_image_src"
          class="grey lighten-2 workImage"
          :aspect-ratio="16 / 9"
          @mouseover="showByIndex = i"
          @mouseout="showByIndex = null"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <div
            class="workImageOverlay"
            :class="[
              {
                'fade-out-worktitle': showByIndex !== i,
                'fade-in': showByIndex === i,
              },
            ]"
          ></div>
          <div
            class="imgTitle"
            :class="[
              {
                'fade-out-worktitle': showByIndex !== i,
                'fade-in': showByIndex === i,
              },
            ]"
          >
            {{ work.title.rendered }}
          </div>
        </v-img>
      </div>
    </div>
  </div>
</template>
<script>
import { db, Timestamp, GeoPoint } from "../../main";
import firebase from "firebase";
import VueMoment from "vue-moment";
import { mapState, mapGetters } from "vuex";
import axios from "axios";
import VueCarousel from "vue-carousel";
import { Carousel, Slide } from "vue-carousel";
import _ from "lodash";

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      test: false,
      works: null,
      catSelected: "",
      env: process.env.VUE_APP_DB_ENV,
      adminCode: null,
      loaded: false,
      showByIndex: null,
      pushedSingleWork: false,
      workCategorySelected: false,
      overlaySx: false,
      overlayCenter: false,
      overlayDx: false,
    };
  },
  created() {
    this.getWorks();
    this.$store.commit("selectEl", "mContents");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);
  },
  methods: {
    pushSingleWork(workId) {
      this.pushedSingleWork = true;
      setTimeout(() => {
        this.$router.push({
          name: "mSingleWork",
          params: { id: workId },
        });
      }, 2000);
    },
    async getWorks() {
      this.loaded = false;
      try {
        var works = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?categories=46`
          )
        ).data;
        await this.getOtherFields(works);
      } catch (error) {
        console.log(error);
      }

      this.loaded = true;
    },
    async getOtherFields(works) {
      // get other fields
      for (const work of works) {
        // non piu necessario #######
        // if (work.featured_media !== 0) {
        //   work["featured_media_url"] = (
        //     await axios.get(
        //       `https://endorphinoutdoor.com/wp-json/wp/v2/media/${work.featured_media}`
        //     )
        //   ).data.source_url;
        // }
        // add custom field
        // var acf = (
        //   await axios.get(
        //     `https://endorphinoutdoor.com/wp-json/acf/v3/posts/${work.id}`
        //   )
        // ).data.acf;
        // work["acf"]["client_name"] = acf.client_name;
        // work["acf"]["year"] = acf.year;
        // work["acf"]["technologies"] = acf.technologies;
      }
      this.works = works;
    },
    async filterTax(tax, type, catSel) {
      this.catSelected = catSel;
      this.works = null;
      this.loaded = false;
      try {
        var works = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?${type}=${tax}`
          )
        ).data;
        await this.getOtherFields(works);
      } catch (error) {
        console.log(error);
      }
      this.loaded = true;
      this.workCategorySelected = true;
    },
  },
  computed: {
    ...mapState({
      user: "user",
      userRole: "userRole",
      menuEl: "menuEl",
    }),
    isMobile() {
      console.log(window.innerHeight);
      if (window.innerWidth < 800) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";
.fade-out-worktitle {
  -webkit-animation: fade-out 2s ease-out both;
  animation: fade-out 2s ease-out both;
}
.pushedSingleWorkClass {
  opacity: 0;
  transition: 3s;
}
.worksSelectionContainer {
  width: 90%;
  height: 100%;
}
.worksSelectionContainerFullWidth {
  width: 100vw;
  height: 100%;
}
.mWorksBox {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 100px 0 20px 0;
}
.work {
  width: 100%;
  height: 70vh;
  cursor: pointer;
}
.workImage {
  width: 100%;
  height: 100%;
  transition: 1s;
  position: relative;
  img {
    zoom: 60%;
  }
}
.workImageOverlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, 0.575);
}
.imgTitle {
  transition: 1s;
  position: absolute;
  top: 80%;
  right: 12%;
  text-align: right;
  font-size: 24px;
  color: white;
}
.wFilters {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .wOverl {
    z-index: 9150;

    opacity: 0;
    position: absolute;
    width: 33.3%;
    height: 100%;
    // background: rgba(255, 255, 255, 0.5);
    background: rgba(189, 189, 189, 0.5);
    pointer-events: none;
  }
  .wOverlShowSx {
    opacity: 1;
    transition: 0.5s;
    margin-right: 66.6%;
  }
  .wOverlShowCenter {
    opacity: 1;
    transition: 0.5s;
  }
  .wOverlShowDx {
    opacity: 1;
    transition: 0.5s;
    margin-left: 66.6%;
  }
}
.workCategorySelected {
  height: 100vh;
}
.wFi {
  .wFiTitle {
    z-index: 9200;
  }
  width: calc(100vw / 3);
  height: 100%;
  border: 1px solid rgba(223, 223, 223, 0.63);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 1s;
  z-index: 9100;
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-align: center;

  &:hover {
    background: rgba(182, 182, 182, 0.521);
    transition: 1s;
  }
}
.wFiSmaller {
  font-size: 20px !important;
}
.loaderWorks {
  margin-top: 30vh !important;
}
.catSelectedWorks {
  background: $primary-color;
  transition: 1s;
  padding: 3px;
}
// ##
@media (max-width: 950px) {
  .wFi {
    font-size: 18px;
  }
  .imgTitle {
    font-size: 18px;
  }
}
// ##
@media (max-width: 650px) {
  .work {
    height: 70vh;
  }
  .wOverl {
    display: none !important;
  }
  .wFilters {
    flex-direction: column;
    height: 150px;
  }
  .workCategorySelected {
    height: 100vh;
  }
  .wFi {
    width: 100%;
    height: 33.3%;
  }
  .imgTitle {
    transition: 1s;
    position: absolute;
    top: 80%;
    right: 8%;
    text-align: right;
    font-size: 14px;
    color: white;
  }
}
// ##
@media (max-width: 400px) {
  .work {
    height: 60vh;
  }
}
</style>