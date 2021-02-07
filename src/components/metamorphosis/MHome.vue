<template>
  <div
    class="mHomeBox fade-in-home"
    :style="{
      background: `${splash ? 'rgb(80, 80, 80)' : ''}`,
      backgroundImage: `url(${!splash ? bkgImage : ''})`,
    }"
  >
    <!-- splash -->
    <!-- <div v-if="splash" class="splash pulsate-fwd">METAMORPHOSI</div> -->
    <div v-if="splash" class="canvasBoxBabylon">
      <div class="splashText pulsate-fwd">METAMORPHOSI</div>
      <!-- <Scene>
        <Property name="clearColor" color="#505050"></Property>
        <Camera
          type="arcRotate"
          :properties="{ position: $vector([cameraZoom, 0, 0]) }"
        ></Camera>
        <Entity :position="[0, 0, 0]">
          <Animation property="rotation.x" :duration="5">
            <Key frame="0%" :value="0"></Key>
            <Key frame="100%" :value="Math.PI * 2"></Key>
          </Animation>
          <Sphere
            :properties="{
              position: $vector([-0.6, -1, 0]),
            }"
            ><Material diffuse="#143b60"> </Material
          ></Sphere>
          <Sphere
            :properties="{
              position: $vector([0.6, 1, 0]),
            }"
            ><Material diffuse="#143b60"> </Material
          ></Sphere>
        </Entity>
        <Entity>
          <Animation
            property="rotation.x"
            :duration="5"
            :end="Math.PI * 2"
          ></Animation>
          <PointLight diffuse="#F0F" :position="[0, 0, 4]"></PointLight>
        </Entity>
        <Entity>
          <Animation
            property="rotation.y"
            :duration="5"
            :end="Math.PI * 2"
          ></Animation>
          <PointLight>
            <property name="diffuse" color="#0FF"></property>
            <property name="position" :vector="[0, 0, 4]"></property>
          </PointLight>
        </Entity>
        <Entity>
          <Animation
            property="rotation.z"
            :duration="5"
            :end="Math.PI * 2"
          ></Animation>
          <PointLight
            :properties="{
              diffuse: $color('#FF0'),
              specular: $color({ r: 1, g: 0, b: 0 }),
            }"
          >
            <property name="position" :vector="[0, 4, 0]"></property>
          </PointLight>
        </Entity>
      </Scene> -->
    </div>

    <div v-if="!splash" class="mHome fade-in-home">
      <div class="mImgBackgroundOverlay"></div>
      <div v-if="menu" class="mBackgroundOverlay fade-in fade-out"></div>

      <!-- desktop tripartition -->
      <div class="mTripartition">
        <div
          class="mTrip m1 mTripSx"
          :class="[
            {
              mTripSxHover: mTripSxHover,
              mTripHidden: mTripDxHover,
              mShort: mTripDxHover,
              hide: pushedAbout,
              pushingContents: pushedContents,
              pushingBlogOthers: pushedBlog,
            },
          ]"
        >
          <q-img
            v-if="img_sx && mTripSxHover"
            :src="img_sx"
            class="grey lighten-2 tripBackground"
            :transition="`fade`"
          >
          </q-img>
          <div
            class="mTripText mTripTextSx"
            @mouseenter="mTripSxHover = true"
            @mouseleave="mTripSxHover = false"
            @click="pushContents"
          >
            <div class="mLine mLineSx"></div>
            WE DO
          </div>
        </div>
        <div
          class="mTrip mTripCenter m2"
          :class="[
            {
              mTripCenterHover: mTripCenterHover,
              mTripCenterHidden: mTripDxHover,
              mTripCenterHidden_2: mTripSxHover,
              pushingAbout: pushedAbout,
              pushingBlogOthers: pushedBlog,
              pushingContentsOthers: pushedContents,
            },
          ]"
        >
          <video
            v-if="mTripCenterHover"
            class="homeVideo"
            autoplay
            muted
            loop
            id="myVideo"
          >
            <source
              :src="`https://endorphinoutdoor.com/wp-content/uploads/2021/01/metamorphosi.mov`"
              type="video/mp4"
            />
          </video>
          <div
            class="mTripText mTripTextCenter"
            @mouseenter="mTripCenterHover = true"
            @mouseleave="mTripCenterHover = false"
            @click="pushAbout"
          >
            WE ARE
          </div>
          <div class="mLineBottom"></div>
        </div>

        <div
          class="mTrip m3 mTripDx"
          :class="[
            {
              mTripDxHover: mTripDxHover,
              mTripHidden: mTripSxHover,
              mShort: mTripSxHover,
              hide: pushedAbout,
              pushingBlog: pushedBlog,
              pushingContentsOthers: pushedContents,
            },
          ]"
        >
          <q-img
            v-if="img_dx && mTripDxHover"
            :src="img_dx"
            class="grey lighten-2 tripBackground"
            :transition="`fade`"
          >
          </q-img>
          <div
            class="mTripText mTripTextDx"
            @mouseenter="mTripDxHover = true"
            @mouseleave="mTripDxHover = false"
            @click="pushBlog"
          >
            WE TELL
            <div class="mLine mLineDx"></div>
          </div>
        </div>
      </div>

      <!-- mobile tripartition -->

      <div class="mTripartitionMobile">
        <div
          class="mTripMobile relative-position slide-in-left_1"
          @click="pushAboutM"
          v-ripple="{ early: true, color: 'grey' }"
        >
          <div>WE ARE</div>
        </div>
        <div
          class="mTripMobile relative-position slide-in-left_2"
          @click="pushContentsM"
          v-ripple="{ early: true, color: 'grey' }"
        >
          <div>WE DO</div>
        </div>
        <div
          class="mTripMobile relative-position slide-in-left_3"
          @click="pushBlogM"
          v-ripple="{ early: true, color: 'grey' }"
        >
          <div>WE TELL</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      splash: true,
      mTripCenterHover: false,
      mTripDxHover: false,
      mTripSxHover: false,
      pushedAbout: false,
      pushedBlog: false,
      pushedContents: false,
      bkgImageUrl:
        "https://endorphinoutdoor.com/wp-content/uploads/2020/10/crinale_drone-1-scaled.jpg",
      bkgImage: null,
      backgrounds_sx_url: [
        "https://endorphinoutdoor.com/wp-content/uploads/2016/03/DSCF8041_full-scaled.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2016/03/dega_hoka_1.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2020/09/kask_azione_2_sito.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2020/12/rino_rains_3.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2016/03/DSCF8041_full-scaled.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2020/12/vega_3.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2020/12/anello_1-scaled.jpg",
      ],

      backgrounds_dx_url: [
        "https://endorphinoutdoor.com/wp-content/uploads/2021/01/DJI_0015-2.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2021/01/DSCF9374.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2021/01/drone_pradaccio-scaled.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2021/01/DSCF9315.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2021/01/DSCF9355.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2021/01/DSCF9473.jpg",
        "https://endorphinoutdoor.com/wp-content/uploads/2021/01/drone_pradaccio-scaled.jpg",
      ],
      backgrounds_sx: [],
      backgrounds_dx: [],

      img_sx: null,
      img_dx: null,
    };
  },
  created() {
    this.backImgs();
    console.log(window.innerWidth);
    this.$store.commit("isMetamorphosis", true);
    this.preloadImgs();
    this.$store.commit("selectEl", "mHome");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", false);
    }, 2000);
  },
  methods: {
    pushAboutM() {
      this.pushedAbout = true;
      this.$router.push({
        name: "mWeAre",
        // params: { eventName: this.event.name },
      });
    },
    pushBlogM() {
      this.pushedBlog = true;
      this.$router.push({
        name: "mWeTell",
        // params: { eventName: this.event.name },
      });
    },
    pushContentsM() {
      this.pushedContents = true;
      this.$router.push({
        name: "mWeDo",
        // params: { eventName: this.event.name },
      });
    },
    pushAbout() {
      this.pushedAbout = true;
      setTimeout(() => {
        this.$router.push({
          name: "mWeAre",
          // params: { eventName: this.event.name },
        });
      }, 2000);
    },
    pushBlog() {
      this.pushedBlog = true;
      setTimeout(() => {
        this.$router.push({
          name: "mWeTell",
          // params: { eventName: this.event.name },
        });
      }, 2000);
    },
    pushContents() {
      this.pushedContents = true;
      setTimeout(() => {
        this.$router.push({
          name: "mWeDo",
          // params: { eventName: this.event.name },
        });
      }, 2000);
    },
    setSplash() {
      setTimeout(() => {
        this.splash = false;
      }, 2000);
    },
    preloadImgs() {
      for (const url of this.backgrounds_dx_url) {
        var imgDx = new Image();
        imgDx.src = url;
        this.backgrounds_dx.push(imgDx.src);
      }
      for (const url of this.backgrounds_sx_url) {
        var imgSx = new Image();
        imgSx.src = url;
        this.backgrounds_sx.push(imgSx.src);
      }
      var imgBkg = new Image();
      imgBkg.src = this.bkgImageUrl;
      this.bkgImage = imgBkg.src;

      this.setSplash();
    },
    backImgs() {
      // random
      // setInterval(() => {
      //   this.img_sx = this.backgrounds_sx[
      //     Math.floor(Math.random() * this.backgrounds_sx.length)
      //   ];
      //   this.img_dx = this.backgrounds_dx[
      //     Math.floor(Math.random() * this.backgrounds_dx.length)
      //   ];
      // }, 4000);

      // sequential
      var i = 0;
      this.img_sx = this.backgrounds_sx[i];
      setInterval(() => {
        i++;
        if (i == this.backgrounds_sx.length) {
          i = 0;
        }
        this.img_sx = this.backgrounds_sx[i];
        this.img_dx = this.backgrounds_dx[i];
      }, 4000);
    },
  },
  computed: {
    ...mapState({
      isLoggedIn: "isLoggedIn",
      userRole: "userRole",
      globalMessage: "globalMessage",
      isMetamorphosis: "isMetamorphosis",
      menu: "menu",
    }),
    cameraZoom: function () {
      var w = window.innerWidth;
      if (w < 600) {
        return 15;
      } else {
        return 5;
      }
    },
  },
};
</script>
<style lang="scss">
.slide-in-left_1 {
  -webkit-animation: slide-in-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slide-in-left_2 {
  -webkit-animation: slide-in-left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slide-in-left_3 {
  -webkit-animation: slide-in-left 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-left 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.splashText {
  color: white;
  font-size: 30px;
}
.canvasBoxBabylon {
  height: 60vh;
  width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
  canvas {
    outline: none !important;
  }
}
.mHomeBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 8000;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.mImgBackgroundOverlay {
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 8100;
  background: rgba(155, 155, 155, 0.589);
}
.mBackgroundOverlay {
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 9997;
  background: rgba(22, 22, 22, 0.589);
}
.menuEl {
  transition: 2s;
  margin: 0 10px;
  position: relative;

  &:hover {
    text-decoration: none;
    transition: 2s;
    .menuLine {
      opacity: 1;
      transition: 0.5s;
    }
  }

  .menuLine {
    position: absolute;
    top: 10px;
    opacity: 0;
    transition: 2s;
    width: 100%;
    height: 2px;
    background: white;
  }
  .menuLineShow {
    opacity: 0.7;
    transition: 0.5s;
  }
}
.mTripartition {
  position: absolute;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 9996;
  display: flex;
  justify-content: center;
  align-items: center;
  .mTrip {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 100px;
    position: relative;
    overflow: hidden;
  }
  .tripBackground {
    height: 100vh;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  .mTripCenter {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 0px;
    flex-direction: column;
    transition: 1s;
  }
  .mTripSx {
    transition: 1s !important;
  }
  .mTripDx {
    transition: 1s;
  }
  .mTripCenterHover {
    background: rgba(255, 255, 255, 0);
    transition: 1s;
    width: 60vw !important;
    position: relative;
    .homeVideo {
      height: 100%;
      position: absolute;
      transition: 2s;
      top: 0;
      z-index: 8000;
    }
  }
  .pushingAbout {
    width: 100vw !important;
    transition: 1s;
    background: white;
    color: black;
    .mTripTextCenter {
      color: black;
    }
  }

  .mTripCenterHidden,
  .mTripCenterHidden_2 {
    background: rgba(61, 61, 61, 0.897);
  }
  .mTripHidden {
    background: rgba(0, 0, 0, 0.89);
  }
  .mTripDxHover,
  .mTripSxHover {
    background: rgba(128, 128, 128, 0.404);
    transition: 1s !important;
    width: 55vw !important;
  }
  .pushingBlog,
  .pushingContents {
    width: 100vw !important;
    transition: 1s;
  }
  .pushingBlogOthers,
  .pushingContentsOthers {
    opacity: 0;
    width: 10px !important;
    transition: 1s;
  }
  .mTripText {
    position: absolute;
    bottom: 80px;
    color: white;
    font-weight: bold;
    font-size: 45px;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 9995;
  }
  .mLineSx {
    margin-right: 30px;
    transition: 1s;
  }
  .mLineDx {
    margin-left: 30px;
    transition: 1s;
  }
  .mTripTextSx {
    justify-content: flex-start;
    transition: 2s;
    left: 0px;

    &:hover {
      .mLineSx {
        width: 300px;
        transition: 2s;
      }
    }
  }
  .mTripTextDx {
    justify-content: flex-end;
    transition: 2s;
    right: 0px;

    &:hover {
      .mLineDx {
        width: 300px;
        transition: 2s;
      }
    }
  }

  .mTripTextCenter {
    transition: 2s;
    z-index: 9000;

    &:hover {
      color: black;
      transition: 2s;
    }
  }
  .mLineBottom {
    width: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-left: 0.5px solid white;
    border-right: 0.5px solid white;
  }
  .m1 {
    width: 33%;
    height: 100%;
    border-right: 0.3px solid rgba(255, 255, 255, 0.507);
  }

  .m2 {
    width: 33%;
    height: 100%;
    border-right: 0.3px solid rgba(255, 255, 255, 0.507);
  }

  .m3 {
    width: 33%;
    height: 100%;
  }
  .mShort {
    width: 28%;
  }
}
.mHome {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  z-index: 9996;
}

.mLine {
  width: 50px;
  height: 1px;
  border-bottom: 2px solid white;
}

.splash {
  color: white;
  font-weight: bold;
  font-size: 30px;
}
.pulsate-fwd {
  -webkit-animation: pulsate-fwd 1.5s ease-in-out infinite both;
  animation: pulsate-fwd 1.5s ease-in-out infinite both;
}

.fade-in-home {
  -webkit-animation: fade-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.mTripartitionMobile {
  display: none;
  position: absolute;
  top: 100px;
  width: 100vw;
  height: calc(100vh - 100px);
  z-index: 9996;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.hide {
  display: none !important;
}
.fade-out {
  -webkit-animation: fade-out 1s ease-out both;
  animation: fade-out 1s ease-out both;
}
.fade-in {
  -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

// ##
@media (max-width: 1300px) {
  .mTripartition {
    .mTripText {
      font-size: 40px;
    }
    .mLineSx {
      margin-right: 10px;
    }
    .mLineDx {
      margin-left: 10px;
    }
  }
}
// ##
@media (max-width: 1050px) {
  .mTripartition {
    display: none;
  }
  .mTripartitionMobile {
    display: flex;
  }
  .mTripMobile {
    color: white;
    font-weight: bold;
    font-size: 45px;
    cursor: pointer;
    border-bottom: 0.5px solid white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 33%;
    overflow: hidden;
  }
}
@media (max-width: 600px) {
  .canvasBoxBabylon {
    height: 100vh;
    width: 100vw;
  }
  .splashText {
    left: calc(50vw - 125px);
  }
}
</style>