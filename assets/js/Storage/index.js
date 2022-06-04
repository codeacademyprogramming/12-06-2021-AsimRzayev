
class Storage {
    setItem(key,value){
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key){
        return JSON.parse(window.localStorage.getItem(key));
    }
    getItemById(key,id){
        let data=JSON.parse(window.localStorage.getItem(key));
        data=data.filter(x=>x.id==id);
        return data;
    }
    removeItem(){
        window.localStorage.removeItem(key);
    }
};

export const storage = new Storage();