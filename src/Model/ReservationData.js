
export default class ReservationData{
    name ='';
    email='';
    phone='';
    guests = 0;
    date = '';
    time = '';
    occasion = '';

    constructor(name='',email='',phone='',guests=1,date='',time='',occasion=''){
        this.name  = name;
        this.email = email;
        this.phone = phone;
        this.guests= guests;
        this.date  = date;
        this.time = time;
        this.occasion = occasion;
    }


} 
