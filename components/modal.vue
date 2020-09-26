<template>
  <div id="modal" v-if="$store.state.modal.enable">
    <div class="message">
      {{$store.state.modal.message}}
    </div>
    <div class="btns">
      <button>OK</button>
    </div>
  </div>
</template>

<style lang="scss">
#modal{
  background-color: #ed5565;
  position: fixed;
  width: 80%;
  height: 80vh;
  border: solid white 1px;
  border-bottom-right-radius: 1em;
  margin: 10vh 10%;
  z-index: 10000;
  padding: 3em;

  .btns{
    position: absolute;
    bottom: 3em;
    width: 88%;
  }

  button{
    padding: .5em 1.5em;
    text-align: center;
    background:none;
    color:white;
    // background-color: #fff;
    // color: #ed5565;
    border: solid white 2px;
    width: 100%;
    font-size:1em;
    font-weight: bold;
    border-radius: 10px;
    &:focus{
      outline: none;
    }
  }

  .message {
    width: 80%;
    margin: 3em auto;
    font-size: 1.5em;
    text-align: center;
  }
}
</style>
