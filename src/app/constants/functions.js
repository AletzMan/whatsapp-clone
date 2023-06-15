export function GetUnicode(emoji) {
    const codigoHex = Array.from(emoji)
        .map((char) => char.codePointAt(0).toString(16))
        .join(" ")
    const codigoUnicode = `${codigoHex.toLocaleLowerCase().replaceAll(" ", "-")}`
    return codigoUnicode
}

