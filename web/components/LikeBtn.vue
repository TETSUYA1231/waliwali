<template>
  <div @click="toggle">
    <button :style="status ? activeColor : null">
      {{ status ? '已收藏' : '收藏' }}
    </button>
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
      status: false,
      activeColor: {
        color: '#f16b6f',
      },
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    async getStatus() {
      const ret = await this.$axios.$get('actions/status', {
        params: {
          type: this.type,
          object: this.object,
          name: 'favorite',
        },
      })
      this.status = ret.status
    },
    async toggle() {
      const ret = await this.$axios.$post('actions/toggle', {
        type: this.type,
        object: this.object,
        name: 'favorite',
      })
      this.status = ret.status
    },
  },
}
</script>

<style></style>
