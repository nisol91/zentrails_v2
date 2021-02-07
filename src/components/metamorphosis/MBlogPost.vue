<template>
  <div class="editorBox">
    <div class="headerMediaBox" v-if="post && post.featured_image_src">
      <v-img
        v-if="post && post.featured_image_src"
        :src="post.featured_image_src"
        class="grey lighten-2 headerMedia"
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

    <div class="load" v-if="!post">
      <q-linear-progress
        indeterminate
        rounded
        color="primary"
        class="q-mt-sm"
      />
    </div>

    <div class="postBox" v-if="post">
      <div class="postTitle" v-if="post">{{ post.title.rendered }}</div>
      <div class="postDate" v-if="post">
        {{ new Date(post.date) | moment("dddd, MMMM Do YYYY") }}
      </div>

      <div class="postCategory" v-if="post">
        <div class="pCat" v-for="(cat, i) in post.catNames" :key="i + `_tag`">
          {{ cat.name }}
        </div>
      </div>
      <div class="post" v-if="post" v-html="post.content.rendered"></div>
      <div class="postFooter postShare">
        <div class="shareTitle">SHARE</div>

        <ShareNetwork
          class="shareIcons"
          network="facebook"
          :url="url"
          title="fb"
        >
          <v-icon>mdi-facebook</v-icon>
        </ShareNetwork>
        <ShareNetwork
          class="shareIcons"
          network="twitter"
          :url="url"
          title="insta"
        >
          <v-icon>mdi-twitter</v-icon>
        </ShareNetwork>
      </div>
      <div class="relPostsTopBar">
        <div class="relTitle">RELATED POSTS</div>
      </div>
      <div class="relPosts">
        <q-circular-progress
          v-if="!relatedPosts"
          indeterminate
          size="75px"
          :thickness="0.6"
          color="blue-grey-7"
          center-color="grey-8"
          class="q-ma-md relPostProgress"
        />
        <div
          class="relPost"
          v-for="(post, i) in relatedPosts"
          :key="i + `_blogRelatedPost`"
        >
          <div class="relPostTitle" @click="pushPost(post.id)">
            {{ post.title.rendered }}
          </div>
          <v-img
            v-if="post.featured_image_src"
            :src="post.featured_image_src"
            class="grey lighten-2 relPostImg"
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
      <div class="postFooter comments">
        <div class="commentsTitle">COMMENTS</div>
        <q-circular-progress
          v-if="!comments"
          indeterminate
          size="75px"
          :thickness="0.6"
          color="blue-grey-7"
          center-color="grey-8"
          class="q-ma-md"
        />
        <div
          class="comment"
          v-for="(comment, i) in comments"
          :key="i + `_comment`"
        >
          <div class="commentTitle">{{ comment.author_name }}</div>
          <div class="" v-html="comment.content.rendered"></div>
        </div>
        <v-form
          action="#"
          @submit.prevent="addComment"
          ref="form"
          v-model="valid"
          lazy-validation
          class="commentForm"
        >
          <v-textarea
            name="input-7-1"
            filled
            label="Comment here"
            class="commentContent"
            auto-grow
            v-model="form.content"
          ></v-textarea>
          <v-text-field
            label="name"
            :rules="rules"
            value
            required
            v-model="form.name"
          ></v-text-field>
          <v-btn
            class="saveEvent"
            type="submit"
            color="primary"
            rounded
            dark
            depressed
          >
            post comment
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueMoment from "vue-moment";
import VueSocialSharing from "vue-social-sharing";

export default {
  data() {
    return {
      post: null,
      relatedPosts: null,
      categories: [],
      tags: [],
      comments: null,
      url: "",
      valid: true,
      rules: [
        (v) => !!v || "field is required",
        (v) => (v && v.length >= 1) || "Name must be more than 1 characters",
      ],
      form: {
        name: "",
        content: "",
      },
    };
  },
  async created() {
    await this.getPost();
    await this.getRelatedPost();
    await this.getComments();
    this.url = process.env.VUE_APP_URL + this.$route.fullPath;
    setTimeout(() => {
      this.$store.commit("toggleHomeMenuColor", true);
    }, 2000);
  },

  methods: {
    async addComment() {
      var commentPost = await axios.post(
        `https://endorphinoutdoor.com/wp-json/wp/v2/comments`,
        {
          author_name: this.form.name,
          content: this.form.content,
          post: this.post.id,
        }
      );
      console.log(commentPost);
    },
    async getComments() {
      var comments = (
        await axios.get(
          `https://endorphinoutdoor.com/wp-json/wp/v2/comments?post=${this.post.id}`
        )
      ).data;
      console.log(comments);
      this.comments = comments;
    },
    pushPost(id) {
      this.$vuetify.goTo(0);
      setTimeout(() => {
        this.$router
          .push({
            name: "mBlogPost",
            params: { id: id },
          })
          .then(location.reload());
      }, 1000);
    },
    async getRelatedPost() {
      try {
        var relatedPosts = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts?cat=${this.categories[0].id}&categories_exclude=46,47,48,49&per_page=4`
          )
        ).data;

        console.log(relatedPosts);
        for (const [i, p] of relatedPosts.entries()) {
          if (p.id === this.post.id) {
            relatedPosts.splice(i, 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
      try {
        // ---- aggiungo i fields aggiuntivi ai post di wp
        for (const post of relatedPosts) {
          post["catNames"] = [];
          post["tagNames"] = [];

          // post["featured_media_url"] = (
          //   await axios.get(
          //     `https://endorphinoutdoor.com/wp-json/wp/v2/media/${post.featured_media}`
          //   )
          // ).data.source_url;
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
        this.relatedPosts = relatedPosts;

        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
    },
    async getPost() {
      try {
        var post = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/posts/${this.$route.params.id}`
          )
        ).data;
        // console.log(this.coordinates);
      } catch (error) {
        console.log(error);
      }
      try {
        if (this.categories.length == 0 && this.tags.length == 0) {
          var categories = [];
          var tags = [];

          var categoriesRaw = (
            await axios.get(
              `https://endorphinoutdoor.com/wp-json/wp/v2/categories`
            )
          ).data;

          var tagsRaw = (
            await axios.get(`https://endorphinoutdoor.com/wp-json/wp/v2/tags`)
          ).data;

          // ---- aggiungo i fields aggiuntivi ai post di wp
          categoriesRaw.forEach((cat) => {
            var temp = new Object();
            temp["id"] = cat.id;
            temp["name"] = cat.name;
            temp["slug"] = cat.slug;
            categories.push(temp);
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

        // ----
        post["catNames"] = [];
        post["tagNames"] = [];

        post["featured_media_url"] = (
          await axios.get(
            `https://endorphinoutdoor.com/wp-json/wp/v2/media/${post.featured_media}`
          )
        ).data.source_url;
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
        this.post = post;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.headerMedia {
  position: absolute;
  top: -120px;
  left: 0px;
  width: 100vw !important;
  height: 130vh !important;
}
.headerMediaBox {
  height: 130vh !important;
}
.shareIcons {
  text-decoration: none !important;

  &:hover {
    text-decoration: none;
  }
}
.load {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.postBox {
  width: 100%;
}
.postFooter {
  width: 100%;
  height: 100px;
  border-top: 2px solid grey;
}
.comments {
  position: relative;

  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
  .commentsTitle {
    position: absolute;
    left: 40px;
    top: -11px;
    background: #bec0c8;
    padding: 0 20px;
  }
  .comment {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    border-bottom: 2px solid grey;
    .commentTitle {
      font-weight: bold;
    }
  }
}
.commentContent {
  width: 100%;
}
.commentForm {
  height: auto;
  width: 100%;
  padding-top: 30px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.relPosts::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.relPosts {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.relPost {
  width: 100px;
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
  flex-shrink: 0;
  flex-basis: 40%;
  flex-grow: 0;

  .relPostImg {
    width: 60%;
    border-radius: 3px;
  }
  .relPostTitle {
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
.relPostsTopBar {
  width: 100%;
  height: 10px;
  border-top: 2px solid grey;
  position: relative;

  .relTitle {
    position: absolute;
    left: 40px;
    top: -10px;
    background: #bec0c8;
    padding: 0 20px;
  }
}
.relPostProgress {
  margin-left: 45vw !important;
}
.relPosts {
  overflow-x: scroll;
  overflow-y: auto;
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding: 20px 0;
  flex-wrap: nowrap;
  flex-shrink: 0;
}
.postShare {
  position: relative;
  height: 70px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .shareTitle {
    position: absolute;
    left: 40px;
    top: -10px;
    background: #bec0c8;
    padding: 0 20px;
  }
}
.wp-block-video {
  display: flex;
  justify-content: center;
  width: 100%;
  video {
    width: 100% !important;
    min-width: 100% !important;
  }
}

.wp-block-cover {
  background-size: cover;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-position: center;
}
.wp-block-columns {
  display: flex;
  justify-content: center;
  width: 100%;
}
.wp-block-column {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.post,
.singleWork {
  a {
    text-decoration: underline !important;
    &:hover {
      font-weight: bold;
    }
  }
}
.wp-block-image {
  overflow: hidden;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
  }
}
.wpCustomMarginDxImage {
  margin-right: 5px !important;
}
.wpCustomMarginSxImage {
  margin-left: 5px !important;
}
.wp-block-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .wp-block-button {
    width: 30%;

    .wp-block-button__link {
      width: 100%;
      background: rgba(75, 77, 102, 0.795);
      border-radius: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none !important;
    }
  }
}
.postCategory {
  font-style: italic;
  width: 100%;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
}
.postTitle {
  font-size: 40px;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.postDate {
  font-size: 15px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.has-text-align-right,
.alignright {
  text-align: right !important;
}
.has-text-align-left,
.alignleft {
  text-align: left !important;
}
.has-text-align-center,
.aligncenter {
  text-align: center !important;
}

.has-small-font-size {
  font-size: 13px;
}
.has-normal-font-size {
  font-size: 16px;
}
.has-medium-font-size {
  font-size: 20px;
}
.has-large-font-size {
  font-size: 36px;
}
.has-huge-font-size {
  font-size: 42px;
}

.postBox {
  width: 100%;
  padding: 20px;
}
.actions {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.is-active {
  background: rgb(71, 71, 71);
}

.editorBox {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 120px;
}
.post {
  width: 100%;
  border-top: 2px solid rgba(128, 128, 128, 0.603);
  margin-top: 20px;
  padding: 20px 20vw;
}
.editor {
  height: 100%;
}
// ##
@media (max-width: 700px) {
  .relPosts {
    .relPost {
      flex-basis: 80%;
    }
  }
}
// ##
@media (min-height: 1000px) {
  .headerMediaBox {
    height: 100vh !important;
  }
  .headerMedia {
    position: absolute;
    top: -120px;
    left: 0px;
    width: 100vw !important;
    height: 100vh !important;
  }
}
// ##
@media (max-width: 1000px) {
  .post {
    padding: 20px 0vw;
  }
  .postBox {
    padding: 5px;
  }
}

// ##
@media (max-width: 800px) {
  .wp-block-column {
    width: 100%;
  }
  .wp-block-image {
    overflow: hidden;
    text-align: center;
    img {
      // width: 100px !important;
      // height: auto !important;
      max-width: 100% !important;
      height: auto !important;
    }
  }
  .wp-block-button {
    width: 50% !important;
  }
}
// ##
@media (max-width: 600px) {
  .postTitle {
    font-size: 30px;
  }
  .post {
    h2 {
      font-size: 50px !important;
    }
  }
}
// ##
@media (min-width: 1600px) {
  .post {
    padding: 20px 30vw;
  }
}
</style>
