import request from "@/utils/request";

// 借阅机借书
export const borrowFromMachineApi = async (param) =>{
    return await request.post('/api/borrow/borrowFromMachine',param)
}

// 借阅机还书接口
export const borrowFromMachineApi = async (param) =>{
    return await request.post('/api/borrow/returnFromMachine',param)
}
