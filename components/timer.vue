<template>
  <div id="timer">
    <div class="num">
      {{setTime}}
      {{restTime}}
    </div>

    <div class="ib">
      <button @click="()=>add(1)">1sec</button>
      <button @click="()=>add(60)">1min</button>
      <button @click="()=>add(600)">10min</button>
      <button @click="rst">reset</button>
      <button @click="start">start</button>
    </div>

    <div class="ring" v-if="alert">
      <i class="fas fa-bell"></i>
    </div>
  </div>
</template>

<script>
let interval = null

export default{
  data(){
    return {
      num: 0,
      rest: 0,
      startTime: null,
      alert: false,
    }
  },
  computed:{
    setTime(){
      if (this.num == 0) return '0m'
      let r = ''
      const h = Math.floor(this.num/3600)
      if(h>0) r += h + 'h '
      const m = Math.floor(this.num % 3600 / 60)
      if(m>0) r += m + 'm'
      return r
    },
    restTime(){
      let r = ''
      const h = Math.floor(this.rest/3600)
      if(h>0) r += h + 'h '
      const m = Math.floor(this.rest % 3600 / 60)
      if(m>0||h>0) r += m + 'm '
      const s = this.rest % 60
      r += s + 's'
      return r
    }
  },
  methods:{
    add(num){
      this.num += num
    },
    rst(){
      this.num = 0
    },
    start(){
      this.rest = this.num
      this.startTime = new Date()
      interval = setInterval(this.chk, 1000)
    },
    chk(){
      this.rest--
      if(this.rest<=0){
        this.alert = true
        clearInterval(interval)
      }
    }
  }
}
</script>

<style lang="scss">
#timer{
  display: flex;

  @keyframes blinkAnimeS2{
     0%{ margin:auto 1em auto 0; }
     10%{ margin:auto 0 auto 1em; }
     20%{ margin:auto 1em auto 0; }
     30%{ margin:auto 0 auto 1em; }
     40%{ margin:auto 1em auto 0; }
     80%{ margin:auto 0 auto 1em; }
     100%{ margin:auto 0 auto 0; }
  }
  .ring{
    font-size:5em;
    animation: blinkAnimeS2 1s infinite alternate;
  }
  .num{
    text-align: right;
    font-size: 1.5em;
  }
  .ib{
    button{
      display: block;
      font-size: 1.2em;
      padding: .5em 1em;
    }
  }
  .input{
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    border: solid white 1px;
    width: 10em;
    span{
      text-align: center;
      width: 3em;
      height: 3em;
      border: solid white 1px;
      border-radius: .5em;
    }
  }
}
</style>
