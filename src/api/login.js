import request from "../utils/request";

export const faceLoginApi = async (param) => {
    return await request.post('/api/system/faceLogin', param)
}
