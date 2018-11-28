<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="5">
       <b-table striped hover :items="authors"></b-table>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
var querystring = require('querystring');
var Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  data () {
    return {
      authors:[{
          birthday: '',
          description: '',
          _id: '',
          name: '',
          username: ''
      }]
    }
  },
  created(){
    this.$axios.setHeader('Authentication', this.$store.state.auth.token);
    this.$axios.get('/author').then(function (response) {
      if (response.data.error == true) {
        alert(response.data.msg)
      }else{
        this.authors = response.data.authors;
      }
    });;
  }
}
</script>
