<template>
  <div id="calender">
    <div class="w">
      <div class="week">
        <div class="day">日</div>
        <div class="day">月</div>
        <div class="day">火</div>
        <div class="day">水</div>
        <div class="day">木</div>
        <div class="day">金</div>
        <div class="day">土</div>
      </div>
      <div v-for="w in month" class="week">
        <div v-for="d in w" class="day">
          <span v-if="d.d" class="d" :class="{h:d.current}">{{d.d}}</span>
        </div>
      </div>
    </div>
    <div class="inf">
      <h2>昭和{{y-1925}}年{{m}}月</h2>
      <p style="text-align: center;font-size:1.3em;padding-bottom:0.5em;">{{mun}}</p>
      <div style="display:flex;">
        <button @click="cr" :class="{current: current}">current</button>
        <div>
          <button class="nb" @click="bck"><i class="fas fa-chevron-left"></i></button>
          <button class="nb" @click="nxt"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#calender{
  display: flex;
  h2{
    font-size: 1.8em;
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
    font-size: 1.3em;
    &:focus{
      outline:none;
    }
    &.current{
      background-color: #fff;
      color:#ed5565;
    }
  }
  .w{
    padding: .5em;
  }
  .inf{
    padding-left: 1em;
    .nb{
      padding: 1em 1.2em;
    }
  }
  .week{
    display: flex;
  }
  .day{
    min-width: 60px;
    height: 45px;
    font-size: 1.5em;
    text-align: center;

    .d{
      vertical-align: middle;
      display: inline-block;
      margin: auto auto;
      width: 1.6em;
      height: 1.6em;
      text-align:center;
    }
    // border:solid white 1px;
    .h{
      // vertical-align: middle;
      background-color: #fff;
      border-radius: .8em;
      color: #ed5565;
    }
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
    let d = new Date()
    return {
      y: d.getFullYear(),
      m: d.getMonth() + 1,
      d: d,
      current: true,
    }
  },
  methods:{
    nxt(){
      this.m += 1
      if(this.m >= 13){
        this.m = 1
        this.y += 1
      }
      const n = new Date()
      if(this.y == n.getFullYear()&&this.m == n.getMonth()+1){
        this.current = true
      }else{
        this.current = false
        timeout = setTimeout(this.cr, 600000)
      }
    },
    bck(){
      this.m -= 1
      if(this.m <= 0){
        this.m = 12
        this.y -= 1
      }
      const n = new Date()
      if(this.y == n.getFullYear()&&this.m == n.getMonth()+1){
        this.current = true
      }else{
        this.current = false
        timeout = setTimeout(this.cr, 600000)
      }
    },
    cr(){
      let c = new Date()
      this.y = c.getFullYear()
      this.m = c.getMonth() + 1
      this.d = c
      this.current = true
    },
    rf(){
      this.current && this.cr()
    }
  },
  computed:{
    mun(){
      return cal[this.m-1]
    },
    month(){
      let r = [];
      const start = new Date(this.y, this.m-1, 1)
      const startWeek = (start.getDay()) % 7
      let buf = []
      for(let i=0;i<7;i++){
        if(i<startWeek){buf[i]={d:null};continue}

        buf[i] = {
          d: i - startWeek + 1,
        }
        buf[i]['current'] = (this.d.getDate() == buf[i]['d']&&this.m==this.d.getMonth()+1)
      }
      r[0] = buf

      for(let z=0;z<5;z++){
        let s = []
        for(let i=0;i<7;i++){
          let d = r[0][6]['d'] + z * 7 + i + 1
          const day = new Date(this.y, this.m-1, d)
          if (day.getDate() != d){
            if(i!=0) r.push(s)
            break;
          }
          s[i] = {
            d: d,
            current: (this.d.getDate() == d&&this.m==this.d.getMonth()+1),
          }
          if(i==6) r.push(s)
        }
      }
      return r
    }
  },
  mounted(){
    this.cr()
    interval = setInterval(this.rf, 60000)
  },
  destroyed (){
    clearInterval(interval)
  },
}
</script>
