
// Elimina dobles espacios entre caracteres y espacio al principio y final del string
const cleaner = (data) => {
    return data.replace(/\s{2,}/g, ' ').trim();
}

// Solo para los links. Elimina todos los espacios
const removeAllWhiteSpaces = data => {
    return data.replace(/\s/g,'')
}

const checkLink = data => {
    let isLink = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    return isLink.test(data);
}




module.exports = { cleaner, removeAllWhiteSpaces, checkLink }