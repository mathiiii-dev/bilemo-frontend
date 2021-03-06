export default function ({$axios, redirect}) {

  $axios.onRequest(request => {
    if (sessionStorage.getItem('token')) {
      request.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    }
    return request
  })

  $axios.onResponseError(err => {
    const code = parseInt(err.response && err.response.status);

    let originalRequest = err.config;
    if (code === 401 && err.response.data.message !== 'Invalid credentials.') {
      originalRequest.__isRetryRequest = true;

      let token = sessionStorage.getItem('refresh_token');

      return new Promise((resolve, reject) => {
        let req = $axios
          .post(`/token/refresh`, {refresh_token: token})
          .then(response => {

            if (response.status === 200) {
              sessionStorage.setItem('token', response.data.token);
              sessionStorage.setItem('refresh_token', response.data.refresh_token);
              originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
            }
            resolve(response);
          }).catch(e => {
            console.log(e)
          })
      })
        .then(res => {
          return $axios(originalRequest);
        }).catch(e => {
          return redirect('/login');
        });
    } else if (code === 401) {
      console.log('Invalid credentials.')
      //TODO: Handle invalid credentials error.
    }
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    if (code === 404) {
      localStorage.setItem('message-404', error.response.data.error_description)
      return redirect('/error/404')
    }

    if (code === 403) {
      localStorage.setItem('message-403', error.response.data.error_description)
      return redirect('/error/403')
    }

  })
}
