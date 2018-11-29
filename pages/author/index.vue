<template>
  <b-row>
    <b-col></b-col>
    <b-col cols="5">
       <b-table striped hover :items="authors" :fields="fields"></b-table>
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
      fields: ['name', 'username', 'description','birthday'],
      authors:[{
          birthday: '',
          description: '',
          _id: '',
          name: '',
          username: ''
      }]
    }
  },
  mounted(){
    var i = this;
    i.$axios.setHeader('Authentication', this.$store.state.auth.token);
    var data = this.$axios.get('/author').then(function (response) {
      if (response.data.error == true) {
        alert(response.data.msg)
      }else{
        i.authors = response.data.authors;
      }
    });;
  }
}
</script>
