<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="12">
      <b-form>
        <b-form-input type="text" v-show="false" v-model="author._id"></b-form-input>
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
        <b-form-group id="adminLabel">
          <b-form-checkbox id="admin"
                        v-model="author.admin"
                        value="true"
                        unchecked-value="false">
          Admin
        </b-form-checkbox>
        </b-form-group>
        <nuxt-link id="nuxtLinkBack" to="/author">
          <b-button>Go back</b-button>
        </nuxt-link>
        <b-button type="submit" @click.stop="onSubmit($event)" variant="success">Update</b-button>
      </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>
<script>
export default {
  asyncData ({ params }){
    return{
      author: {
        _id: params.id,
        name: '',
        username: '',
        email: '',
        admin: false,
        birthday: '',
        description: '',
        __v: 0,
        createdAt:''
      }
    }
  },
  mounted(){
    this.fetchAuthor(this.author._id);
  },
  methods: {
    fetchAuthor(id){
      var i = this;
      this.$axios.setHeader('Authentication', this.$store.state.auth.token);
      this.$axios.get('/author/find/'+id).then(function (response) {
        if (response.data.error == false) {
          i.author = response.data.authors;
          var d = new Date(response.data.authors.birthday);
          i.author.birthday = d.getFullYear() + '-' +
          (((d.getMonth() +1) < 10) ? '0'+(d.getMonth() +1) : (d.getMonth() +1)) + '-' +
           (((d.getDate() +1) < 10) ? '0' + (d.getDate() +1) : (d.getDate() +1));
        }else if(response.data.error == true){
          alert(response.data.msg)
          document.getElementById('nuxtLinkBasic').click();
        }
      })
    },
    onSubmit(e){
      e.preventDefault();
      this.$axios.setHeader('Authentication', this.$store.state.auth.token);
      this.$axios.put('/author/update', this.author).then(function (response) {
        alert(response.data.msg);
        if (response.data.error == false) {
          document.getElementById('nuxtLinkBack').click();
        }
      });
    }
  }
}
</script>

