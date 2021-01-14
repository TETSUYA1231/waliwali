<template>
  <div class="pl-8 pr-8">
    <v-data-table
      :headers="headers"
      :items="adminList"
      class="elevation-0 mt-4 rounded-0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>管理员列表</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
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
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.username"
                        :counter="10"
                        :rules="nameRules"
                        label="名称"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.password"
                        type="password"
                        :rules="passRules"
                        label="密码"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" text @click="save">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定删除该管理员?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
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
export default {
  name: 'backuser',

  data: () => ({
    valid: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: '_id', value: '_id', sortable: false },
      {
        text: '名称',
        align: 'start',
        sortable: false,
        value: 'username'
      },
      { text: '操作', value: 'actions', sortable: false }
    ],
    nameRules: [
      v => !!v || 'Required.',
      v => v.length <= 10 || '用户名不能超过10位字符',
      v => /^[_a-zA-Z0-9]+$/.test(v) || '用户名仅由英文字母，数字以及下划线组成'
    ],
    passRules: [
      v => !!v || 'Required.',
      v =>
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*0-9]{6,20}$/.test(v) ||
        '密码必须为6-20位，包含至少一个数字和特殊字符'
    ],
    adminList: [],
    editedIndex: -1,
    editedItem: {
      username: '',
      password: ''
    },
    defaultItem: {
      username: '',
      password: ''
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新建管理员' : '编辑'
    }
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
    this.initialize()
  },

  methods: {
    async initialize() {
      const res = await this.$http.get('/adminuser')
      this.adminList = res.data.data
    },

    editItem(item) {
      this.editedIndex = this.adminList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.adminList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.adminList.splice(this.editedIndex, 1)
      await this.$http.delete(`/adminuser/${this.editedItem._id}`)
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

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.adminList[this.editedIndex], this.editedItem)
        await this.$http.put(
          `/adminuser/${this.editedItem._id}`,
          this.editedItem
        )
      } else {
        this.adminList.push(this.editedItem)
        await this.$http.post('/adminuser', this.editedItem)
      }
      this.close()
      this.initialize()
    }
  }
}
</script>

<style></style>
