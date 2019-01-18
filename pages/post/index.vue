<template>
  <b-row>
    <b-col align-h="center" md="12" offset-md="4">
      <h1 class="font-weight-bold" style="padding-bottom: 10px;">
        List of Todos
      </h1>
    </b-col>
    <b-col cols="12">
      <b-row align-h="center" v-for="todo in todos" :key="todo._id">
        <b-col align-h="center" md="12" offset-md="5">
            <b-card :title="todo.name"
                  tag="article"
                  style="max-width: 30rem;"
                  class="mb-2">
              <p class="card-text">
                {{ todo.description }}
              </p>
              <b-row>
                <b-col>
                  <b-form-checkbox id="doneTodo"
                                  v-model="todo.done"
                                  disabled
                                  value="true"
                                  unchecked-value="false">
                    <span v-if="todo.done == true">Done !</span>
                    <span v-else-if="todo.done == false">Not done !</span>
                  </b-form-checkbox>
                </b-col>
                <b-col cols="1"></b-col>
                <b-col><span class="text-muted">Author: {{ todo.author.name }}</span></b-col>
              </b-row>
            </b-card>
        </b-col>
      </b-row>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
var querystring = require('querystring');
var Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  asyncData () {
    return {
      todos:[{
          name: '',
          done: true,
          _id: '',
          description: '',
          author: [{}]
      }]
    }
  },
  methods: {
    fetchTodos(){
      var i = this;
      i.$axios.setHeader('Authentication', this.$store.state.auth.token);
      this.$axios.get('/todo').then(function (response) {
        if (response.data.error == true) {
          alert(response.data.msg)
        }else{
          i.totalRows = response.data.todos.length;
          i.todos = response.data.todos;
        }
      });;
    }
  },
  mounted(){
    this.fetchTodos();
  }
}
</script>

<style>
.modal_title{
  font-size: 22px;
  font-weight: 600;
}
</style>
