<template>
  <div>
    <div class="myNavbar">
      <b-navbar type="dark" variant="primary" toggleable>
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
          <b-navbar-nav>
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item v-show="!authUser" href="/login">login</b-nav-item>
            <b-nav-item v-show="authUser" v-on:click="logout()">logout</b-nav-item>
            <b-nav-item v-show="authUser" href="/todo">Todos</b-nav-item>
            <b-nav-item v-show="authUser && admUser" href="/author">Authors</b-nav-item>
            <b-nav-item v-show="authUser" href="/secure">Secure page</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container>
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <nuxt />
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {
      authUser: (this.$store.state.auth && this.$store.state.auth.token != '')? true : false,
      admUser: (this.$store.state.auth && this.$store.state.auth.admin == true )? true : false,
    }
  },
  methods: {
    logout() {
      var item = this;
      this.$axios.setHeader('Authentication', this.$store.state.auth.token);
      this.$axios.$get('/secure/logout').then(function (response) {
        if (response.error == false) {
          Cookie.remove('auth')
          item.$store.commit('setAuth', null)
          window.location.reload(true)
        }else{
          console.error(response.msg);
        }
      })
    }
  }
}
</script>

<style>
.myNavbar{
  margin-bottom: 2vh;
}

</style>
