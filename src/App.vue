<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
a:hover{
  opacity: 0.7;
}
.page{
  margin-top: 20px;
}
.bg-white{
  background: #ffffff;
}
/* form */
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #50D890!important;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(80, 216, 144, 0.25)!important;
}
.btn.focus, .btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(80, 216, 144, 0.25)!important;
}
</style>
