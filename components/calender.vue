<template>
  <div id="calender">
    <div class="w">
      <div class="week">
        <div class="day h">日</div>
        <div class="day ">月</div>
        <div class="day ">火</div>
        <div class="day ">水</div>
        <div class="day ">木</div>
        <div class="day ">金</div>
        <div class="day h">土</div>
      </div>
      <div v-for="w in month" class="week">
        <div v-for="d in w" class="day">
          <span v-if="d.d" :class="{h:d.current}">{{d.d}}</span>
        </div>
      </div>
    </div>
    <div class="inf">
      <h2>昭和{{y-1925}}年{{m}}月</h2>
      <p style="text-align: center">{{mun}}</p>
      <button @click="bck"><i class="fas fa-chevron-left"></i></button>
      <button @click="cr">current</button>
      <button @click="nxt"><i class="fas fa-chevron-right"></i></button>
    </div>
  </div>
</template>

<style lang="scss">
#calender{
  display: flex;
  h2{
    text-align: center;
  }
  button{
    background:none;
    border-radius:5px;
    border:solid white 1px;
    padding:1em 1em;
    margin: 8px;
    color:#fff;
    margin-top:15px;
    &:focus{
      outline:none;
    }
  }
  .inf{
    padding-left: 1em;
  }
  .week{
    display: flex;
  }
  .day{
    width: 2em;
    height: 2em;
    text-align: center;
    // border:solid white 1px;
    .h{
      display: block;
      width: 1.6em;
      height: 1.6em;
      background-color: #fff;
      border-radius: .8em;
      color: #ed5565;
    }
  }
  .w{
    min-width:240px;
    // border: solid white 1px;
    padding: .5em;
  }
}
</style>

<script>
let interval
let timeout
const cal = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
import moment from 'moment'
import moment_timezone from 'moment-timezone'

export default{
  data(){
    return {
      y: 2020,
      m: 9,
      d: new Date(),
      current: true,
    }
  },
  methods:{
    nxt(){
      this.current = false
      this.m += 1
      if(this.m >= 13){
        this.m = 1
        this.y += 1
      }
      timeout = setTimeout(this.cr, 600000)
    },
    bck(){
      this.current = false
      this.m -= 1
      if(this.m <= 0){
        this.m = 12
        this.y -= 1
      }
      timeout = setTimeout(this.cr, 180000)
    },
    cr(){
      let c = new Date()
      this.y = c.getFullYear()
      this.m = c.getMonth() + 1
      this.d = c
      this.current = true
    },
  },
  computed:{
    mun(){
      return cal[this.m-1]
    },
    month(){
      let r = [];
      const start = new Date(this.y, this.m, 1)
      const startWeek = (start.getDay() + 5) % 7
      let buf = []
      for(let i=0;i<7;i++){
        if(i<startWeek){buf[i]={d:null};continue}

        buf[i] = {
          d: i - startWeek + 1
        }
        if(this.d.getDate() == buf[i]['d']&&this.m==this.d.getMonth()+1) buf[i]['current'] = true
      }
      r[0] = buf

      for(let z=0;z<5;z++){
        let s = []
        for(let i=0;i<7;i++){
          let d = r[0][6]['d'] + z * 7 + i + 1
          const day = new Date(this.y, this.m, d)
          if (day.getDate() != d){
            if(i!=0) r.push(s)
            break;
          }
          s[i] = {
            d: d,
          }
          if(this.d.getDate() == d&&this.m==this.d.getMonth()+1) s[i]['current'] = true
          if(i==6) r.push(s)
        }
      }
      return r
    }
  },
  mounted(){
    this.cr()
    interval = setInterval(function(){this.current&&this.cr}, 60000)
  },
  destroyed (){
    clearInterval(interval)
  },
}
</script>
