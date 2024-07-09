let cursoID;
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    cursoID = params.get('curso_id');
});

async function subir_imagen(curso_id) {
    let user_endpoint = 'http://localhost:3000/cursos';
    var formData = new FormData();

    let archivo = document.getElementById("imgCurso").files[0];
    formData.append("imagen", archivo);

    try {
        console.log("esperando");
        var response = await fetch(user_endpoint + "/" + curso_id + "/imagen", {

            method: 'POST',
            body: formData

        });
        console.log("done");

        if (!response.ok) {
            console.log('Error al subir la imagen');
        }

        let result = await response.json();
        return result.ruta;
    } catch (error) {
        console.log('Error:', error);

    }
    console.log("Termino");
};

async function editarCurso(event) {

    event.preventDefault();
    const nombre = document.getElementById('nombreCurso').value;
    const descripcion = document.getElementById('descripcionCurso').value;
    const categoria = document.getElementById('catCurso').value;


    let path = await subir_imagen(cursoID);
    console.log(path);
    var formData = {
        cursos_id: cursoID,
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        img_name: path
    };

    console.log(formData);


    try {

        const response = await fetch(`http://localhost:3000/cursos/${cursoID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el curso');
            return false;
        }

        alert('Curso actualizado exitosamente');
        
        window.location.href = `perfilAdm.html`;
        return true;
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al actualizar el curso. Por favor, intenta de nuevo.');
        return false;
    }
}
