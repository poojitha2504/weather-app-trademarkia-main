var arr=[];
var name="user";
try
{
    // window.localStorage.getItem('count');
    var x=JSON.parse(window.localStorage.getItem('count'));
    var z= JSON.parse(window.localStorage.getItem('name'));
    console.log(name);
    if(z!=null)
    {
        name=z;
    }
    console.log(x);
    if(x.length)
    {
        arr=x;
    }
}catch(e){
    console.log(e);
}
export const initialState ={
   city_name:"",
   deg_status: true,
};

const reducer = (state, action) => {

    // console.log(state.basket);
    switch (action.type) {
        case 'CITY_SET':
            return {
                ...state,
                city_name: action.city,
            }
        case 'DEGREE_SET':
            console.log(action.deg)
            return{
                ...state,
                deg_status: action.deg,
            }
        case 'HISTORY_SET':
            console.log(action.city);
            var a = JSON.parse(window.localStorage.getItem('history'));
            if(a==undefined||a==null)
            {
                a=[];
                a.push(action.city);
                console.log(a);
                window.localStorage.setItem('history',JSON.stringify(a));
            }
            else{
                a.unshift(action.city);
                a=a.filter((item, 
                    index) => a.indexOf(item) === index);
                window.localStorage.setItem('history',JSON.stringify(a));
            }
            return{
                ...state,
            }
        default: return state;
    }

}
export default reducer;
