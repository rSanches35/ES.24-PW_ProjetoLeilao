import axios from "axios";

class BaseService {

    constructor(endPoint) {

        this.endPoint = endPoint;
        this.api = axios.create({
            baseURL: "http://localhost:8080/api",
        });
    }

    async insert(data) {
        const response = await this.api.post(this.endPoint, data);
        return  response.data;
    }

    async update(data){
        const response = await this.api.put(this.endPoint, data);
        return  response.data;
    }

    async delete(id){
        const response = await this.api.delete(`${this.endPoint}/${id}`);
    }

    async list(){
        const response = await this.api.get(this.endPoint);
        return response.data;
    }

}

export default BaseService;