export default function ValidadarPassword(password) {
    if (!password) return "La contraseña no debe ir vacia"
    if (password.length < 7) return 'La contraseña debe ser minimo 8 carácteres'
    return ''
}
