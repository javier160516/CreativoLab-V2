export default function ValidarCampoTexto(valor) {
    const re = /^[a-zA-Z]+$/
    if (!valor) return "Este campo es obligatorio"
    if (!re.test(valor)) return "Este campo solo acepta letras y espacios"
    return '';
};