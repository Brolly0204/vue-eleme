<template>
  <div class="header">
    <div class="content-wrapper">
      <!-- 商家图片 -->
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
           {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span :class="['icon', classMap[seller.supports[0].type]]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 背景 -->
    <div class="header-bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 详情 -->
    <transition name="fade">
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <!-- 好评度 star -->
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <!-- -优惠信息- -->
          <info-title title="优惠信息"></info-title>
          <!-- 活动 -->
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <!-- 商家公告 -->
          <info-title title="商家公告"></info-title>
          <!-- 公告内容 -->
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/Star';
  import InfoTitle from '@/components/InfoTitle';
  export default {
    name: 'header',
    props: {
      seller: Object
    },
    data() {
      return {classMap: [], detailShow: false};
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star,
      InfoTitle
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  @import "index.styl"
</style>
