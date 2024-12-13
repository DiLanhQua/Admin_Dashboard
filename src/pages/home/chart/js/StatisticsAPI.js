import axiosS from "./Statistics";
const END_POINT = {
    GetAllStatistics : "get-all-statistics",
    AddStatistics : "add-statistics",
}
export const getStatisticsAPI = () => {
    return axiosS.get(`${END_POINT.GetAllStatistics}`)
}
export const AddStatisticsAPI = (viewType) => {
    return axiosS.get(`${END_POINT.AddStatistics}?viewType=${viewType}`)
}