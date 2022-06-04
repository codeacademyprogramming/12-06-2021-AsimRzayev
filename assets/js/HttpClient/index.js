export class HttpRequest
{
baseURL;
constructor(url)
{
    this.baseURL=url;
}
 async get(baseURL=this.baseURL)
 {
     let response= await fetch(baseURL);
     let data=response.json();
     return data;
 }
}