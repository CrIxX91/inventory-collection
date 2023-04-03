import axios from "axios";

export const uploadFThumb = async (file:File) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dorwecame/image/upload';
    const formData = new FormData();
    formData.append('upload_preset','collection');
    formData.append('file',file)

    try {
        const resp = await axios.post(cloudUrl,formData);

        if(!resp)
            throw new Error('No se pudo subir imagen');

        const cloudResp = await resp.data;
        console.log({cloudResp})

        return cloudResp.secure_url

    } catch (error:any) {
        console.log(error);
        throw new Error(error.message);
    }
}