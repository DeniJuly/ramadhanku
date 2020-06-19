<template>
  <div class="container">
      <div class="not-found d-flex align-items-center justify-content-center">
          <div class="ilustrasi d-flex">
            <img :src="require('../assets/img/notfound.svg')" alt="not found">
            <p>Kamu nyari apa sih?</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.not-found{
    min-height: 100vh;
    text-align: center;
    color: rgba(0,0,0,0.8);
}
.not-found .ilustrasi{
    flex-direction: column;
}
</style>