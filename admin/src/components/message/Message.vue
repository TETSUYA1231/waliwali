<template>
  <div class="messageBox" :class="type" v-show="visible">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: '',
    visible: false
  })
}
</script>

<style lang="scss" scoped>
.messageBox {
  position: fixed;
  top: 4rem;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  min-width: 400px;
  padding: 10px 20px;
  color: #909399;
  background: #f5f5f5;
  font-size: 14px;
  border-radius: 4px;
  z-index: 99;
  &.success {
    color: #67c23c;
    background: #f0f9eb;
  }
  &.info {
    color: #909399;
    background: #edf2fc;
  }
  &.error {
    color: #f56c6c;
    background: #fef0f0;
  }
  &.warning {
    color: #e6a23c;
    background: #fdf6ec;
  }
}
</style>
