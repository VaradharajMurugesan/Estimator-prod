import http from "../api";

const getEtlEstimates = async () => {
    const response = await http.get(`Etl_Est_Getall`);
    return response.data;
}

const getEtlEstimateById = async (id) => {
    const response = await http.get(`Etl_EstGetByID/` + id)
    return response.data;
}

const addEtlEstimate = async (formData) => {
    const response = await http.put(`Etl_Estimator_Updt_Delete`, [formData])
    return response.data;
}

const etlEstimateService = {
    getEtlEstimates,
    getEtlEstimateById,
    addEtlEstimate
}

export default etlEstimateService;