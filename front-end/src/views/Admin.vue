<template>
<div class="home">
  <h1 class="admin-title">Administrator Hub</h1>
  <h3><b>Manage wait times and forum postings</b></h3>
  <div class="admin-split">
    <div class="heading">
      <h2>Edit wait time</h2>
    </div>
    <div class="edit">
      <div class="form">
        <div class="suggestions" v-if="suggestions_waits.length > 0">
          <div class="suggestion" v-for="s in suggestions_waits" :key="s.id" @click="selectWait(s)">{{s.info1}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <h3>{{findItem.info1}}</h3>
        <!--<input v-model="findItem.info1">-->
        <p>Posted wait time: {{findItem.info2}} minutes</p>
        <p>New wait time:</p>
        <select v-model="timeSelect" name="times" id="times">
          <option value="closed">Closed</option>
          <option value="0">0</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
          <option value="60">60</option>
          <option value="60+">60+</option>
        </select>
        <button @click="updateTime(findItem, timeSelect)">Edit</button>
      </div>
    </div>
  </div>
  <div class="admin-split">
    <div class="heading">
      <h2>Moderate Forum Posts</h2>
    </div>
    <div class="edit">
      <div class="form">
        <div class="suggestions" v-if="suggestions_posts.length > 0">
          <div class="suggestion" v-for="s in suggestions_posts" :key="s.id" @click="selectPost(s)">{{s.info1}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findPost">
        <h3>Post Content:</h3>
        <p>{{findPost.info1}}</p>
        <button @click="deleteItem(findPost)">Delete</button>
      </div>
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
      items: [],
      waits: [],
      posts: [],
      title: "",
      //file: null,
      addItem: null,
      findTitle: "",
      findItem: null,
      timeSelect: "",
      findPost: null,
    }
  },
  computed: {
    suggestions_waits() {
      let items_waits = this.waits.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items_waits.sort((a, b) => a.title > b.title);
    },
    suggestions_posts() {
      let items_posts = this.posts.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items_posts.sort((a, b) => a.title > b.title);
    }

  },

  created() {
    this.getItems();
    //this.filterItems();
  },
  methods: {
    selectWait(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    selectPost(item) {
      this.findTitle = "";
      this.findPost = item;
    },


    async filterItems() {
      console.log("IN FILTER");
      for ( let i = 0; i < this.items.length; i++) {
        if (this.items[i].title == "wait") {
          this.waits.push(this.items[i]);
        }  else if (this.items[i].title == "post") {
          this.posts.push(this.items[i]);
        }
      }
      console.log(this.posts);
      console.log(this.waits);
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
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        //formData.append('photo', this.file, this.file.name)
        //let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          info1: this.info1,
          info2: this.info2,
        });
        //this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        //this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateTime(item, newTime) {
      try {
        await axios.put("/api/items/" + item._id, {
          info2: newTime,
        });
        this.findItem = null;
        //this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },


  },


}
</script>

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

.form {
  width: 400px;
  /*margin-right: 20px;*/
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
  width: 300px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
.admin-title {
    border-bottom-color: #9b5ced;
    border-bottom-style: ridge;
}
.admin-frame {
  
}
.admin-split {
  width: 100%;
}
.ride-tile {
  width: 40%;
  /*display: flex;*/
  border-radius: 10px;
  border: medium double #9b5ced;
  margin: 5px;
  padding: 5px;
  -webkit-box-shadow: 0px 1px 3px 0px #3B3B3B;
  box-shadow: 0px 1px 3px 0px #3B3B3B;
}
.ride-box-frame {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}


</style>

