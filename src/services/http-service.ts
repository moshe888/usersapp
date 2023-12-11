import apiClient from "./api-client";

interface Entity {
    id: number;
}

class HttpService {

    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }
// 1. getAll
    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal
        });
        return {request, cancel: () => controller.abort() }
    }
// 2. getOne
    delete(id: number) {
        return apiClient.delete(`${this.endpoint}/${id}`);
    }
// 3. delete
    create<T>(entity: T) {
        return apiClient.post(this.endpoint, entity);
    }
// 4. create
    update<T extends Entity>(entity: T) {
        return apiClient.patch(`${this.endpoint}/${entity.id}`, entity);
    }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
//