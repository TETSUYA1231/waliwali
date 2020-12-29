<template>
  <div>
    <h3>文章列表</h3>
    <div>
      <el-button type="success" size="small" @click="$router.push('/articles/create')">创建文章</el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column v-for="(field, title) in fields"
        :prop="title"
        :key="title"
        :label="field.label"
        :width="field.width">
      </el-table-column>
      <el-table-column
        label="操作"
        :width="200">
        <template v-slot="{row}">
          <el-button type="success" size="small" @click="$router.push(`/articles/edit/${row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class ArticleList extends Vue {
  data = {}
  fields = {
    _id: {label: 'ID'},
    title: {label: '文章标题'},
    tags: {label: '文章标签'}
  }

  async fetch() {
    const res = await this.$http.get('articles')
    this.data = res.data
  }

  async remove(row) {
    try {
      await this.$confirm('是否确认删除？')
    } catch(e) {
      return
    }
    await this.$http.delete(`articles/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  created() {
    this.fetch()
  }
}
</script>

<style>

</style>