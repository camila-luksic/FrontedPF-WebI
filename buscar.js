
async function buscarCursos() {
    const buscado = document.getElementById("buscar").value;
    const buscador = {
        "titulo": buscado
    };

    try {
        const response = await fetch('http://localhost:3000/cursos/name', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buscador)
        });

        if (!response.ok) {
            throw new Error('No se pudieron obtener los cursos');
        }

        const listOfCursos = await response.json();
        mostrarResultados(listOfCursos);
    } catch (error) {
        console.error(error);
    }
}

function mostrarResultados(cursos) {
    window.location.href = 'busqueda.html';

    sessionStorage.setItem('cursosEncontrados', JSON.stringify(cursos));
}
