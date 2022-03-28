import request from "@/utils/request";

export const RfidApi = async (param) =>{
    return await request.post('/uhfapi/rfid',param)
}
