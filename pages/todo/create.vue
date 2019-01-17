<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="12">
      <b-form>
        <b-form-group id="nameLabel"
                      label="Todo Name:"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="todo.name"
                        required
                        placeholder="Enter Name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="descriptionLabel"
                      label="The Post:"
                      label-for="description">
          <b-form-textarea id="textarea1"
                          v-model="todo.description"
                          placeholder="The Text of the Todo !"
                          :rows="5"
                          :max-rows="6">
          </b-form-textarea>
        </b-form-group>
        <b-form-group id="doneLabel"
                      label="Done"
                      label-for="done">
          <b-form-checkbox id="done"
                     v-model="todo.done"
                     value="true"
                     unchecked-value="false">
            {{ doneOrNot }}
          </b-form-checkbox>
        </b-form-group>
        <b-button @click="onReset()" variant="danger">Reset</b-button>
        <nuxt-link id="nuxtLinkBack" to="/todo">
          <b-button>Go back</b-button>
        </nuxt-link>
        <b-button type="submit" @click.stop="onSubmit($event)" variant="success">Add</b-button>
      </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>
<script>
export default {
  asyncData (){
    return{
      todo:{
        name: '',
        done: 'false',
        author: '',
        description: ''
      },
      doneOrNot: 'Not done !'
    }
  },
  watch:{
    'todo.done': function (newVal, oldVal) {
      if (newVal == 'true') {
        this.doneOrNot = 'Done !';
      }else if (newVal == 'false'){
        this.doneOrNot = 'Not Done !';
      }
    }
  },
  methods: {
    onSubmit(e){
      e.preventDefault();
      this.$axios.setHeader('Authentication', this.$store.state.auth.token);
      this.$axios.post('/todo/create', this.todo).then(function (response) {
        alert(response.data.msg);
        if (response.data.error == false) {
          document.getElementById('nuxtLinkBack').click();
        }
      });
    },
    onReset(){
        this.todo.name= '';
        this.todo.done= 'false';
        this.todo.description= '';
    }
  },
  mounted(){
    this.todo.author = this.$store.state.auth._id;
  }
}
</script>