import request from "@/utils/request";

export const rfidApi = async (param) => {
    return await request.post('/uhfapi/rfid', param)
}
