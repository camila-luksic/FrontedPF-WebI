
 function  redirectToProfile() {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get('type'));
    const tipoCuenta = params.get('type');
    console.log(tipoCuenta);

    if (tipoCuenta === 'Administrador') {
        
        window.location.href = 'perfilAdm.html?type=Administrador';
    }
    else if (tipoCuenta === 'Usuario') {
        window.location.href = "PerfilUser.html?type=Administrador";
    } else {
        console.error('Tipo de cuenta no válido');
    }
};