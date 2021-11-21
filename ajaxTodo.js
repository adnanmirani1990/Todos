function fetchTodos() {
    return fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
        .then(data => {
            return  data.json()
        })
        .then( result=> {
            return result
        })
}
function fetchTodo(id) {
   return  fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`)
        .then(data => {
            return  data.json()
        })
        .then(result => {
            return result
        })
}
function addTodo({title,description,dueDate,checked}) {
    return  fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description:description ,
            dueDate: dueDate,
            checked: checked,
            createdAt: (new Date()).toString(),
            updatedAt: (new Date()).toString(),
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function delTodo(id) {
    return  fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function updateTodo({title,description,dueDate,checked}, id) {
    return  fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description:description ,
            dueDate: dueDate,
            checked: checked,
            createdAt: (new Date()).toString(),
            updatedAt: (new Date()).toString(),
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export { fetchTodos, fetchTodo, addTodo, delTodo, updateTodo};





























// fetchTodos()

// fetchTodo(i)

// addTodo()
//   .then(() => fetchTodos())
//   .then(() => render())


// updateTodo(1)
//     .then(() =>{
//       fetchTodos()
//     })
//
//
// delTodo(4)
//       .then(() =>{
//         fetchTodos()
//       })

