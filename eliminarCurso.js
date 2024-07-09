
document.getElementById('eliminar-curso-btn').addEventListener('click', async () => {
    if (!confirm('¿Estás seguro que deseas eliminar este curso? Esta acción no se puede deshacer.')) {
        return;
    }

    try {
        const params = new URLSearchParams(window.location.search);
        const cursoId = params.get('curso_id');

        const response = await fetch(`http://localhost:3000/cursos/${cursoId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el curso');
        }

        alert('Curso eliminado exitosamente');
        // Redirigir a la página principal u otra página adecuada después de eliminar
       // window.location.href = 'index.html'; // Por ejemplo, redirige a la página principal
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al eliminar el curso. Por favor, intenta de nuevo.');
    }
});
