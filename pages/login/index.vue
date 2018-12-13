<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="5">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="username_group"
                      label="Username:"
                      label-for="username">
          <b-form-input id="username"
                        type="text"
                        v-model="form.username"
                        required
                        placeholder="Enter username">
          </b-form-input>
        </b-form-group>
        <b-form-group id="password_group"
                      label="Password:"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
          </b-form-input>
        </b-form-group>
        <div>
          <b-button class="half_width" type="submit" size="md" variant="primary">Submit</b-button>
          <b-button class="half_width right_align" type="reset" size="md" variant="danger">Reset</b-button>
        </div>
        <b-alert variant="danger"
             dismissible
             fade
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
      {{ error }}
    </b-alert>
      </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
var querystring = require('querystring');
var Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      showDismissibleAlert: false,
      error: '',
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      try {
        var i = this;
        this.$axios.$post('/secure/login', querystring.stringify({ username: this.form.username, password: this.form.password }))
        .then(function (response) {
          if (response.error == false) {
            i.$store.commit('setAuth', response.user)
            Cookie.set('auth', response.user)
            window.location.reload(true)
          }else if(response.error == true){
            i.error = response.msg;
            i.showDismissibleAlert = true;
          }
        });

        this.form.username = ''
        this.form.password = ''
      } catch (e) {
        this.error = e.message
        this.showDismissibleAlert = true;
      }
    },
    onReset (evt) {
      evt.preventDefault();
      this.form.username = '';
      this.form.password = '';
    }
  }
}
</script>

<style>
.half_width{
  width: 40%;
}
.right_align{
  float: right;
}
</style>
