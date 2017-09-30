<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decrease">
    </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop.prevent="increase"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
//    console.log(this.food);
  },
  methods: {
    increase(event) {
      if (!event._constructed) return;
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('add', event.target);
    },
    decrease(event) {
      if (!event._constructed) return;
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  .cartcontrol
    display flex
    align-items center
    .cart-increase, .cart-decrease
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
    .cart-decrease
      transform translate3d(0, 0, 0) rotate(0)
      &.move-enter-active, &.move-leave-active
        transition all 0.3s linear
      &.move-enter, &.move-leave-active
        opacity 0
        transform translate3d(24px, 0, 0) rotate(180deg)
    .cart-count
      flex 0 0 24px
      width 24px
      font-size 10px
      color rgb(147, 153, 159)
      line-height 24px
      text-align center
      font-weight 600
</style>
