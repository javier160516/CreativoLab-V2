export default function ValidadarPassword(password) {
    if (!password) return "La contraseña no debe ir vacia"
    if (password.length < 5) return 'La contraseña debe ser mayor a 5 carácteres'
    return ''
}
