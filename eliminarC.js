document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    let cursoId = params.get('curso_id');
    if (!cursoId) {
        console.error('No se encontró el ID del curso en la URL');
        return;
    }

    const confirmarEliminacion = confirm('¿Estás seguro de que deseas eliminar este curso?');
    if (confirmarEliminacion) {
        try {
            await eliminarCurso(cursoId);
            alert('Curso eliminado correctamente');
            window.location.href = 'index.html'; // Redirige a la página principal u otra página después de eliminar
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
            alert('Hubo un error al eliminar el curso');
        }
    } else {
        console.log('Cancelado');
        // Puedes redirigir a otra página o simplemente no hacer nada
    }
});

async function eliminarCurso(cursoId) {
    const endpoint = `http://localhost:3000/cursos/${cursoId}`;

    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el curso');
        }
    } catch (error) {
        throw error;
    }
}
