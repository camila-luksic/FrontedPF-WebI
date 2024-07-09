(async function() {
    const userInSession = getUserInSession();
    if (!userInSession) {
        window.location.href = 'login.html';
        return;
    }

    document.body.style.display = "block";

    await cargarCursos();
})();

async function cargarCursos() {
    const userInSession = getUserInSession();
    const response = await fetch(`/api/curso/usuario/${userInSession.usuarioId}`);
    if (!response.ok) {
        return;
    }

    const listOfCursos = await response.json();
    mostrarCursosSimple(listOfCursos); 
}

function mostrarCursosSimple(listOfCursos) {
    const cursosHtml = document.getElementById("cursos");

    if (listOfCursos.length === 0) {
        cursosHtml.innerHTML =
            `<div class="col-12 text-center mb-5">
                No tiene cursos registrados.
            </div>`;
        return;
    }

    let html = "";
    for (let curso of listOfCursos) {
        html += `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${curso.imagen}" class="card-img-top" alt="${curso.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${curso.titulo}</h5>
                        <p class="card-text">${curso.descripcion}</p>
                    </div>
                </div>
            </div>`;
    }
    cursosHtml.innerHTML = html;
}

function mostrarCursosDetallado(listOfCursos) {
    const cursosHtml = document.getElementById("cursos");

    if (listOfCursos.length === 0) {
        cursosHtml.innerHTML =
            `<div class="col-12 text-center mb-5">
                No tiene cursos registrados.
            </div>`;
        return;
    }

    let html = "";
    for (let curso of listOfCursos) {
        let leccionesHtml = "";
        for (let leccion of curso.lecciones) {
            leccionesHtml += `
                <div>
                    <strong>${leccion.titulo}:</strong>
                    <a href="${leccion.linkVideo}" target="_blank">Ver Video</a>
                </div>`;
        }

        html += `
            <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${curso.titulo}</h5>
                        <div class="card-text">
                            ${leccionesHtml}
                        </div>
                    </div>
                </div>
            </div>`;
    }
    cursosHtml.innerHTML = html;
}
