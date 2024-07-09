let cursoId;
const params = new URLSearchParams(window.location.search);
cursoId = params.get('curso_id');
async function handleLogin(e) {
    let loginExitoso = false;
    const iemail = document.getElementById("email").value;
    const ipass = document.getElementById("pass").value;

    const response = await fetch("http://127.0.0.1:3000/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: iemail, password: ipass })
    });

    const data = await response.json();
    localStorage.setItem('userId', data.id);


    if (response.ok) {
        loginExitoso = true;
        sessionStorage.setItem("userInSession", JSON.stringify(data));
        if (data.role) {
            localStorage.setItem('userRole', data.role);
        }

        console.log(data);
    } else {
        console.error('Login failed:', data.message);
        alert("No esta registrado , cree una cuenta");
        return; 
    }
    if (loginExitoso) {

        console.log(cursoId);
        if (cursoId) {
            const userInSession = JSON.parse(sessionStorage.getItem("userInSession"));
            const userId = userInSession.id; 

            const matricularResponse = await fetch("http://127.0.0.1:3000/misCursos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario: userId, curso: cursoId })
            });

            if (matricularResponse.ok) {
                console.log('Course successfully added to user\'s courses');
                //window.location.href = `curso-add.html?curso_id=${cursoId}`;
            } else {
                const matricularData = await matricularResponse.json();
                console.error('Failed to add course:', matricularData.message);
            }
        } else {
            console.error('No course ID found in URL parameters');
        }
        const isAdmin = document.getElementById('rolAdmin').checked;

        if (isAdmin) {
            window.location.href = `curso-add.html?curso_id=${cursoId}&type=Administrador`; 
        } else {
        window.location.href = `curso-add.html?curso_id=${cursoId}&type=Usuario`; 
        }

       // window.location.href = `curso-add.html?curso_id=${cursoId} `;
    }
}

function getUserInSession() {
    const user = sessionStorage.getItem("userInSession");
    return user ? JSON.parse(user) : null;
}

async function crearUser() {
    window.location.href = `login.html?curso_id=${cursoId}`;
}
