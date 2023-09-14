import http from "../api";

const getAllCategories = async (data) => {
    const response = await http.get(`GetAllCategories`);
    return response.data;
}

const getAllTasks = async (id) => {
    const response = await http.get(`GetAllTaskListName/` + id)
    return response.data;
}
const getWfValuesByCategory = async (id) => {
    const response = await http.get(`Get_Bi_Wf_Values/` + id)
    return response.data;
}

const commonService = {
    getAllCategories,
    getAllTasks,
    getWfValuesByCategory
}

export default commonService;