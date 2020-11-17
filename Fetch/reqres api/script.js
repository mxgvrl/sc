
fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
        name: 'newUser'
    })
})
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        else {
            console.log('Something goes wrong')
        }
    })
    .then(data => console.log(data))
    .catch(error => console.log('Something goes wrong'))
