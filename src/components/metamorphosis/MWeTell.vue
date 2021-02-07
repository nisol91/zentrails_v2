<template>
  <div class="mBlogBox">
    <div class="blogPosts" v-if="!loaded">
      <div class="blogPostSkel" v-for="(post, i) in 20" :key="i + `_blogPost`">
        <q-skeleton :animation="'pulse'" class="skel" />
        <q-skeleton :animation="'pulse'" class="skel" />
        <q-skeleton :animation="'pulse'" class="skel" />
      </div>
    </div>

    <div class="blogPosts" v-if="loaded">
      <div class="searchBarPosts">
        <div>Search post</div>
        <input
          type="text"
          v-model="searchValue"
          class="form-control blogSearchForm"
          @keyup="searchEvent(searchValue)"
        />
      </div>

      <div
        class="blogPost"
        v-for="(post, i) in blogPostsFiltered"
        :key="i + `_blogPost`"
      >
        <div class="pSx">
          <div class="pCategory">
            <div
              class="pCat"
              v-for="(cat, i) in post.catNames"
              :key="i + `_tag`"
              @click="
                filterTax(cat.id, 'categories');
                catSelected = cat.name;
              "
            >
              {{ cat.name }}
              <div class="pLine"></div>
            </div>
          </div>
          <router-link
            class="pTitle"
            :to="{
              name: 'mBlogPost',
              params: { id: post.id },
            }"
            >{{ post.title.rendered }}</router-link
          >

          <div v-html="post.excerpt.rendered" class="pSubTitle"></div>
          <div class="pDate">
            {{ new Date(post.date) | moment("dddd, MMMM Do YYYY") }}
          </div>

          <div class="pTags">
            <div
              class="pTag"
              v-for="(tag, i) in post.tagNames"
              :key="i + `_tag`"
              @click="filterTax(tag.id, 'tags')"
            >
              {{ tag.name }}
              <div class="pLine"></div>
            </div>
          </div>
        </div>
        <div class="pDx">
          <v-img
            v-if="post.featured_image_src"
            :src="post.featured_image_src"
            class="grey lighten-2 pMedia blogImage"
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
    <div class="blogFilters">
      <div class="fTitle">categories:</div>
      <q-circular-progress
        v-if="categories.length == 0"
        indeterminate
        size="75px"
        :thickness="0.6"
        color="blue-grey-7"
        center-color="grey-8"
        class="q-ma-md"
      />
      <div class="fCats">
        <div
          class="fCat"
          v-for="(cat, i) in categories"
          :key="i + `_catz`"
          @click="
            filterTax(cat.id, 'categories');
            catSelected = cat.name;
          "
          :class="[
            {
              catSelected: cat.name == catSelected,
            },
          ]"
        >
          {{ cat.name }}
        </div>
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
import _ from "lodash";

export default {
  data() {
    return {
      blogPosts: {},
      blogPostsFiltered: {},
      categories: [],
      catSelected: "",
      tags: [],
      env: process.env.VUE_APP_DB_ENV,
      adminCode: null,
      loaded: false,
      searchValue: null,
    };
  },
  created() {
    this.getAdminCode();
    this.$store.commit("selectEl", "mBlog");
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);
  },
  methods: {
    searchEvent(val) {
      this.blogPostsFiltered = _.filter(this.blogPosts, function (o) {
        if (o.title.rendered) {
          return o.title.rendered.includes(val);
        }
      });
    },
    async filterTax(tax, type) {
      this.loaded = false;
      try {
        this.blogPosts = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?${type}=${tax}`
          )
        ).data;
      } catch (error) {
        console.log(error);
      }
      this.blogPostsFiltered = this.blogPosts;
      await this.getOtherFields();

      this.loaded = true;
    },
    async getPosts() {
      try {
        this.blogPosts = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?categories_exclude=46,47,48,49`
          )
        ).data;
        this.blogPostsFiltered = this.blogPosts;
      } catch (error) {
        console.log(error);
      }
    },
    async getOtherFields() {
      try {
        if (this.categories.length == 0 && this.tags.length == 0) {
          var categories = [];
          var tags = [];

          var categoriesRaw = (
            await axios.get(
              `https://endorphinoutdoor.com/wp-json/wp/v2/categories?exclude=46,47,48,49`
            )
          ).data;

          var tagsRaw = (
            await axios.get(`https://endorphinoutdoor.com/wp-json/wp/v2/tags`)
          ).data;

          // ----
          categoriesRaw.forEach((cat) => {
            var temp = new Object();
            temp["id"] = cat.id;
            temp["name"] = cat.name;
            temp["slug"] = cat.slug;
            categories.push(temp);
            // if (cat.slug !== "works") {
            // }
          });
          this.categories = categories;
          //
          tagsRaw.forEach((tag) => {
            var temp = new Object();
            temp["id"] = tag.id;
            temp["name"] = tag.name;
            temp["slug"] = tag.slug;
            tags.push(temp);
          });
          this.tags = tags;
        }

        // ---- aggiungo i fields aggiuntivi ai post di wp
        var posts = this.blogPosts;
        for (const [i, post] of posts.entries()) {
          post["catNames"] = [];
          post["tagNames"] = [];

          // if (post.featured_media !== 0) {
          //   post["featured_media_url"] = (
          //     await axios.get(
          //       `https://endorphinoutdoor.com/wp-json/wp/v2/media/${post.featured_media}`
          //     )
          //   ).data.source_url;
          // }

          post.categories.forEach((postCat) => {
            this.categories.forEach((cat) => {
              if (postCat === cat.id) {
                post["catNames"].push({ name: cat.name, id: cat.id });
              }
            });
          });
          post.tags.forEach((postTag) => {
            this.tags.forEach((tag) => {
              if (postTag === tag.id) {
                post["tagNames"].push({ name: tag.name, id: tag.id });
              }
            });
          });
        }
        this.blogPosts = posts;
        this.blogPostsFiltered = posts;
      } catch (error) {
        console.log(error);
      }
    },

    async getAdminCode() {
      this.loaded = false;
      this.$store
        .dispatch("getEnvVariables")
        .then((env) => {
          this.adminCode = env[0].superAdmin;
        })
        .then(await this.getPosts())
        .then(await this.getOtherFields())
        .then((this.loaded = true));
    },
  },
  computed: {
    ...mapState({
      user: "user",
      userRole: "userRole",
      menuEl: "menuEl",
    }),
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";

.form-control {
  margin-top: 10px;
  border-color: rgba(255, 255, 255, 0.383) !important;

  &:focus {
    border-color: rgba(183, 205, 211, 0.383) !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.blogImage {
  transition: 1s;

  &:hover {
    opacity: 0.8;
    transition: 1s;
  }
}
.skel {
  width: 80% !important;
}
.searchBarPosts {
  width: 90%;
  margin: 20px;
}
.mBlogBox {
  width: 100%;
  min-height: 100vh;
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: $primary-background;
}
.blogPosts {
  width: 80%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-right: 0.5px solid rgba(197, 197, 197, 0.644);
}

.blogFilters {
  width: 20%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 30px 0;
  .fTitle {
    font-size: 20px;
  }
  .fCats {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .fCat {
    cursor: pointer;
    transition: 1s;
    margin-top: 10px;
    &:hover {
      color: grey;
      transition: 1s;
    }
  }
  .catSelected {
    background: $primary-color;
    transition: 1s;
    padding: 3px;
  }
}
.blogPost {
  width: 90%;
  height: auto;
  background: white;
  border-radius: 3px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.blogPostSkel {
  width: 80%;
  height: 200px;
  background: white;
  border-radius: 3px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}
.pTitle {
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
  transition: 0.5s;
  padding: 5px;
  margin: 10px 0;

  &:hover {
    background: rgb(194, 194, 194);
    transition: 0.5s;
    border-radius: 3px;
  }
}
.pSx {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 5px;
}
.pDx {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pSubTitle {
  font-size: 15px;
  margin-left: 5px;
}
.pMedia {
  width: 100%;
  max-height: 100%;
  border-radius: 4px;
}
.pCategory {
  font-style: italic;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.pCat {
  background: $primary-color;
  margin: 3px 3px;
  overflow: hidden;
  position: relative;
  padding: 5px;
  border-radius: 3px;
  font-size: 10px;

  .pLine {
    opacity: 0;
    height: 2px;
    width: 100%;
    position: absolute;
    top: 19px;
    right: 105px;
    background: black;
    transition: 0.5s;
  }
  &:hover {
    transition: 0.5s;
    background: rgba(98, 98, 98, 0.74);
  }
}
.editPost {
  margin: 0 30px;
  cursor: pointer;
}
.pDate {
  font-weight: 700;
  font-size: 12px;
  margin: 5px 0;
  margin-left: 5px;
}
.pTags {
  cursor: pointer;
  display: flex;
  margin: 5px 0;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  .pTag {
    margin-right: 5px;
    overflow: hidden;
    position: relative;
    padding: 5px;
    font-size: 10px;
    width: auto;
    .pLine {
      height: 2px;
      width: 100%;
      position: absolute;
      top: 22px;
      right: 105px;
      background: black;
      transition: 0.5s;
      opacity: 0;
    }
    &:hover {
      .pLine {
        right: 0px;
        transition: 0.5s;
        opacity: 1;
      }
    }
  }
}
// ##
@media (max-width: 800px) {
  .blogPost {
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
  }
  .pSx,
  .pDx {
    width: 100%;
  }
  .pCat,
  .pTag {
    font-size: 10px !important;
  }
  .pLine {
    height: 1.2px !important;
  }
  .mBlogBox {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
  .blogPosts {
    width: 100%;
    border-right: none;
  }
  .blogFilters {
    width: 100%;
    height: auto;
    padding: 30px;
    .fCats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: row;
    }
    .fCat {
      border: 1px solid lightgrey;
      border-radius: 3px;
      padding: 3px;
      transition: 1s;
    }
  }
}
</style>