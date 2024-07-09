document.addEventListener('DOMContentLoaded', async () => {
    await mostrarCursos();
});

async function mostrarCursos() {
    const endpoint = 'http://localhost:3000/cursos'; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error al obtener los cursos');
        }

        const cursos = await response.json();
        const cursosContainer = document.getElementById('cursos-container');

        if (!cursosContainer) {
            console.error('No se encontró el contenedor con el id "cursosContainer"');
            return;
        }

        cursos.forEach(curso => {
            const cursoItem = document.createElement('div');
            cursoItem.classList.add('curso-item');

            const cursoTitle = document.createElement('a');
            cursoTitle.href = `seleccionarCurso.html?curso_id=${curso.cursos_id}`; // Enlace con el ID del curso
            cursoTitle.classList.add('curso-title'); 
            cursoTitle.textContent = curso.nombrecurso;


            const cursoImagen = document.createElement('img');
            cursoImagen.src = curso.img_name; 
            cursoImagen.alt = curso.nombre;
            cursoImagen.style.width = '200px'; 
            cursoItem.appendChild(cursoTitle);
            cursoItem.appendChild(cursoImagen);

            cursosContainer.appendChild(cursoItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
