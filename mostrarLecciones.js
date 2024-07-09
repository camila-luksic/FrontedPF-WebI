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
    const endpoint = `http://localhost:3000/lecciones/${cursoId}`; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del curso');
        }

        const lecciones = await response.json();
        console.log("---");
        console.log(lecciones);
        const cursoContainer = document.getElementById('cursos-container');

        if (!cursoContainer) {
            console.error('No se encontró el contenedor con el id "cursoContainer"');
            return;
        }

        
        const leccionesList = document.createElement('ul');
        lecciones.forEach(leccion => {
            const leccionItem = document.createElement('li');
           
            const thumbnail = document.createElement('img');
            const videoId = extractVideoId(leccion.link);
            if (videoId) {
                thumbnail.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
            }
            thumbnail.alt = leccion.nombre_leccion;
            thumbnail.style.width = '320px';
            thumbnail.style.height = 'auto';
            thumbnail.style.marginRight = '10px';

            const leccionLink = document.createElement('a');
            
            // leccionLink.href = `detalleLeccion.html?leccion_id=${leccion.id}`;
            leccionLink.href = leccion.link; 
             leccionLink.textContent = leccion.nombre_leccion;

             leccionLink.addEventListener('click', async (event) => {
                event.preventDefault();
                console.log("/"+leccion.leccion_id) 
                await crearRegistroAvance(cursoId, leccion.leccion_id);
                window.location.href = leccion.link; 
            });
 

            leccionItem.appendChild(thumbnail);


            leccionItem.appendChild(leccionLink);
            leccionesList.appendChild(leccionItem);
        });

        cursoContainer.appendChild(leccionesList);
       

        
       
      
    } catch (error) {
        console.error('Error:', error);
    }
}

async function crearRegistroAvance(cursoId, leccionId) {
    console.log("leccion:"+leccionId);
    const leccionid=leccionId;
    console.log("porsi"+leccionid)
    
    const user = JSON.parse(sessionStorage.getItem("userInSession"));
    const userInSession = user.id; 

    console.log(userInSession);
    if (!userInSession) {
        console.error('Usuario no identificado. No se puede crear el registro de avance.');
        return;
    }

    const mis_cursos_id = await getMisCursosId(userInSession, cursoId);
    console.log("mc"+mis_cursos_id)
    console.log(cursoId);
    if (!mis_cursos_id) {
        console.error('No se encontró el ID de mis cursos para el usuario y curso.');
        return;
    }

    const data = {
        "mis_cursos_id": mis_cursos_id,
        "leccion_id": leccionid
    };


    console.log('Datos a enviar al servidor:', data);
    try {
        const response = await fetch('http://localhost:3000/avance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('Registro de avance creado para la lección:', leccionid);
        } else {
            console.error('Error al crear registro de avance:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud para crear registro de avance:', error);
    }
}
async function getMisCursosId(usuarioId, cursoId) {
    console.log(usuarioId,cursoId)
    try {
        const response = await fetch(`http://localhost:3000/miscursos/curso/${cursoId}/usuario/${usuarioId}/id`);
        console.log("-"+response);
        const data = await response.json();
        console.log('---', data); 
        console.log("***"+data.miscursos_id);
        return data.miscursos_id; 
    } catch (error) {
        console.error('Error al obtener ID de mis cursos:', error);
        return null; 
    }
}
function extractVideoId(url) {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
}

