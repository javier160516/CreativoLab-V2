const ValidarPickers = (seleccion) => {
    console.log(seleccion.value);
    if(seleccion.value == '0') return 'Este campo es obligatorio';
    return '';
}

export default ValidarPickers;