<template>
  <v-card class="mx-auto my-auto" min-width="400">
    <v-card-title>
      Top western road trips
    </v-card-title>
    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>
    <v-form @submit.native.prevent="login">
      <v-card-text>
        <v-text-field
          prepend-icon="mdi-account"
          label="用户名"
          v-model="loginModel.username"
          type="text"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock"
          label="Password"
          v-model="loginModel.password"
          type="password"
          autocomplete="new-password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="success" type="submit">登录</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loginModel: {}
  }),
  methods: {
    async login() {
      const res = await this.$http.post('/auth/login', this.loginModel)
      // console.log(res.data)
      // sessionStorage.token = res.data.token
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>

<style lang="scss"></style>
