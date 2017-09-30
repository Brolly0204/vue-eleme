<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="foodWrapper">
      <div class="food-content">
        <div class="header-image">
          <img :src="food.image" alt="">
          <div class="back" @click="showFlag=false">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h3 class="title">{{food.name}}</h3>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @add="addFood"></cartcontrol>
          </div>
          <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">
            加入购物车
          </div>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h3 class="title">商品介绍</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h3 class="title">商品评价</h3>
          <ratingselect
            @select="selectRating"
            @toggle="toggleContent"
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc" :ratings="food.ratings">
          </ratingselect>
           <div class="rating-wrapper">
             <ul v-show="food.ratings && food.ratings.length">
               <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                 <div class="user">
                   <span class="name">{{rating.username}}</span>
                   <img class="avatar" width="12" height="12" :src="rating.avatar">
                 </div>
                 <div class="time">{{rating.rateTime | formatDate}}</div>
                 <p class="text">
                   <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                 </p>
               </li>
             </ul>
             <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
           </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '@/components/cartcontrol';
  import split from '@/components/split';
  import ratingselect from '@/components/ratingselect';
  import {formatDate} from '@/common/js/date';

  /* eslint-disable no-unused-vars */
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    name: 'food',
    props: {
      food: {
        type: Object,
        default: () => ({})
      }
    },
    updated () {
//      console.log(this.food);
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodWrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      addFirst(event) {
        if (!event._constructed) return;
          this.$emit('add', event.target);
          this.$set(this.food, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target); // 小球动画
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
    z-index: 30;
    transform translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition all 0.2s linear
    }
    &.move-enter, &.move-leave-active {
      transform translate3d(100%, 0, 0)
    }
    .food-content {
      .header-image {
        position relative
        width: 100%
        height 0
        padding-top 100%
        img {
          position absolute
          left: 0
          top: 0
          width 100%
          height 100%
        }
        .back {
          position absolute
          top: 0
          left: 0
          padding 10px
          color #fff
          font-size 20px
        }
      }
      .content {
        position: relative
        padding 18px
        .title {
          font-size 14px
          font-weight 700
          line-height 14px
          color rgb(7, 17, 27)
        }
        .detail {
          margin 8px 0 18px
          font-size 0
          line-height 10px
          color rgb(147, 153, 159)
          .rating, .sell-count {
            font-size 10px
          }
          .rating {
            margin-left 12px
          }
        }
        .price {
          font-size 0
          .now {
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
            line-height 24px
            margin-right 8px
          }
          .old {
            font-size 10px
            color rgb(147, 153, 159)
            line-height 24px
            text-decoration line-through
          }
        }
        .cartcontrol-wrapper {
          position absolute
          right 12px
          bottom 12px
        }
        .buy {
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: rgb(0, 160, 220)
          opacity: 1
        }
      }
      .info {
        padding 18px
        .title {
          font-size 14px
          margin-bottom 6px
        }
        .text {
          padding 0 8px
          font-size 12px
          font-weight 200
          color rgb(77, 85, 93)
          line-height 24px
        }
      }
      .rating {
        padding-top 18px
        .title {
          font-size 14px
          margin 0 0 6px
        }
        .rating-wrapper {
          padding: 0 18px
          .rating-item {
            position: relative
            padding: 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .user {
              position: absolute
              right: 0
              top: 16px
              line-height: 12px
              font-size: 0
              .name {
                display: inline-block
                margin-right: 6px
                vertical-align: top
                font-size: 10px
                color: rgb(147, 153, 159)
              }
              .avatar {
                border-radius: 50%
              }
            }
            .time {
              margin-bottom: 6px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
            }
            .text {
              line-height: 16px
              font-size: 12px
              color: rgb(7, 17, 27)
              .icon-thumb_up, .icon-thumb_down {
                margin-right: 4px
                line-height: 16px
                font-size: 12px
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220)
              }
              .icon-thumb_down {
                color: rgb(147, 153, 159)
              }
            }
          }
          .no-rating{
            padding: 16px 0
            font-size: 12px
            color: rgb(147, 153, 159)
          }
        }
      }
    }
  }
</style>
