<template>
  <div>
    <!-- <div class="header-background"></div> -->
    <div style="width: 375px; height: 163px">
      <img
        :src="imgSrc"
        style="width: 375px; height: 163px; position: fixed; top: 0"
      />
    </div>
    <div
      class="header"
      style="
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 16px;
        margin-top: 60px;
      "
    >
      <div
        style="display: flex; align-items: center; z-index: 10"
        @click="handleLocationClick"
      >
        <icon-font name="location" size="20px" />
        <span style="font-size: 14px; margin-left: 4px">深圳市</span>
      </div>
      <div class="example-search" style="z-index: 5">
        <t-search
          v-model="value"
          :clearable="true"
          shape="round"
          placeholder="搜索活动"
          @change="onChange"
        ></t-search>
      </div>
    </div>
    <!-- <div class="search-box">
      <input type="text" placeholder="搜索...">
    </div> -->
    <div style="z-index: 0">
      <div
        class="热门推荐"
        style="font-size: 20px; margin-left: 16px; z-index: 1"
      >
        热门推荐
      </div>
      <!-- <div style="padding: 0 16px; z-index: 0">
        <t-swiper
          :navigation="{ type: 'dots' }"
          :autoplay="false"
          @change="handleChange"
        >
          <t-swiper-item
            v-for="(item, index) in swiperList"
            :key="index"
            style="height: 192px"
          >
            <img :src="item" class="img" />
          </t-swiper-item>
        </t-swiper>
      </div> -->
    </div>
    <div class="container">
      <div class="placeholder"></div>
      <t-sticky :offsetTop="166">
        <div class="sticky-content">全部活动</div>
      </t-sticky>
      <div class="sticky_">
        <div class="demo-tab-bar">
          <t-sticky :offsetTop="194" zIndex="99">
            <t-tabs
              class="wrapper"
              default-value="first"
              @change="switchTab"
              style="width: 375px"
              sticky="true"
              spaceEvenly="false"
            >
              <t-tab-panel value="first">
                <template #label>
                  <div class="label-content">
                    <!-- <icon-font name="app" size="large" /> -->
                    <span>最新活动</span>
                  </div>
                </template>
                <template #default>
                  <LatestActivity v-if="currentTab === 'first'" />
                </template>
              </t-tab-panel>
              <t-tab-panel value="second">
                <template #label>
                  <div class="label-content">
                    <!-- <icon-font name="app" size="large" /> -->
                    <span>高分活动</span>
                  </div>
                </template>
                <template #default>
                  <HighScoreActivity v-if="currentTab === 'second'" />
                </template>
              </t-tab-panel>
              <t-tab-panel value="third">
                <template #label>
                  <div
                    class="label-content"
                    style="width: 125px; border-left: 1px solid #e7e7e7ff"
                    @click="handleFilterClick"
                  >
                    <icon-font name="filter" size="large" />
                    <span>筛选</span>
                  </div>
                </template>
                <template #default>
                  <!-- <LatestActivity v-if="currentTab === 'first'" /> -->
                  <Filter v-if="vis" :vis="vis" @changeVis="changeVis"></Filter>
                </template>
              </t-tab-panel>
            </t-tabs>
          </t-sticky>
        </div>
        <!-- <div class="filter">
          <div class="filter_">
            <icon-font name="filter" size="large" />
            <span style="font-size: 0.3733rem">筛选</span>
          </div>
        </div> -->
      </div>
      <!-- <div class="other-content" v-for="i in 50" :key="i"></div> -->
    </div>
    <t-tab-bar
      class="bottom-tab-bar"
      v-model="tabValue"
      theme="tag"
      :split="false"
    >
      <t-tab-bar-item
        v-for="item in tabList"
        :key="item.value"
        :value="item.value"
        @click="handleTabClick(item.value)"
      >
        {{ item.label }}
        <template #icon>
          <t-icon :name="item.icon" />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from 'tdesign-icons-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LatestActivity from './LatestActivities.vue';
import HighScoreActivity from './HighScoreActivities.vue';
// 引入首页筛选组件
import Filter from '../filter/filter.vue';
//import { Icon as TIcon } from 'tdesign-icons-vue-next';

const onChange = (val: string) => {
  console.log('change: ', val);
};

const value = ref('');

const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`
];
//标签栏
const tabValue = ref('label_1');
const tabList = ref([
  { value: 'label_1', label: '首页', icon: 'home', path: '/' },
  { value: 'label_2', label: '我的', icon: 'user', path: '/my' }
]);
//标签栏跳转
const router = useRouter();
const handleTabClick = (value: string) => {
  if (value === 'label_1') {
    router.push('/');
    //console.log('1')
  } else if (value === 'label_2') {
    router.push('/admin');
    //console.log('2')
  }
};
//活动跳转
const currentTab = ref('first');
const switchTab = (value: string) => {
  currentTab.value = value;
};
// 头部背景
const imgUrl = import.meta.glob('/src/assets/head-bg.png');
const imgSrc = ref('');

imgUrl['/src/assets/head-bg.png']().then((module) => {
  imgSrc.value = (module as { default: string }).default;
});
//筛选跳转
const vis = ref(false);
const changeVis = () => {
  vis.value = false;
};
const handleFilterClick = () => {
  vis.value = true;
};
//地区跳转
const handleLocationClick = () => {
  router.push('/location');
};
</script>

<style lang="less" scoped>
.wrapper {
  --td-tab-track-thickness: 0px;
}
.header-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 163px;
  background: white;
  z-index: 0;
}
.header-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 163px;
  z-index: 1;
}
.bottom-tab-bar {
  position: fixed;
  bottom: 24px;
  width: 100%;
}

img {
  display: block;
  width: 100%;
  height: 192px;
}

.热门推荐 {
  width: 80px;
  height: 28px;
  opacity: 1;
  color: #000000e6;
  font-size: 20px;
  font-weight: 600;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 28px;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.example-search {
  width: 343px;
  background-color: #fff;
  padding: 21px 0px;
}
.t-tabs {
  margin-bottom: 16px;
}

.label-content {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 3px;
  }
}

.search-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  padding: 5px;
  box-sizing: border-box;
  z-index: 1000;
}

.search-box input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
}

.container {
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  //align-items: center;
}

.placeholder {
  height: 134px;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 166px;
  height: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* padding-left: 16px; */
  width: 100%;
}

.sticky_ {
  position: -webkit-sticky;
  position: sticky;
  top: 194px;
  // height: 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* padding-left: 16px; */
  width: 100%;
}

.sticky-content {
  width: 100%;
  background: #fff;
  padding-left: 16px;
  box-sizing: border-box;
  height: 28px;
  opacity: 1;
  color: #000000e6;
  font-size: 20px;
  font-weight: 600;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 28px;
}

.other-content {
  width: 343px;
  height: 120px;
  border-radius: 9px;
  opacity: 1;
  background: #fff;
  box-shadow: 0 6px 30px 5px #0000000d, 0 16px 24px 2px #0000000a,
    0 8px 10px -5px #00000014;
  margin-bottom: 20px;
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.3333rem;
  height: 1.28rem;
  position: absolute;
  margin-left: 6.6667rem;
  margin-top: 11.7067rem;
  //border-left: 1px solid #e7e7e7ff;
  border-bottom: 0.5px solid #e7e7e7ff;
}
.filter_ {
  width: 3.3333rem;
  height: 0.5867rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #e7e7e7ff;
}
</style>
