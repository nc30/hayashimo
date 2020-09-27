<template>
  <div id="messagebox">
    <div v-if="message" class="box" :class="{anime:t}" @click="clear">
      <span>{{message}}</span>
    </div>
  </div>
</template>

<style lang="scss">
#messagebox{
  text-align: right;
  @keyframes anime1 {
    0%{width: 1%;opacity:0}
    100%{width: 100%;opacity: 100;}
  }
  .box{
    border: solid white 1px;
    border-left: solid white 10px;
    margin: auto 0px auto auto;
    height: 7em;
    margin-top:2em;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .anime{
    animation: anime1 200ms 1 alternate;
  }
  button{
    padding: .5em 1em;
  }
}
</style>

<script>
import { mapMutations } from 'vuex'

export default{
  data(){
    return {
      t:false,
    }
  },
  computed:{
    message(){
      this.t = true;
      setTimeout(this.toggle, 210)
      setTimeout(this.clear, 10000)
      return this.$store.state.status.message
    }
  },
  methods:{
    toggle(){
      this.t=false;
    },
    clear(){
      this.$store.commit('status/message', '')
    }
  }
}
</script>
