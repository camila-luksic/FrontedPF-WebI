 document.addEventListener('DOMContentLoaded', function() {
            mostrarCursos();
        });

        async function mostrarCursos() {
            const cursosEncontrados = JSON.parse(sessionStorage.getItem('cursosEncontrados'));

            if (!cursosEncontrados || cursosEncontrados.length === 0) {
                const resultadosContainer = document.getElementById('resultados');
                resultadosContainer.textContent = 'No se encontraron cursos.';
                return;
            }

            const resultadosContainer = document.getElementById('resultados');

            cursosEncontrados.forEach(curso => {
                const cursoItem = document.createElement('div');
                cursoItem.classList.add('curso-item');

                const cursoTitle = document.createElement('a');
                cursoTitle.href = `curso.html?curso_id=${curso.cursos_id}`;
                cursoTitle.classList.add('curso-title');
                cursoTitle.textContent = curso.nombrecurso;

                const cursoImagen = document.createElement('img');
                cursoImagen.src = curso.img_name;
                cursoImagen.alt = curso.nombre;
                cursoImagen.classList.add('curso-imagen');

                cursoItem.appendChild(cursoTitle);
                cursoItem.appendChild(cursoImagen);

                resultadosContainer.appendChild(cursoItem);
            });
        }