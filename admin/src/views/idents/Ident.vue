<template>
  <div class="pl-8 pr-8">
    <v-tabs v-model="tab" class="mt-7">
      <v-tab to="userident">用户侧标签</v-tab>
      <v-tab to="operateident">运营侧标签</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <router-view></router-view>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'ident',

  data: () => ({
    tab: null
  })
}
</script>

<style></style>
