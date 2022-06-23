export default function ValidarEmail(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "El email no puede ser vacio"
    if (!re.test(email)) return 'No es un email valido'
    return ''
}