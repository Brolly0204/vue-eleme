<template>
  <div class="goodList">
    <goods :seller="seller"></goods>
  </div>
</template>

<script type="text/ecmascript-6">
  import goods from '@/components/Goods';
  import shopcart from '@/components/shopcart';

  export default {
    name: 'goodList',
    props: {
      seller: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      goods,
      shopcart
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>

</style>
