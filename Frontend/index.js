const content = document.querySelector('#content');
const submit = document.querySelector('#submit');
const update = document.querySelector('#update');

window.addEventListener('load', () => {

    getUsers();


});
submit.addEventListener('click', () => {

    let fullname = document.querySelector('#fullname').value;

    let email = document.querySelector('#email').value;

    let formData = { fullname, email };

    fetch('http://localhost:8000/student/add', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    location.reload();


});


update.addEventListener('click', () => {
    console.log("clicked");
    let userID = document.querySelector('#updateUserID').value;

    let fullname = document.querySelector('#fullname').value;

    let email = document.querySelector('#email').value;

    let formData = { fullname, email ,userID};

    fetch(`http://localhost:8000/student/update/${userID}` , {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
        

    });
    location.reload('index.html');

});

//get users
function getUsers() {

    let html = "";
    fetch('http://localhost:8000/student')
        .then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            data.forEach(element => {
                html += `<tr>
                <td>${element._id}</td>
                <td>${element.fullname} </td>
                <td>${element.email}</td>
              <td> <a href="javascript:void(0)" class="btn btn-danger" onclick="deleteUser('${element._id}')">Delete</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="btn btn-primary " onclick="editUser('${element._id}')">edit</a> </td> </tr> `;
            });
            content.innerHTML = html;

        }).catch(error => {
            console.log(error);
        });

}

//delete
function deleteUser(id) {
    console.log(id);
    let formData = { id };
    fetch('http://localhost:8000/student/' + id, {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(response => response.text())
        .then(response => console.log(response))
        .catch(error => console.log(error));
        location.reload('index.html');       
}   

//edit
function editUser(id) {

    // fetch(`http:localhost:8082/student/update/${id}`)
    // .then(res => res.json())
    // .then(data => {
    //     document.querySelector('#fullname').value = data[0].fullname;
    //     document.querySelector('#email').value = data[0].email;

    // });

    // let fullname = document.querySelector('#fullname').value;

    // let email = document.querySelector('#email').value;

    // let formData = { fullname, email, id};
    var path = `http://localhost:8000/student/edit/${id}`;
    fetch(path, {
        method: 'get',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((data) => {
            document.getElementById('updateUserID').value = data._id;
            document.getElementById('fullname').value = data.fullname;
            document.getElementById('email').value = data.email;
        }).catch(error => console.log(error));
     
}      