<template>
<div id="app">
  <div class="header">
    <div class="title">
      <h1>EPCOT Central</h1>
    </div>
    <div class="header-tags">
      <div class="tag-box">
        <router-link to="/">
          <h3>Home</h3>
        </router-link>
      </div
      ><div class="tag-box">
        <router-link to="/submit">
          <h3>Forum</h3>
        </router-link>
      </div
      ><div class="tag-box">
        <router-link to="/admin">
          <h3>Admin</h3>
        </router-link>
      </div>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <footer class="site-footer">
    <div class="footer-site-block">
      <h3 class="footer-map-title">Copyright 2021 <p>&nbsp</p>
      </h3>
    </div>
    <div class="footer-site-block">
      <h3 class="footer-map-title">GitHub</h3>
      <p>Code for this site can be found at</p>
      <a href="https://github.com/JayyCub/EPCOT-Central" target="new">https://github.com/JayyCub/EPCOT-Central</a>
    </div>
  </footer>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Lucida Sans', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
<style>
body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}
.header {
    display: flex;
    background-color: #5BDEFF;
    color: #1C454F;
    height: auto;
    position: fixed;
    width: 100%;
    -webkit-box-shadow: 0px 2px 5px 1px #818181;
    box-shadow: 0px 2px 5px 1px #818181;
    border-bottom-left-radius: 100px 15px;
    border-bottom-right-radius: 100px 15px;
    background-image: -webkit-linear-gradient(314deg,rgba(163,236,255,1.00) 0%,rgba(206,255,254,1.00) 100%);
    background-image: -moz-linear-gradient(314deg,rgba(163,236,255,1.00) 0%,rgba(206,255,254,1.00) 100%);
    background-image: -o-linear-gradient(314deg,rgba(163,236,255,1.00) 0%,rgba(206,255,254,1.00) 100%);
    background-image: linear-gradient(136deg,rgba(163,236,255,1.00) 0%,rgba(206,255,254,1.00) 100%);
}

.title {
    margin-left: 80px;
}

.title h1 {
  font-size: 30px;
}

.content {
    padding: 20px 100px;
    min-height: 500px;
}
.header-tags {
    width: 40%;
    display: block;
    float: right;
    margin-left: auto;
    text-align: center;
    margin-right: 80px;
}
.tag-box {
    style: inline;
    display: inline-block;
    width: 100px;
    width: 25%;
    height: 100%;
    margin-top: 0px;
}

.tag-box:hover {
    background-color: #D3FAFF;
    border-bottom-style: solid;
    border-bottom-color: #242424;
}

/* Footer */
.footer-logo {
    background-color: rgba(151,151,151,1.00);
    display: inline-block;
    border-radius: 10px;
    float: right;
    margin-right: 50px;
    width: 125px;
    height: 60px;
    margin-top: -15px;
    margin-left: auto;
}
.site-footer {
    height: 110px;
    background-color: #c9c9c9;
    margin-top: 40px;
    margin-bottom: -155px;
}
.footer-map-title {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1%;
    margin-bottom: 0%;
    height: auto;
}
.footer-site-block {
    width: 50%;
    height: 98%;
    float: left;
}
.github-info {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    float: left;
    margin-top: 0px;
}
</style>
