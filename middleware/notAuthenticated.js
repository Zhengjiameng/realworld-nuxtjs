export default function ({ store, redirect }) {
  console.log(111)
  // If the user is not authenticated
  if (store.state.user) {
    return redirect('/')
  }
}
