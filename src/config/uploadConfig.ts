import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

//configurações de armazenamento em disco
const storage = multer.diskStorage({
    //pasta local que armazenará os arquivos
    destination: resolve("filedata"),

    //definindo nome do arquivo
    filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
    }
})

export default storage;