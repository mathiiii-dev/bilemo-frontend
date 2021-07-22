export default function({ $axios, store, redirect }) {
    $axios.onRequest(request => {
    if (sessionStorage.getItem('token')) {
      request.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    }

    return request
  })

  $axios.onResponse(response => {
   return response
  })

  $axios.onError(error => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    console.log(code)

    if (code === 401) {
      sessionStorage.removeItem('token')
      return redirect('/')
    }

    if (code === 404) {
      localStorage.setItem('message-404', error.response.data.error.message)
      return redirect('/error/404')
    }

    if (code === 403) {
      localStorage.setItem('message-403', error.response.data.error.message)
      return redirect('/error/403')
    }
  })
}
