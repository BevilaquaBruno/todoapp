export default function ({ store, redirect}) {
  // If the user is authenticated redirect to secure page
  if (store.state.auth && store.state.auth.token != '') {
    redirect('/secure');
  }
}