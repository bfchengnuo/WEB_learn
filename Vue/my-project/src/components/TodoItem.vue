<template>
<li @click="handleClick">{{content}}</li>
</template>

<script>
export default {
  name: 'TodoItem',
  // 接收传入的属性
  props: ['content', 'index'],
  // 因为模板也是一个实例可以定义事件
  methods: {
    handleClick: function () {
      // 向外发布一个自定义事件（订阅-发布模型）, 并且将 index 传递过去
      this.$emit('delete', this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
