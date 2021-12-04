<template>
<div class="home">
  <h1 class="submit-title">Make a new forum post!</h1>
  <form class="post-form">
    <textarea class="post-title" v-model="postInfo"></textarea>
    <button class="post-button" @click="upload">Post</button>
  </form>
  <h2>See what everyone is saying!</h2>
  <h3 class="submit-title">Our forum serves as one collective though bubble for park goers</h3>  
  <div>
    <div class="post-box" v-for="post in posts">
      <p>{{post.info1}}</p>
    </div>

  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',
  data() {
    return {
      image: require('@/assets/epcot.jpeg'),
      items: [],
      waits: [],
      posts: [],
      postInfo: "",
      title: "",
      //file: null,
      addItem: null,
    }
  },
  created() {
    this.getItems();
    //this.filterItems();
  },
  methods: {
    async filterItems() {
      for ( let i = 0; i < this.items.length; i++) {
        if (this.items[i].title == "wait") {
          this.waits.push(this.items[i]);
        }  else if (this.items[i].title == "post") {
          this.posts.push(this.items[i]);
        }
      }
      //console.log(this.posts);
      //console.log(this.waits);
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        console.log(this.items);
        this.filterItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        //formData.append('photo', this.file, this.file.name)
        //let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: "post",
          info1: this.postInfo,
          //info2: this.info2,
        });
        //this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },

  }
}</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.post-title {
  width: 100%;
  height: 100px;
  font-size: 24px;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
.submit-title {
    border-bottom-color: #ff6bc4;
    border-bottom-style: ridge;
}
.post-button {
    font-size: 24px;
}
.post-box {
  width: 100%;
  /*display: flex;*/
  border-radius: 10px;
  border: medium double #ff6bc4;
  margin: 5px;
  padding: 5px;
  -webkit-box-shadow: 0px 1px 3px 0px #3B3B3B;
  box-shadow: 0px 1px 3px 0px #3B3B3B;
}

</style>
