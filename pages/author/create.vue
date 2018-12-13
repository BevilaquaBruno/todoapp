<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="12">
      <b-form>
        <b-form-group id="nameLabel"
                      label="Author Name:"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="author.name"
                        required
                        placeholder="Enter Name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="birthdayLabel"
                      label="Birthday:"
                      label-for="birthday">
          <b-form-input id="birthday"
                        type="date"
                        v-model="author.birthday"
                        placeholder="1900-01-01">
          </b-form-input>
        </b-form-group>
        <b-form-group id="descriptionLabel"
                      label="Description"
                      label-for="description">
          <b-form-input id="description"
                        type="text"
                        v-model="author.description">
          </b-form-input>
        </b-form-group>
        <b-form-group id="usernameLabel"
                      label="Username"
                      label-for="username">
          <b-form-input id="username"
                        type="text"
                        v-model="author.username"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="emailLabel"
                      label="E-mail"
                      label-for="email">
          <b-form-input id="email"
                        type="email"
                        v-model="author.email"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="passwordLabel"
                      label="Password"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="author.password"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="adminLabel">
          <b-form-checkbox id="admin"
                        v-model="author.admin"
                        value="true"
                        unchecked-value="false">
          Admin
        </b-form-checkbox>
        </b-form-group>
        <b-button @click="onReset()" variant="danger">Reset</b-button>
        <nuxt-link id="nuxtLinkBack" to="/author">
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
      author: {
        name: '',
        username: '',
        email: '',
        password: '',
        admin: false,
        birthday: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit(e){
      e.preventDefault();
      this.$axios.setHeader('Authentication', this.$store.state.auth.token);
      this.$axios.post('/author/create', this.author).then(function (response) {
        alert(response.data.msg);
        if (response.data.error == false) {
          document.getElementById('nuxtLinkBack').click();
        }
      });
    },
    onReset(){
        this.author._id= '';
        this.author.name= '';
        this.author.username= '';
        this.author.email= '';
        this.author.password= '';
        this.author.admin= '';
        this.author.birthday= '';
        this.author.description= '';
    }
  }
}
</script>

