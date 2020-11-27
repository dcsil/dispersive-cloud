export class DataProvider{
    static data=[];
    static getdata(){
        return this.data
    }

    static setdata(data){
       this.data=data.data.body
    }
}