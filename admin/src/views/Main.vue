<template>
  <v-app>
    <v-navigation-drawer class="grey lighten-5" v-model="drawer" app>
      <v-system-bar dark color="primary">
        <v-icon>mdi-clock-time-eight</v-icon>
        <span>{{ nowTime }}</span>
        <span>{{ nowWeek }}</span>
      </v-system-bar>
      <v-list nav dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              技术支持
            </v-list-item-title>
            <v-list-item-subtitle>tetsuyasensi@qq.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group class="mt-4" color="primary" v-model="model">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.path">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="grey lighten-4" elevate-on-scroll app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>WaliWali-后台管理系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>欢迎: {{ username }}</span>
      <v-btn text @click="loginOut">
        <span class="mr-2">退出登录</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>
    <v-footer padless>
      <v-col class="text-right overline pr-10" cols="12">
        {{ new Date().getFullYear() }} — <strong>蛙里蛙里</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Main',

  data: () => ({
    nowTime: '',
    nowWeek: '',
    drawer: null,
    items: [
      {
        icon: 'mdi-home',
        text: '首页',
        path: '/'
      },
      {
        icon: 'mdi-star',
        text: '目录管理',
        path: '/category'
      },
      {
        icon: 'mdi-send',
        text: '标签管理',
        path: '/ident'
      },
      {
        icon: 'mdi-email-open',
        text: '运营文章',
        path: '/oparticle'
      },
      {
        icon: 'mdi-account-box',
        text: '管理员列表',
        path: '/backuser'
      }
    ],
    model: 1,
    username: ''
  }),

  created() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      await this.$http.get('/auth/backuserinfo').then(res => {
        this.username = res.data.username
      })
    },
    currentTime() {
      setInterval(this.getDate, 500)
    },
    getDate() {
      const year = new Date().getFullYear()
      const month =
        new Date().getMonth() + 1 < 10
          ? '0' + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1
      const date =
        new Date().getDate() < 10
          ? '0' + new Date().getDate()
          : new Date().getDate()
      const hh =
        new Date().getHours() < 10
          ? '0' + new Date().getHours()
          : new Date().getHours()
      const mm =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      const ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      const week = new Date().getDay()
      this.nowTime =
        year +
        '年' +
        month +
        '月' +
        date +
        '日' +
        ' ' +
        hh +
        ':' +
        mm +
        ':' +
        ss
      if (week === 1) {
        this.nowWeek = '星期一'
      } else if (week === 2) {
        this.nowWeek = '星期二'
      } else if (week === 3) {
        this.nowWeek = '星期三'
      } else if (week === 4) {
        this.nowWeek = '星期四'
      } else if (week === 5) {
        this.nowWeek = '星期五'
      } else if (week === 6) {
        this.nowWeek = '星期六'
      } else if (week === 27) {
        this.nowWeek = '星期日'
      }
    },

    loginOut() {
      localStorage.clear()
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '退出成功'
      })
    }
  },
  mounted() {
    this.currentTime()
  },
  beforeDestroy() {
    if (this.getDate) {
      clearInterval(this.getDate) // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>

<style></style>
