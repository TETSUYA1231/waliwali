<template>
  <div>
    <h3>{{isNew ? '创建' : '编辑'}}文章</h3>
    <ele-form
    :form-data="data"
    :form-desc="fields"
    :request-fn="submit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ArticleList extends Vue {
  @Prop(String) id!: string
  data = {}

  fields = {
    title: {label: '文章标题', type: 'input'},
    tags: {label: '文章标签', type: 'tag'},
    covers: {label: '文章封面图集合', type: 'image'}
  }

  get isNew() {
    return !this.id
  }

  async fetch() {
    const res = await this.$http.get(`articles/${this.id}`)
    this.data = res.data
  }

  async submit(data) {
    const url = this.isNew ? `articles` : `articles/${this.id}`
    const method = this.isNew ? 'post' : 'put'
    await this.$http[method](url, data)
    this.$message.success('保存成功')
    this.data = {}
    this.$router.go(-1)
  }

  created() {
    !this.isNew && this.fetch()
  }
}
</script>

<style>

</style>