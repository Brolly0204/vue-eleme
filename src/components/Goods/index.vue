<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul>
          <li v-for="(item,index) in goods" :key="index"
              class="menu-item"
              :class="{'current': currentIndex === index}"
              @click="selectMenu(index, $event)"
              ref="menuList"
          >
            <span class="text border-1px" >
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span><span>{{item.name}}</span>
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="foods">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook" ref="foodList" >
            <h1 class="title">{{item.name}}</h1>
            <ul class="food-container">
              <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food, $event)">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc" v-show="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="sellCount">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <!-- 添加减少控制 -->
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 底部购物状态 -->
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopCart"></shopcart>
    </div>
    <food ref="food" :food="selectedFood" @add="addFood"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import { getGoods } from '@/api';
import BScroll from 'better-scroll';
import cartcontrol from '@/components/cartcontrol';
import shopcart from '@/components/shopcart';
import food from '@/components/food';

export default {
  name: 'goods',
  props: {
    seller: Object,
    default: () => ({})
  },
  data() {
    return {
      goods: [],
//      menuScroll: '',
//      foodsScroll: '',
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    };
  },
  computed: {
    currentIndex() {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              this._followScroll(i);
              return i;
            }
        }
      return 0;
    },
    selectFoods() { // 将数量大于1的食品 保存到foods集合里
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  beforeUpdate() {
//     console.log('beforeUpdate');
  },
  updated() {
//    console.log('Updated');
  },
  created() {
    getGoods().then(res => {
      let result = res.data;
      if (result.errno === 0) {
        this.goods = result.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    selectFood(food, event) {
      if (!event._constructed) {
        return false;
      }
      this.selectedFood = food;
      this.$refs.food.show(); // 调用子组件的方法
    },
    addFood(tar) {
      this._drop(tar);
    },
    _drop(tar) {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(tar);
      });
    },
    _initScroll() {
       this.menuScroll = new BScroll(this.$refs.menu, {
         click: true // 允许点击
       });
       this.foodsScroll = new BScroll(this.$refs.foods, {
         click: true,
         probeType: 3
       });
       this.foodsScroll.on('scroll', pos => { // 得到滚动条实时位置
         if (pos.y <= 0) {
           this.scrollY = Math.abs(Math.round(pos.y));
         }
       });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
         height += item.clientHeight;
         this.listHeight.push(height);
      }
    },
    selectMenu(ind, event) {
      if (!event._constructed) return;
      let foodList = this.$refs.foodList;
      let el = foodList[ind];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _followScroll(n) {
      let menuList = this.$refs.menuList;
      let el = menuList[n];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    }
  },
  components: {
    cartcontrol,
    shopcart,
    food
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins";
  .goods
    display: flex
    position absolute
    top: 176px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      height 100%
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding: 0 12px;
        &.current
          position: relative
          margin-top: -1px
          padding-left: 10px
          padding-top: 1px
          background-color: #fff
          border-left: 2px solid #3190e8
          font-weight: 400
          z-index: 10
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('./image/decrease_3')
            &.discount
              bg-img('./image/discount_3')
            &.guarantee
              bg-img('./image/guarantee_3')
            &.invoice
              bg-img('./image/invoice_3')
            &.special
              bg-img('./image/special_3')
    .foods-wrapper
      flex 1
      /* overflow: auto; */
      .title
        height: 26px
        line-height: 26px
        padding-left: 14px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
        border-left: 2px solid #d9dde1
        font-size: 12px
      .food-container
        padding: 0 18px
        box-sizing: border-box
        .food-item
          display: flex
          padding: 18px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            flex: 0 0 57px
            width: 57px
            height: 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              margin: 2px 0 8px 0
              font-size: 14px
              height: 14px
              line-height: 14px
              color rgb(7, 17, 27)
            .desc, .extra
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 10px
              margin-bottom: 8px
            .desc
              line-height: 12px
            .extra
              margin-bottom: 0
              .sellCount
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              color: rgb(147, 153, 159)
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                font-size: 10px
                text-decoration: line-through

            .cartcontrol-wrapper
              position absolute
              right 0
              bottom 10px
</style>
