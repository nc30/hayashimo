<template>
  <div id="weather">
    <div v-if="current">
      <div class="c">
        <div class="w">
          <img :src="'http://openweathermap.org/img/wn/'+current.weather[0].icon+'@2x.png'" />
        </div>
        <div class="m">
          <span class="cr">{{temp}}℃</span>
          <div class="cud">
            <span class="z"><i class="fas fa-sort-up"></i> {{tempmax}}℃  {{current.main.pressure}}hPa</span>
            <span class="z"><i class="fas fa-sort-down"></i> {{tempmin}}℃  {{current.main.humidity}}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#weather{
  height: 105px;
  .c{
    display:flex;
    align-items: center;
  }
  .w{
    width: 150px;
    margin-right: 1em;
    text-align: center;

    background: radial-gradient(#fff 25%, transparent 0),
                radial-gradient(#fff 25%, transparent 0);
    background-size: 8px 8px;
    background-position: 0 0, 4px 4px;
  }
  .m{
    display: flex;
    .cr{
      display: block;
      font-size: 3em;
      font-weight: bold;
    }
    .cud{
      font-size: 1.5em;
      padding: 0 0 0 10px;
      .z{
        display: block;
        // margin-bottom: -5px;
      }
    }
  }

}
</style>

<script>
  let interval = null
  export default{
    data(){
      return {
        current: null,
      }
    },
    computed:{
      pressure(){
        if(!this.current.main.pressure){return null}
        return this.current.main.pressure
      },
      temp(){
        if(!this.current.main.temp){return null}
        return Math.floor(this.current.main.temp - 273.15)
      },
      tempmax(){
        if(!this.current.main.temp_max){return null}
        return Math.floor(this.current.main.temp_max - 273.15)
      },
      tempmin(){
        if(!this.current.main.temp_min){return null}
        return Math.floor(this.current.main.temp_min - 273.15)
      }
    },
    methods:{
      async refresh(){
        this.$store.commit('loader', true)
        try{
          let a = await this.$axios.get('https://api.openweathermap.org/data/2.5/weather?q=nagoya&appid=dffc2931fec59c535cbf54b1d1e3f686')
          this.current = a.data
        }catch(e){
          console.log(e.data)
        }
        this.$store.commit('loader', false)
      }
    },
    mounted(){
      this.refresh()
      interval = setInterval(this.updateTime, 1800000)
    },
    destroyed (){
      console.log("dest")
      clearInterval(interval)
    },
  }
</script>
