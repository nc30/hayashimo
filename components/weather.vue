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
            <span class="z"><i class="fas fa-sort-up"></i> {{tempmax}}℃</span>
            <span class="z"><i class="fas fa-sort-down"></i> {{tempmin}}℃</span>
          </div>
          <div class="cud">
            <span class="z">{{current.main.pressure}}hPa</span>
            <span class="z">{{current.main.humidity}}%</span>
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
  }
  .w{
    width: 150px;
    text-align: center;
    // border: solid white 1px;
  }
  .m{
    margin-top: 1em;
    display: flex;
    .cr{
      display: block;
      font-size: 2.5em;
      font-weight: bold;
    }
    .cud{
      font-size: .9em;
      padding: 10px 0 0 10px;
      .z{
        display: block;
        margin-bottom: -5px;
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
        current_: {
    "base": "stations", "clouds": {"all": 75 }, "cod": 200, "coord": {"lat": 35.18, "lon": 136.91 }, "dt": 1601102133, "id": 1856057, "main": {"feels_like": 302.12, "humidity": 73, "pressure": 1006, "temp": 300.8, "temp_max": 302.59, "temp_min": 298.15 }, "name": "Nagoya", "sys": {"country": "JP", "id": 8009, "sunrise": 1601066592, "sunset": 1601109850, "type": 1 }, "timezone": 32400, "visibility": 10000, "weather": [{"description": "broken clouds", "icon": "04d", "id": 803, "main": "Clouds"} ], "wind": {"deg": 280, "speed": 5.1
    }
}

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
          console.log(a.data)
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
