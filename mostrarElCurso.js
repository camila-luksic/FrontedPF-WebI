let cursoId;
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    cursoId = params.get('curso_id');
    if (cursoId) {
        await mostrarDetallesCurso(cursoId);
    } else {
        console.error('No se encontró el ID del curso en la URL');
    }
});

async function mostrarDetallesCurso(cursoId) {
    const endpoint = `http://localhost:3000/cursos/${cursoId}`; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del curso');
        }

        const curso = await response.json();
        const cursoContainer = document.getElementById('cursos-container');

        if (!cursoContainer) {
            console.error('No se encontró el contenedor con el id "cursoContainer"');
            return;
        }

        const cursoTitle = document.createElement('h1');
        cursoTitle.textContent = curso.nombrecurso;

        const cursoDescripcion = document.createElement('p');
        cursoDescripcion.textContent = `Descripción: ${curso.descripcion}`;

        const cursoCategoria = document.createElement('p');
        cursoCategoria.textContent = `Categoría: ${curso.categoria}`;

        const cursoImagen = document.createElement('img');
        cursoImagen.src = curso.img_name;
        cursoImagen.alt = curso.nombreCurso;
        cursoImagen.style.width = '400px'; 
        cursoContainer.appendChild(cursoImagen);
        cursoContainer.appendChild(cursoTitle);
        cursoContainer.appendChild(cursoDescripcion);
        cursoContainer.appendChild(cursoCategoria);

    } catch (error) {
        console.error('Error:', error);
    }
}
function cargarDetalle(cursoId) {
    console.log("---");
    window.location.href = `sign-in.html?curso_id=${cursoId}`;
}
function detalle() {
    cargarDetalle(cursoId);

}


function editar(cursoId) {

    window.location.href = `editarCurso.html?curso_id=${cursoId}`;

}
function edi(){
    editar(cursoId);
}

function eli(){
    eliminarCurso(cursoId);
}
async function eliminarCurso(cursoId) {
    if (confirm(`¿Estás seguro que deseas eliminar el curso con ID "${cursoId}"?`)) {
        try {
            const response = await fetch(`http://localhost:3000/cursos/${cursoId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el curso');
            }
           
            alert('Curso eliminado correctamente');
            window.location.href = 'perfilAdm.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al eliminar el curso. Por favor, intenta de nuevo.');
        }
    }
}

function editarLeccion(cursoId) {

    window.location.href = `seleccionarLeccion.html?curso_id=${cursoId}`;

}
function ediLec(){
    editarLeccion(cursoId);
}
