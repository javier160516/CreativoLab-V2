export default function ValidarCampoOpcional(texto) {
    // const regex = /[A-Za-z ]/;
    const regex = new RegExp("^[a-zA-Z ]+$");
    if(!texto) return '';
    if(!regex.test(texto)) return 'Este campo solo acepta letras y espacios';
    return '';
};