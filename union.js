
async function agregarUsuario() {

    let cursoId;
    const params = new URLSearchParams(window.location.search);
    cursoId = params.get('curso_id');

    let user_endpoint = 'http://localhost:3000/usuarios';

    const lastname_field = document.getElementById('apellido');
    const email_field = document.getElementById('email');
    const password_field = document.getElementById('pass');
    const username_field = document.getElementById('nombre');

    const rol_field = document.querySelector('input[name="rol"]:checked');
   
    if (!rol_field) {
        alert('Por favor, selecciona un rol.');
        return;
    }

    var formData = {
        user: {
            name: username_field.value,
            apellido: lastname_field.value,
            email: email_field.value,
            password: password_field.value,
            rol: rol_field.value

        }
    };


    try {
        var response = await fetch(user_endpoint + "/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

        })
        if (!response.ok) {
            throw new Error('Error en la creación del usuario');
        }

        const result = await response.json();
        console.log('Usuario creado:', result);
        window.location.href = `curso-add.html?curso_id=${cursoId} `;
    } catch (error) {
        console.error('Error:', error);
    };
    const isAdmin = document.getElementById('rolAdmin').checked;

    if (isAdmin) {
        window.location.href = `curso-add.html?curso_id=${cursoId}&type=Administrador`; 
    } else {
    window.location.href = `curso-add.html?curso_id=${cursoId}&type=Usuario`; 
    }

};