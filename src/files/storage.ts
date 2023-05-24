import { diskStorage } from "multer"

const generateId = () => {
    return Array(18).fill(null)
    .map(() => Math.round(Math.random() * 10).toString(16))
    .join('')
}

const normalizeFileName = (req, file, callback) => {
    console.log(file, callback)
    const fileExtName = file.originalname.split('.').pop();

    callback(null, `${[generateId()]}.${fileExtName}`)
}


export const fileStorage = diskStorage({
    destination: './uploads',
    filename: normalizeFileName,

})