<template>
  <div class="weAreBox">
    <div class="progressLoaderBkg" v-if="loading">
      <q-circular-progress
        indeterminate
        size="75px"
        :thickness="0.6"
        color="blue-grey-7"
        center-color="grey-8"
        class="q-ma-md"
      />
    </div>

    <div class="" v-if="!loading">
      <div
        class="weAreContBkg fade-in-home"
        :style="{
          backgroundImage: `url(https://endorphinoutdoor.com/wp-content/uploads/2021/01/montagne-morbide.jpg)`,
        }"
      >
        <div class="weAreCont">
          <div class="weAreTitleText">we are</div>
          <div class="weAreText">
            <p>
              METAMORPHOSI si propone come una Digital Agency che offre servizi
              di:
            </p>
            <p>
              fotografia, riprese video, grafiche ad hoc per pagine social o
              siti aziendali.
            </p>
            <p>Sviluppo siti web, e-commerce e mobile app</p>
            Per noi è fondamentale instaurare un rapporto di fiducia reciproca
            con il cliente, capire e soddisfare qualsiasi sua esigenza.
          </div>
        </div>
        <div class="weAreCont team" v-if="test">
          <div class="weAreTitleText">team</div>
          <div class="teamEl">
            <div class="weAreText memberName">Filippo Tommasini:</div>
            <div class="weAreText memberName">Nicola Solzi:</div>
          </div>
        </div>
        <div class="fotoOverlayWeAre"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      test: false,
    };
  },
  created() {
    this.$store.commit("selectEl", "mAbout");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);

    // i need it to fix a frontend bug when pushing the route from homepage
    setTimeout(() => {
      this.getBkg();
    }, 2000);
    // test of custom endpoint wp api
    // this.getTest();
  },
  methods: {
    async getTest() {
      // test of custom endpoint wp api
      var res = (
        await axios.get(
          `https://endorphinoutdoor.com/wp-json/customendpoint/v1/latest-posts/3`
        )
      ).data;
      console.log(res);
    },
    async getBkg() {
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";
.weAreBox {
  width: 100vw;
  height: 100vh;
}
.progressLoaderBkg {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weAreContBkg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 8000;
  background-repeat: no-repeat;
  // background-attachment: fixed;
  background-position: center;
  background-size: cover;
  font-size: 50px;
  z-index: 9700;
  padding-top: 40px;
}
.fotoOverlayWeAre {
  z-index: 9800;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(207, 207, 207, 0.233);
}
.weAreCont {
  width: 60%;
  padding: 0 10%;
  text-align: center;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9900;
}
.teamEl {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 70%;
}
.weAreTitleText {
  font-size: 35px;
  margin-bottom: 20px;
}
.weAreText {
  font-size: 20px;
}
.memberName {
  font-weight: bold;
  margin-bottom: 10px;
}
.weAreBox {
  min-height: 100vh;
  width: 100%;
  background: $primary-background;
}
// ##
@media (max-width: 800px) {
  .weAreContBkg {
    font-size: 25px;
    flex-direction: column;
    justify-content: space-around;
  }
  .weAreCont {
    width: 100%;
    padding: 0 3%;
  }
  .weAreText {
    font-size: 10px;
  }
}
// ##
@media (max-width: 600px) {
  .weAreContBkg {
    font-size: 15px;
  }
  .weAreContBkg {
    padding-top: 80px;
  }
}
</style>