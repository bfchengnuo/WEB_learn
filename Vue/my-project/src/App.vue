<template>
<div>
  <input type="text" v-model="content">
  <button @click="mSubmit">提交</button>

  <ul>
    <!-- 根据发布-订阅，监听内部组件的自定义事件 -->
    <todo-list v-for="(item, index) of list" :key="index" :content="item" :index="index" @delete="handleDelete"></todo-list>
  </ul>
</div>
</template>

<script>
import TodoItem from './components/TodoItem'

export default {
  // 相当于子模板的定义区
  name: 'App',
  components: {
    // 声明局部组件，如果键和值相同可以写一个
    'todo-list': TodoItem
  },
  // vue 文件中 data 只能使用函数来定义
  // ES6 简便写法
  data () {
    return {
      content: '',
      list: []
    }
  },
  methods: {
    mSubmit () {
      this.list.push(this.content)
      this.content = ''
    },
    handleDelete (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
