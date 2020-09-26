<template>
  <div class="CurrentTime">
    <div class="m">
      <span class="b">{{date}}</span>
      <span class="a">{{time}}</span>
      <span class="c">{{second}}</span>
    </div>
    <div class="n">
      <span class="c">UTC</span>
      <span class="utc"> {{udate}} {{utime}}</span>
    </div>
    <span class="c">UNIX</span>
    <span class="utc">{{unix}}</span>
  </div>
</template>

<script>
import moment from 'moment'
import moment_timezone from 'moment-timezone'

export default {
  name: 'miniclock',
  beforeMount () {
    this.interval = setInterval(this.updateTime, 1000)
  },
  mounted(){
    this.updateTime()
  },
  data () {
    return {
      currentTime: this.updateTime(),
      date: '01/01',
      time: '00:00',
      second: '00',
      udate: '01/01',
      utime: '00:00',
      usecond: '00',
      unix: 0,
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    updateTime () {
      let jst = moment().tz('Asia/Tokyo')
      this.date = jst.format('DD/MM/YYYY')
      this.time = jst.format('HH:mm')
      this.second = jst.format('ss')
      let utc = moment().tz("UTC")
      this.udate = utc.format('DD/MM')
      this.utime = utc.format('HH:mm')
      this.usecond = utc.format('ss')
      this.unix = jst.unix()
    }
  }
}
</script>
<style scoped>
.CurrentTime {
  text-align: right;
  font-size: 2em;
  /*color: #ffd700;*/
  color: #fff;
  background:none;
  padding-bottom: 1em;
}
.m {
  padding:0;
  margin-bottom: -8px;
  border-bottom:solid #fff 2px;
  border-left: solid #fff 50px;
}
.n {
  height: .9em;
}
.c {
  font-size: .5em;
}
.a {
  font-size: 1.6em;
  font-weight: 300;
}
.b {
  font-size: .8em;
}
.utc{
  font-size: .8em;
  border-right: solid #fff 8px;
  padding: 0 .3em;
}
</style>
