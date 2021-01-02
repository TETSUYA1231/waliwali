<template>
  <div>
    <h3>{{ article.title }}</h3>
    <div>{{ article.createdAt }}</div>
    <div v-for="arry in article.marks" :key="arry._id">{{ arry.name }}</div>
    <like-btn :object="article._id" type="Article"></like-btn>
    <div class="article-body"></div>
    <div>
      <comment-list type="Article" :object="article._id"></comment-list>
    </div>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
import CommentList from '../../components/CommentList.vue'

export default {
  components: { LikeBtn, CommentList },
  async asyncData({ params, $axios }) {
    const { id } = params
    const article = await $axios.$get(`articles/${id}`, {
      params: {
        query: {
          populate: 'marks',
        },
      },
    })
    return {
      id,
      article,
    }
  },
}
</script>

<style></style>
