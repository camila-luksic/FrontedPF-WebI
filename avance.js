document.addEventListener('DOMContentLoaded', async function () {
    const endpoint = 'http://localhost:3000/misCursos';
    const avanceEndpoint = 'http://localhost:3000/cursos/avance';
    const token = localStorage.getItem('authToken');

    if (!token) {
        document.getElementById('cursos').textContent = 'No estás autenticado.';
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();

        const cursosDiv = document.getElementById('cursos');
        if (data && data.cursos) {
            data.cursos.forEach(curso => {
                const cursoElement = document.createElement('div');
                cursoElement.textContent = `Curso: ${curso.nombre}`;

                curso.lecciones.forEach(leccion => {
                    const leccionElement = document.createElement('div');
                    leccionElement.textContent = `Lección: ${leccion.nombre}`;
                    leccionElement.addEventListener('click', async () => {
                        try {
                            const avanceResponse = await fetch(avanceEndpoint, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ cursoId: curso.id, leccionId: leccion.id })
                            });

                            if (!avanceResponse.ok) {
                                throw new Error('Error al actualizar el avance');
                            }

                            const avanceData = await avanceResponse.json();
                            console.log(avanceData.message);
                        } catch (error) {
                            console.error('Error al actualizar el avance:', error);
                        }
                    });
                    cursoElement.appendChild(leccionElement);
                });

                cursosDiv.appendChild(cursoElement);
            });
        } else {
            cursosDiv.textContent = 'No estás matriculado en ningún curso.';
        }
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        const cursosDiv = document.getElementById('cursos');
        cursosDiv.textContent = 'Hubo un error al obtener los cursos.';
    }
});