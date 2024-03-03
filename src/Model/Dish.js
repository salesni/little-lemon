export default class Dish {
    src = '';
    alt = '';
    id = '';
    name = '';
    price = 0;
    description = '';

    constructor(src,id,name,price,description){
        this.src = src;
        this.id =  id;
        this.name = name;
        this.alt = name;
        this.price = price;
        this.description = description;
    }

    getPrice (){
        return this.price.toFixed(2);
    }

    
}