

document.getElementById('editar-leccion-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const cursoId = params.get('curso_id');
    const leccionId = params.get('leccion_id');

    if (!cursoId || !leccionId) {
        console.error('No se encontraron los IDs del curso o la lección en la URL');
        return;
    }

    const cursoId_field = cursoId;
    const id_field = leccionId;

    const name_field = document.getElementById('nombreLeccion').value;
    const link_field = document.getElementById('cursoLink').value;

    const formData = {
        nombre: name_field,
        link: link_field
    };
    console.log(formData)

    try {
       
        const response = await fetch(`http://localhost:3000/lecciones/${cursoId}/${leccionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la lección');
        }

        alert('Lección actualizada exitosamente');
        window.location.href = `perfilAdm.html`;
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al actualizar la lección. Por favor, intenta de nuevo.');
    }
});
