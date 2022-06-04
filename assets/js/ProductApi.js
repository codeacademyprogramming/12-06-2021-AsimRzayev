import { HttpRequest } from './HttpClient/index.js';

class ProductApi extends HttpRequest {
    constructor(){
        super("https://isko88.github.io/apipizza.json");
    }

    getProductInfo(){
        return this.get();
    }
}

export const productApi = new ProductApi();
