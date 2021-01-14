<template>
  <div class="pl-8 pr-8">
    <v-tabs v-model="tab" class="mt-7">
      <v-tab to="usercate">用户侧目录</v-tab>
      <v-tab to="servercate">运营侧目录</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <router-view></router-view>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'Category',

  data: () => ({
    tab: null
  })
}
</script>

<style></style>
