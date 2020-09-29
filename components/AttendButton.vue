<template>
  <div id="attend">
    <div class="fil" v-show="warn" />
    <div class="_w">
      <button class="_attend" :class="{disabled: $store.state.status.kintai > 0}" @click="al">出勤</button>
      <button class="_leave" :class="{disabled: $store.state.status.kintai == 0}" @click="al">退勤</button>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      warn: false,
    }
  },
  methods:{
    al(){
      alert("clicked")
    },
  }
}
</script>

<style lang="scss">
#attend{
  position:relative;

  @keyframes warn_blink {
    100% { opacity: 0; }
  }

  .fil{
    width:100%;
    height:8em;
    border:none;
    background-size: 15px 15px;
    background-image: linear-gradient(
      -45deg,
      #fff, #fff 48.5%,
      #ed5565 49.5%, #ed5565 50.5%,
      #fff 51.5%, #fff
    );
    animation: warn_blink 2000ms ease-in infinite;
  }

  ._w{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8em;
    position: absolute;
    top:0; left:0; right:0; bottom:0;
  }

  ._attend,
  ._leave{
    padding: .8em 2.5em;
    font-size: 1.5em;
    font-weight: bold;
    background-color: #fff;
    color: #ed5565;
    border:solid #ed5565 2px;
    border-radius:10px;
    &.disabled{
      background-color: #ed5565;
      color: #ffe3e3;
      border-color: #ffe3e3;
    }
  }
  ._leave{
    margin-left: 1em;
  }
}
</style>
