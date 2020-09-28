<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
html {
  // font-family:
  //   'Source Sans Pro',
  //   -apple-system,
  //   BlinkMacSystemFont,
  //   'Segoe UI',
  //   Roboto,
  //   'Helvetica Neue',
  //   Arial,
  //   sans-serif;
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
    head() {
      if(process.env.NODE_ENV == 'production') {
        return {
          bodyAttrs: {
            class: 'hideCursor'
          }
        }
      }
      return{}
    },
    data(){
      return {
        reconnect: 1,
      }
    },
    methods:{
      rst(){
        this.reconnect = 1
      },
      open(e){
        console.log("open")
        this.$store.commit('connection', true)
        this.reconnect = this.reconnect - 1;
        setTimeout(this.rst, 30000)
        this.$store.commit('status/message', 'connection success!.')
      },
      close(e){
        console.log("close")
        this.$store.commit('connection', false)
        socket.close()

        this.$store.commit('status/message', 'connection faild.')
        this.recon()
      },
      receive(e){
        console.log("receive")
        console.log(e)
        // console.log(e.data.notifcations)
        try{
          const d = JSON.parse(e.data)
          if(d.type = 'notifcations'){
            this.$store.commit('status/notifcations', d.notifcations)
          }
          console.log(d)
        }catch(e){}
      },
      error(e){
        console.log(e)
      },
      recon(){
        if(process.env.NODE_ENV != 'production') return
        timer = setTimeout(this.connect, 10000 * this.reconnect ** 1.5 + (Math.random() * 10000))
        this.reconnect++
      },
      connect(){
        try{
          socket = new WebSocket(process.env.ws)
          socket.onopen = this.open
          socket.onclose = this.close
          socket.onmessage = this.receive
          socket.onerror = this.error
        }catch(e){
          console.log(e)
        }
      }
    },
    mounted(){
      if(process.env.ws){
        this.connect()
      }
    },
    beforeDestroy(){
      socket.close()
    },
  }
</script>
