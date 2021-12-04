<template>
<div class="home">
  <h1 class="forum-title">Forum</h1>
  <h3><b>Anonymous in-park chatting</b></h3>
  <div class="forum-frame">
    <div class="forum-post">
      <p>Does anyone know why Soarin' is closed?</p>
    </div>
    <div class="forum-post">
      <p>Does anyone know why Soarin' is closed?</p>
    </div>
    <div class="forum-post">
      <p>Does anyone know why Soarin' is closed?</p>
    </div>
    <div class="forum-post">
      <p>Does anyone know why Soarin' is closed?</p>
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
      title: "",
      description: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },

  created() {
    this.getItems();
  },
  methods: {

    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
//        console.log(error);
      }
    },

    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
//        console.log(error);
      }
    },

    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },

    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
//      console.log(error);
      }
    },

    fileChanged(event) {
      this.file = event.target.files[0]
    },

    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          path: r1.data.path,
          description: this.description
        });
        this.addItem = r2.data;
      } catch (error) {
//        console.log(error);
      }
    },

  }
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
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.forum-title {
    border-bottom-color: #7ff5ca;
    border-bottom-style: ridge;
}
.forum-frame {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.forum-post {
  width: 45%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  /*display: flex;*/
  border-radius: 10px;
  border: medium double #7ff5ca;
  /*margin: 5px;*/
  padding: 5px;
  -webkit-box-shadow: 0px 1px 3px 0px #3B3B3B;
  box-shadow: 0px 1px 3px 0px #3B3B3B;
}
.forum-split {
  width: 50%;
  display: inline-block;
}
</style>
