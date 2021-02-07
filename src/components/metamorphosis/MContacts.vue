<template>
  <div class="contBox">
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
    <div class="contactsBox" v-if="!loading">
      <div
        class="mContBkg fade-in-home"
        :style="{
          backgroundImage: `url(https://endorphinoutdoor.com/wp-content/uploads/2020/09/cavalli-corsa-scaled.jpg)`,
        }"
      >
        <div class="fotoOverlay"></div>
        <div class="contactText">metamorphosistudio@gmail.com</div>
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
    };
  },
  created() {
    this.$store.commit("selectEl", "mContacts");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", false);
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
.contactsBox {
  width: 100vw;
  height: 100vh;
}
.mContBkg {
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
}
.fotoOverlay {
  z-index: 9800;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(207, 207, 207, 0.233);
}
.contactText {
  z-index: 9900;
}
.contBox {
  min-height: 100vh;
  width: 100%;
  background: $primary-background;
}
// ##
@media (max-width: 800px) {
  .mContBkg {
    font-size: 25px;
  }
}
// ##
@media (max-width: 600px) {
  .mContBkg {
    font-size: 15px;
  }
}
</style>