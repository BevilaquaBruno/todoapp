<template>
  <div>
    <div class="myNavbar">
      <b-navbar type="dark" variant="primary" toggleable=" ">
        <b-navbar-toggle target="nav_dropdown_collapse">
        </b-navbar-toggle>
        <b-collapse id="nav_dropdown_collapse" is-nav="">
          <b-navbar-nav>
            <b-nav-item href="#">
              Home
            </b-nav-item>
            <b-nav-item v-if="user.logged" href="#">
              login
            </b-nav-item>
            <b-nav-item v-else="" href="#">
              logoff
            </b-nav-item>
            <b-nav-item href="#">
              Todos
            </b-nav-item>
            <b-nav-item href="#">
              Authors
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container>
      <nuxt />
    </b-container>
  </div>
</template>

<style>
.myNavbar{
  margin-bottom: 2vh;
}

</style>
