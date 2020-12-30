<template>
  <div>
    <h3>文章列表</h3>
    <div class="card-group">
      <div v-for="item in articles" :key="item._id" class="card">
        <div class="card-cover">
          <nuxt-link :to="`/articles/${item._id}`">
            <img :src="item.cover" />
          </nuxt-link>
        </div>
        <div class="card-content">
          <div class="card-text">
            <h4>{{ item.title }}</h4>
            <span>文章摘要</span>
            <span>{{ item.createdAt }}</span>
            <div class="card-marks">
              <div>{{ item.category.name }}</div>
              <div v-for="arry in item.marks" :key="arry._id">
                {{ arry.name }}
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div>点赞</div>
            <div>收藏</div>
            <div>评论</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const data = await $axios.$get('articles')
    return {
      articles: data,
    }
  },
}
</script>

<style></style>
