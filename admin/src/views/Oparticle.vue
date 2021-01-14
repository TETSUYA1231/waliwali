<template>
  <div class="pl-8 pr-8">
    <v-data-table
      :headers="headers"
      :items="list"
      class="elevation-0 mt-4 rounded-0"
    >
      <template v-slot:[`item.createdAt`]="{ item }">
        <span>{{ new Date(item.createdAt).toLocaleString() }}</span>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>运营文章列表</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                添加
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.title"
                        label="文章标题"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="5">
                      <v-select
                        v-model="editedItem.category"
                        :items="servercates"
                        item-text="name"
                        item-value="_id"
                        :menu-props="{ maxHeight: '400' }"
                        label="文章分类"
                        hint="选择文章所属的分类"
                        persistent-hint
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="10">
                      <!-- <v-file-input
                        v-model="editedItem.cover"
                        type="file"
                        accept="image/*"
                        label="添加文章封面图集,注意图片大小不要超过1MB！"
                        prepend-icon="mdi-folder-multiple-image"
                        outlined
                        dense
                      >
                        <template v-slot:selection="{ file }">
                          <v-chip small label color="primary">
                            {{ file }}
                          </v-chip>
                        </template>
                      </v-file-input> -->
                      <v-img
                        :src="photoSrc"
                        max-height="150"
                        max-width="250"
                        aspect-ration="0.8"
                        v-if="change"
                      >
                        <input
                          type="file"
                          @change="PreviewImage($event)"
                          accept="image/*"
                          v-if="change"
                        />
                      </v-img>
                    </v-col>
                    <v-col cols="2">
                      <v-btn color="blue" dark @click="uploadFiles"
                        >上传图片</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <myEditor
                        v-model="editedItem.body"
                        uploadUrl="/upload"
                      ></myEditor>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed @click="close">取消</v-btn>
                <v-btn color="primary" depressed @click="save">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定删除这篇文章 ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >取消</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >确定</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import myEditor from '../components/Editor'

export default {
  name: 'oparticle',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: '_id', value: '_id', sortable: false },
      { text: '文章标题', align: 'start', value: 'title', sortable: false },
      { text: '创建时间', align: 'start', value: 'createdAt' },
      { text: '操作', value: 'actions', sortable: false }
    ],
    list: [],
    change: true,
    img: '',
    editedIndex: -1,
    editedItem: {
      title: '',
      cover: [],
      body: ''
    },
    defaultItem: {
      title: '',
      cover: [],
      body: ''
    },
    servercates: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新建文章' : '编辑文章'
    },
    photoSrc() {
      return this.editedItem.cover.toString()
    }
  },

  components: {
    myEditor
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize() && this.getServercate()
  },

  methods: {
    async initialize() {
      const res = await this.$http.get('/oparticles')
      this.list = res.data.data
    },

    async getServercate() {
      const res = await this.$http.get('/servercates')
      this.servercates = res.data.data
    },

    editItem(item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.list.splice(this.editedIndex, 1)
      await this.$http.delete(`/oparticles/${this.editedItem._id}`)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // input file数据获取
    PreviewImage(e) {
      var files = e.target.files[0]
      var that = this
      let reader = new FileReader()
      if (files) {
        reader.readAsDataURL(files)
      }
      reader.onload = function() {
        that.editedItem.cover = this.result
      }
      this.editedItem.cover = files
    },

    // 上传方法
    async uploadFiles() {
      var formData = new FormData()
      formData.append('file', this.editedItem.cover)
      await this.$http
        .post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
          alert(res.data)
          this.editedItem.cover = res.data.url
        })
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem)
        await this.$http.put(
          `/oparticles/${this.editedItem._id}`,
          this.editedItem
        )
      } else {
        this.list.push(this.editedItem)
        await this.$http.post('/oparticles', this.editedItem)
      }
      this.close()
      this.initialize()
    }
  },

  mounted() {}
}
</script>

<style></style>
