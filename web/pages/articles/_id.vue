<template>
  <div>
    <h3>{{ article.title }}</h3>
    <div>{{ article.createdAt }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const article = await $axios.$get(`articles/${id}`)

    return {
      id,
      article,
    }
  },
}
</script>

<style></style>
