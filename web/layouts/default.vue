<template>
  <div>
    <div class="nav">
      <ul class="nav-list">
        <li v-for="item in links" :key="item.name">
          <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
        </li>
      </ul>
      <div class="user-draw">
        <div v-if="$store.state.auth.user" class="user-draw-cont">
          <h6>{{ $store.state.auth.user.username }}</h6>
          <div class="user-control" @click="logout">登出</div>
        </div>
        <div v-else class="user-draw-cont">
          <form @submit.prevent="login">
            <div>
              <label>用户名</label>
              <input v-model="loginModel.username" type="text" />
            </div>
            <div>
              <label>密码</label>
              <input v-model="loginModel.password" type="password" />
            </div>
            <button>登录</button>
          </form>
        </div>
      </div>
    </div>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginModel: {},
      links: [
        { name: '首页', link: '/' },
        { name: '文章', link: '/articles' },
      ],
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('local', {
        data: this.loginModel,
      })
    },
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
