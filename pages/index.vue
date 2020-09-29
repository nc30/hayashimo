<template>
  <div class="container">
    <modal/>
    <div class="menu">
      <div id="mainMenu">
        <ul>
          <li><button class="home">Home</button></li>
          <li><button class="switch">Switch</button></li>
          <li><button class="info">Info</button></li>
        </ul>
      </div>
    </div>
    <div class="lf">
      <weather/>
      <calender />
      <!-- <timer/> -->
    </div>
    <div class="rl">
      <header id="title">
        <div class="status" @click="reload">
          <span v-if="!$store.state.connected"><i class="fas fa-unlink"></i></span>
        </div>
        <!-- <h1 @click="reload">Hayashimo</h1> -->
      </header>
      <miniclock />
      <notifcations/>
      <AttendButton/>
      <message/>

      <div id="messages">
        <div v-for="m in $store.state.status.messages">
          <span>{{m.message}}</span>
        </div>
      </div>

      <div v-if="$store.state.loading" class="loader">
        <div class="ball-grid-pulse">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods:{
    reload(){
      location.reload(true)
    }
  }
}
</script>

<style lang="scss">
#messages{
  height: 7em;
  overflow: hidden;

  text-align: center;
  padding-top: 3em;
  font-size: 1.3em;
}
#mainMenu{
  margin-top:2em;
  border-left: solid 5px #fff;
  ul{
    padding:0;
  }
  li{
    list-style: none;
  }
  button{
    // display: block;
    // width:60px;
    // height: 50px;
    // background-color: yellow;
    // background:none;
    // color:#fff;
    // &:focus{outline: none;}
    display: block;
    width: 60px;
    height: 80px;
    border: solid #fff 2px;
    background: none;
    margin-bottom: 1em;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: none;
    color: #fff;
  }
}
#title{
  .status{
    height: 1em;
    text-align: right;
  }
  text-align: center;
}
.container{
  color: #fff;
  position: relative;
  .menu{
    position: absolute;
    left: 0;
    top:0;
    height:100vh;
    width: 80px;
  }
  .lf{
    margin-left: 90px;
    width: 50%;
    height: 100%;
    padding: 2em 0;
  }
  .rl{
    position: absolute;
    right: 0;
    top:0;
    bottom: 0;
    height: 100vh;
    width: 40%;
    padding: 1em 1em 1em 0;

    .loader{
      position:absolute;
      bottom: 1em;
      right: 1em;
    }
  }

}
</style>
