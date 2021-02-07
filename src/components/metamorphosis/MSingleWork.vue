<template>
  <div class="wBox">
    <div v-if="!work" class="loaderBox">
      <q-circular-progress
        indeterminate
        size="75px"
        :thickness="0.6"
        color="blue-grey-7"
        center-color="grey-8"
        class="q-ma-md"
      />
    </div>

    <div
      class="headerMediaWorksBox"
      v-if="work && work.featured_image_src && !work.categories.includes(47)"
    >
      <v-img
        v-if="work && work.featured_image_src"
        :src="work.featured_image_src"
        class="grey lighten-2 headerMediaWorks"
        :aspect-ratio="16 / 9"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
    <div
      class="singleWork"
      :class="[
        {
          safariWork: isSafari,
          morePaddingTop: work && work.categories.includes(47),
        },
      ]"
    >
      <div v-if="work" v-html="work.content.rendered"></div>
    </div>
    <div class="postFooter relWorks">
      <div class="relTitle">RELATED WORKS</div>

      <q-circular-progress
        v-if="!relatedWorks"
        indeterminate
        size="75px"
        :thickness="0.6"
        color="blue-grey-7"
        center-color="grey-8"
        class="q-ma-md"
      />
      <div
        class="relWork"
        v-for="(work, i) in relatedWorks"
        :key="i + `_blogRelatedWork`"
      >
        <div class="relWorkTitle" @click="pushWork(work.id)">
          {{ work.title.rendered }}
        </div>
        <v-img
          v-if="work.featured_image_src"
          :src="work.featured_image_src"
          class="grey lighten-2 relWorkImg"
          :aspect-ratio="16 / 9"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Platform } from "quasar";

export default {
  data() {
    return {
      work: null,
      relatedWorks: null,
      isSafari: false,
    };
  },
  async created() {
    console.log(Platform.is);
    if (Platform.is.name === "safari") {
      this.isSafari = true;
    }
    await this.getWork();
    await this.getRelatedWorks();
    console.log(this.work);

    this.url = process.env.VUE_APP_URL + this.$route.fullPath;
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);
  },
  methods: {
    async getWork() {
      try {
        var work = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts/${this.$route.params.id}`
          )
        ).data;
        // add custom field
        var acf = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/acf/v3/posts/${work.id}`
          )
        ).data.acf;
        work["acf"]["client_name"] = acf.client_name;
        work["acf"]["year"] = acf.year;
        work["acf"]["technologies"] = acf.technologies;
        this.work = work;
      } catch (error) {
        console.log(error);
      }
    },
    async getRelatedWorks() {
      try {
        var relatedWorks = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?categories=46&exclude=${this.work.id}&per_page=3`
          )
        ).data;
        // for (const work of relatedWorks) {
        //   if (work.featured_media !== 0) {
        //     work["featured_media_url"] = (
        //       await axios.get(
        //         `https://endorphinoutdoor.com/wp-json/wp/v2/media/${work.featured_media}`
        //       )
        //     ).data.source_url;
        //   }
        // }
        for (const [i, w] of relatedWorks.entries()) {
          if (w.id === this.work.id) {
            relatedWorks.splice(i, 1);
          }
        }
        this.relatedWorks = relatedWorks;
      } catch (error) {
        console.log(error);
      }
    },
    pushWork(id) {
      this.$vuetify.goTo(0);
      setTimeout(() => {
        this.$router
          .push({
            name: "mSingleWork",
            params: { id: id },
          })
          .then(location.reload());
      }, 1000);
    },
  },
};
</script>
<style lang="scss">
// molte regole del single work sono in comune con il blog post
.headerMediaWorksBox {
  height: 130vh !important;
}
.loaderBox {
  width: 100%;
  height: 100vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headerMediaWorks {
  position: absolute;
  top: -100px;
  left: 0px;
  width: 100vw !important;
  height: 130vh !important;
}
.wBox {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  padding-top: 100px;
}
.singleWork {
  margin: 20px;
  min-height: 80vh;
  width: 100%;
  padding: 20px 10vw;
}
.morePaddingTop {
  padding-top: 120px !important;
}
.safariWork {
  .wp-block-video {
    height: 500px !important;
  }
}

.relWork {
  width: 300px;
  height: 80%;
  padding: 10px;
  margin: 10px;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .relWorkImg {
    width: 100%;
    border-radius: 3px;
  }
  .relWorkTitle {
    cursor: pointer;
    padding: 3px;
    transition: 1s;
    margin: 3px;
    padding: 3px;
    text-align: center;
    border-radius: 3px;
    &:hover {
      background: rgba(128, 128, 128, 0.589);
      transition: 1s;
    }
  }
}

.relWorks {
  position: relative;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 20px 0;
  .relTitle {
    position: absolute;
    left: 40px;
    top: -10px;
    background: #bec0c8;
    padding: 0 20px;
  }
}
// ##
@media (max-width: 1000px) {
  .singleWork {
    padding: 20px 0vw;
  }

  .wBox {
    padding: 10px 3px;
  }
  .morePaddingTop {
    padding-top: 120px !important;
  }
}
// ##
@media (max-width: 700px) {
  .relWorks {
    flex-direction: column;
    height: auto;
    .relWork {
      width: 80%;
    }
  }
  .headerMediaWorks {
    img {
      zoom: 50% !important;
    }
  }
}
// ##
@media (min-height: 1000px) {
  .headerMediaWorksBox {
    height: 130vh !important;
  }
  .headerMediaWorks {
    position: absolute;
    top: -100px;
    left: 0px;
    width: 100vw !important;
    height: 130vh !important;
  }
}
// ##
@media (min-width: 1800px) {
  .singleWork {
    padding: 20px 31vw;
  }
  .morePaddingTop {
    padding-top: 120px !important;
  }
}
// ##
// @media (min-width: 2800px) {
//   .singleWork {
//     padding: 20px 31vw;
//   }
// }
</style>