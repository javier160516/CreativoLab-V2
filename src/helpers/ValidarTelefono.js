const ValidarTelefono = (telefono) => {
    var regex = new RegExp("^[0-9]+$");
    if(!telefono) return 'Este campo es obligatorio';
    if(!regex.test(telefono)) return 'Solo se aceptan numeros';
    return '';
}

export default ValidarTelefono;