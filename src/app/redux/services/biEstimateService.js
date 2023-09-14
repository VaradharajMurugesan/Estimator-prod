import http from "../api";

const getbiEstimates = async () => {
    const response = await http.get(`Bi_Est_Getall`);
    console.log(response)
    return response.data;
}

const getbiEstimateById = async (id) => {
    const response = await http.get(`Bi_EstGetByID/` + id)
    return response.data;
}

const addbiEstimate = async (formData) => {

    const response = await http.put(`Bi_Estimator_Updt_Delete`, [formData])
    return response.data;
}

const biEstimateService = {
    getbiEstimates,
    getbiEstimateById,
    addbiEstimate
}

export default biEstimateService;