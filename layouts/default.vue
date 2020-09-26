<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;

}

button {
  border:none;
  background:none;
  border: solid white 1px;
  border-radius: 5px;
  color: white;
  &:focus{
    outline: none;
  }
}

body {
  background-color: #ed5565;
  color: #fff;
  overflow:hidden;
  &.hideCursor{
    cursor: none !important;
  }
}
</style>

<script>
  let socket = null
  let timer = null

  export default{
    data(){
      return {
        reconnect: 1
      }
    },
    methods:{
      open(e){
        console.log("open")
        this.$store.commit('connection', true)
        setTimeout(function(){this.reconnect = 1}, 60000)
      },
      close(e){
        console.log("close")
        this.$store.commit('connection', false)
        socket.close()
        this.recon()
      },
      recon(){
        if(process.env.NODE_ENV != 'production') return
        timer = setTimeout(this.connect, 10000 * this.reconnect ** 2)
        console.log(this.reconnect ** 2)
        this.reconnect++
      },
      connect(){
        try{
          socket = new WebSocket('ws://127.0.0.1:3001/ws/1')
          socket.onopen = this.open
          socket.onclose = this.close
          // socket.addEventkListener('open', this.open)
          // socket.addEventListener('message', this.receive)
          // socket.addEventListener('close', this.close)
          // socket.addEventListener('error', this.error)
        }catch(e){
          console.log(e)
          // this.recon()
        }
      }
    },
    mounted(){
      this.connect()
    },
    beforeDestroy(){
      socket.close()
    },
  }
</script>
