
async function agregarLeccion(){
let user_endpoint='http://localhost:3000/lecciones';
const id_field=document.getElementById('idLeccion');
const name_field=document.getElementById('nombreLeccion');
const link_field=document.getElementById('cursoLink');

const urlParams = new URLSearchParams(window.location.search);
const cursoId_field = urlParams.get('course_id');

var formData = {
            leccion:{
                curso_id:cursoId_field,
                leccion_id:id_field.value,
                nombre: name_field.value,
                link:link_field.value
            }
          
};


try{
var response = await fetch(user_endpoint + "/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            
        }) 
        if (!response.ok) {
            throw new Error('Error en la creación del curso');
        }

        // Redirigir a la página de creación de lección con el ID del curso en la URL
        window.location.href = `crearLeccion.html?course_id=${cursoId_field}`;
        console.log('Curso creado:', result);
    } catch (error) {
        console.error('Error:', error);
    };
};

async function agregarLeccionFinal(){
    let user_endpoint='http://localhost:3000/lecciones';
    const id_field=document.getElementById('idLeccion');
    const name_field=document.getElementById('nombreLeccion');
    const link_field=document.getElementById('cursoLink');
    
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId_field = urlParams.get('course_id');
    
    var formData = {
                leccion:{
                    curso_id:cursoId_field,
                    leccion_id:id_field.value,
                    nombre: name_field.value,
                    link:link_field.value
                }
              
    };
    
    
    try{
    var response = await fetch(user_endpoint + "/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
                
            }) 
            if (!response.ok) {
                throw new Error('Error en la creación del curso');
            }
    
            // Redirigir a la página de creación de lección con el ID del curso en la URL
            window.location.href = `perfilAdm.html`;
            console.log('Curso creado:', result);
        } catch (error) {
            console.error('Error:', error);
        };
    };
    