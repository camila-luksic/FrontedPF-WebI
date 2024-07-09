document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    let cursoId = params.get('curso_id');
    if (cursoId) {
        await mostrarDetallesCurso(cursoId);
    } else {
        console.error('No se encontró el ID del curso en la URL');
    }
});

async function mostrarDetallesCurso(cursoId) {
    const endpoint = `http://localhost:3000/lecciones/${cursoId}`; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del curso');
        }

        const lecciones = await response.json();
        console.log("Lecciones obtenidas:", lecciones);
        const cursoContainer = document.getElementById('cursos-container');

        if (!cursoContainer) {
            console.error('No se encontró el contenedor con el id "cursoContainer"');
            return;
        }

        const leccionesList = document.createElement('ul');
        lecciones.forEach(leccion => {
            const leccionItem = document.createElement('li');
            const leccionLink = document.createElement('a');
            leccionLink.href = leccion.link; 
            leccionLink.textContent = leccion.nombre_leccion;
            leccionItem.appendChild(leccionLink);

           
            const editarButton = document.createElement('button');
            editarButton.textContent = 'Editar';
            editarButton.addEventListener('click', () => {
               
                if (leccion.leccion_id) {
                    window.location.href = `editarLeccion.html?curso_id=${cursoId}&leccion_id=${leccion.leccion_id}`;
                } else {
                    console.error('ID de lección no definido:', leccion);
                }
            });
            leccionItem.appendChild(editarButton);

            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.addEventListener('click', async () => {
                if (confirm(`¿Estás seguro que deseas eliminar la lección "${leccion.nombre_leccion}"?`)) {
                    try {
                        console.log(leccion.leccion_id);
                        const response = await fetch(`http://localhost:3000/lecciones/${leccion.leccion_id}`, {
                            method: 'DELETE'
                        });
                        if (!response.ok) {
                            throw new Error('Error al eliminar la lección');
                        }
                       
                        cursoContainer.innerHTML = '';
                        await mostrarDetallesCurso(cursoId);
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Hubo un error al eliminar la lección. Por favor, intenta de nuevo.');
                    }
                }
            });
            leccionItem.appendChild(eliminarButton);

            leccionesList.appendChild(leccionItem);
        });

        cursoContainer.appendChild(leccionesList);

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al obtener los detalles del curso. Por favor, intenta de nuevo.');
    }
}
