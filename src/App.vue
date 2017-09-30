<template>
  <div id="app">
    <!-- header -->
    <n-header :seller="seller" v-if="seller"></n-header>
    <!-- nav -->
    <Navbar></Navbar>
    <!-- content -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import NHeader from '@/components/header';
  import Navbar from '@/components/Navbar';
  import { getSeller } from '@/api';
  const ERR_OK = 0;
export default {
  name: 'app',
  data() {
    return {seller: {}};
  },
  created() {
    getSeller().then(res => {
      if (res.data.errno === ERR_OK) {
        this.seller = res.data['data'];
      }
    }).catch(err => {
      console.log(err);
    });
  },
  components: {
    NHeader,
    Navbar
  }
};
</script>

<style>

</style>
