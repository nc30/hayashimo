<template>
  <div id="notifcations">
    <ul>
      <li><i class="fab fa-github icon blink" :class="{show:$store.state.status.notifcations.github}"></i></li>
      <li><i class="fab fa-gitlab icon blink" :class="{show:$store.state.status.notifcations.gitlab}"></i></li>
      <li><i class="fab fa-slack icon blink" :class="{show:$store.state.status.notifcations.slack}"></i></li>
      <li></li>
      <li><i class="fas fa-envelope icon" :class="{show:$store.state.status.notifcations.email}"></i></li>
    </ul>
  </div>
</template>

<style lang="scss">
#notifcations{
  border: solid white 1px;
  padding: .5em 1em;
  // margin: 1em 2em;
  // margin: 2em auto;
  margin-bottom: 2em;
  height: 48px;
  box-sizing:content-box;
  ul{
    list-style: none;
    padding: 0;
  }
  li{
    width: 48px;
    display: inline-block;
    margin-left: 1em;
  }
  .icon{
    font-size: 3em;
    display: none;
  }
  .show{
    display: inline;
  }

  @keyframes blink {
    70% { opacity: 0.4; }
    100% { opacity: 0; }
  }
  .blink {
    animation: blink 3000ms ease-in infinite;
  }
}
</style>

<script>
export default{

}
</script>
