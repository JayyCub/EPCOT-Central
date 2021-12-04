<template>
<div class="home">
  <img class="img" :src=image>
  <h1 class="home-title">Home</h1>
  <h3><b>Latest wait times provided by guests</b></h3>
  <div class="wait-frame">
    <div class="wait-box" v-for="wait in waits">
      <p><em>{{wait.info1}}</em></p>
      <p>{{wait.info2}} minutes</p>
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
        //filterItems();
        this.filterItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>
.home {
  margin-top: 80px;
  /*background-color: #96b3e3;*/
}
.home-title {
    border-bottom-color: #5986FF;
    border-bottom-style: ridge;
}
.img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.wait-frame {
  display: flex;
  flex-wrap: wrap;
}
.wait-box {
  width: 225px;
  /*display: flex;*/
  border-radius: 10px;
  border: medium double #285CDB;
  margin: 5px;
  padding: 5px;
  -webkit-box-shadow: 0px 1px 3px 0px #3B3B3B;
  box-shadow: 0px 1px 3px 0px #3B3B3B;
}

</style>
