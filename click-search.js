console.log("click");
var isSubmit = false;

function checkClick(){
    if(isSubmit) {
        alert("処理中");
        return false;
    }else{
        siSubmit = true;
        return true;
    }
}
