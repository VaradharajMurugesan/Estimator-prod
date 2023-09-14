import http from "../api";

const getqaEstimates = async (data) => {
    const response = await http.get(`Qa_Est_Getall`);
    return response.data;
}

const getqaEstimateById = async (id) => {
    const response = await http.get(`Qa_EstGetByID/` + id)
    return response.data;
}

const addqaEstimate = async (formData) => {
    const response = await http.put(`Qa_Estimator_Updt_Delete`, [formData])
    return response.data;
}

const qaEstimateService = {
    getqaEstimates,
    getqaEstimateById,
    addqaEstimate
}

export default qaEstimateService;