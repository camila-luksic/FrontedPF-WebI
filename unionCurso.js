
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
    
        } );
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

async function agregarCurso(event) {
    event.preventDefault();
    console.log("-");
    let user_endpoint = 'http://localhost:3000/cursos';
    const id_field = document.getElementById('idCurso');
    const name_field = document.getElementById('nombreCurso');
    const img_field = document.getElementById('imgCurso');
    const d_field = document.getElementById('descripcionCurso');
    const cat_field = document.getElementById('categoria');
    /*
        const formData = new FormData();
        formData.append('cursos_id', id_field.value);
        formData.append('nombre', name_field.value);
        formData.append('categoria', cat_field.value);
        //formData.append('image', img_field.files[0]); // Append the file object
        formData.append('descripcion', d_field.value);
       */
    let path = await subir_imagen(id_field.value);
    console.log(path);
    var formData = {
        cursos_id: id_field.value,
        nombre: name_field.value,
        categoria: cat_field.value,
        descripcion: d_field.value,
        img_name: path
    };

    console.log(formData);


    try {
        var response = await fetch(user_endpoint + "/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)

        })
        if (!response.ok) {
            throw new Error('Error en la creación del curso');
            return false;
        }

        // Redirigir a la página de creación de lección con el ID del curso en la URL
        window.location.href = `crearLeccion.html?course_id=${id_field.value}`;
        console.log('Curso creado:', result);

        return true;
    } catch (error) {
        console.log('Error:', error);
        return false;
    };
};
