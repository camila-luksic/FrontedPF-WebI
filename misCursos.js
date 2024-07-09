document.addEventListener('DOMContentLoaded', async () => {
    await mostrarCursos();
});

async function mostrarCursos() {
    const endpointMisCursos = 'http://localhost:3000/misCursos';
    const endpointCursos = 'http://localhost:3000/cursos';

    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('No se encontró el userId en el localStorage');
        }

        const usuario = parseInt(userId, 10);
        if (isNaN(usuario)) {
            throw new Error('El userId no es válido');
        }

        const responseMisCursos = await fetch(`${endpointMisCursos}/${usuario}`);
        if (!responseMisCursos.ok) {
            throw new Error('Error al obtener los cursos del usuario');
        }

        const dataMisCursos = await responseMisCursos.json();
        console.log('Cursos del usuario:', dataMisCursos);

        const cursosDiv = document.getElementById('cursos-container');
        cursosDiv.innerHTML = '';

        if (dataMisCursos && Array.isArray(dataMisCursos)) {
            for (let i = 0; i < dataMisCursos.length; i++) {
                const curso = dataMisCursos[i];
                const cursoId = curso.curso;

                const cursoResponse = await fetch(`${endpointCursos}/${cursoId}`);
                if (!cursoResponse.ok) {
                    throw new Error(`Error al obtener detalles del curso con ID ${cursoId}`);
                }

                const cursoDetalle = await cursoResponse.json();

                const cursoElement = document.createElement('div');
                cursoElement.classList.add('curso-item');

                const cursoTitle = document.createElement('a');
                const params = new URLSearchParams(window.location.search);
                const tipoCuenta = params.get('type');
            
                if (tipoCuenta === 'Administrador') {
                    cursoTitle.href = `curso-add.html?curso_id=${cursoId}&type=Administrador`; 
                } else if (tipoCuenta === 'Usuario') {  
                    cursoTitle.href = `curso-add.html?curso_id=${cursoId}&type=Usuario`; 
                }
                cursoTitle.classList.add('curso-title');
                cursoTitle.textContent = cursoDetalle.nombrecurso;

                const cursoDescripcion = document.createElement('p');
                cursoDescripcion.textContent = cursoDetalle.descripcion;

                const cursoImagen = document.createElement('img');
                if (cursoDetalle.img_name) {
                    cursoImagen.src = cursoDetalle.img_name;
                }
                cursoImagen.alt = cursoDetalle.nombre;
                cursoImagen.style.width = '200px';

                const porcentaje = await getPorcentaje(cursoId, usuario);
                const porcentajeText = document.createElement('p');
                porcentajeText.textContent = `Progreso: ${porcentaje.toFixed(2)}%`;

                cursoElement.appendChild(cursoTitle);
                cursoElement.appendChild(cursoDescripcion);
                cursoElement.appendChild(cursoImagen);
                cursoElement.appendChild(porcentajeText);

                cursosDiv.appendChild(cursoElement);
            }
        } else {
            cursosDiv.textContent = 'No estás matriculado en ningún curso.';
        }
    } catch (error) {
        console.error('Error:', error);
        const cursosDiv = document.getElementById('cursos-container');
        cursosDiv.textContent = 'Hubo un error al obtener los cursos.';
    }
}

async function getPorcentaje(cursoId, usuarioId) {
    const total = await getTotalLecciones(cursoId);
    console.log("Tot"+total)
    const completadas = await getLeccionesCompletadas(cursoId, usuarioId);
    console.log("com"+completadas)

    if (total === 0 || completadas === 0) {
        return 0;
    }

    const porcentaje = (completadas / total) * 100;
    console.log(`Porcentaje del curso ${cursoId}: `, porcentaje);
    return porcentaje;
}

async function getTotalLecciones(cursoId) {
    try {
        const response = await fetch(`http://localhost:3000/lecciones/${cursoId}`);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json();
        return data.length;
    } catch (error) {
        console.error('Error obteniendo las lecciones:', error);
        return 0; 
    }
}

async function getLeccionesCompletadas(cursoId, usuarioId) {
    try {
        const response = await fetch(`http://localhost:3000/avance/curso/${cursoId}/usuario/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        
        const data = await response.json();
        console.log(`Datos de lecciones completadas del curso ${cursoId}: `, data);
      
       if (Array.isArray(data) && data.length > 0) {
        console.log(`Lecciones completadas del curso ${cursoId}: `, data);
        return data.length; 
    } else {
        console.warn('La respuesta no contiene la estructura esperada o no hay datos:', data);
        return 0; 
    }
      
    } catch (error) {
        console.error('Error obteniendo las lecciones completadas:', error);
        return 0;
    }
}
