<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="5">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
        <b-badge v-show="form.error == null">{{ form.error }}</b-badge>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-link href="/secure">Secure</b-link>
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
      form: {
        username: '',
        password: '',
        error: null
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      try {
        var item = this;
        this.$axios.$post('/secure/login', querystring.stringify({ username: this.form.username, password: this.form.password }))
        .then(function (response) {
          if (response.error == false) {
            item.$store.commit('setAuth', response.user) // mutating to store for client rendering
            Cookie.set('auth', response.user) // saving token in cookie for server rendering
            window.location.reload(true)
          }
        });

        this.form.username = ''
        this.form.password = ''
        this.form.error = null
      } catch (e) {
        this.form.error = e.message
      }
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.username = '';
      this.form.password = '';
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>
