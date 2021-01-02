<template>
  <div class="comment">
    <div class="comment-list">
      <h4>评论</h4>
      <ul>
        <li v-for="(item, i) in comments" :key="i">
          <span>{{ item.user.username }}</span>
          <p>{{ item.content }}</p>
          <span>{{ item.createdAt }}</span>
        </li>
      </ul>
    </div>
    <form @submit.prevent="send">
      <input v-model="content" type="text" label="说点啥吧" />
      <button>发送</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: null,
      comments: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async send() {
      await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.content,
      })
      this.content = null
      await this.fetch()
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments')
    },
  },
}
</script>

<style></style>
