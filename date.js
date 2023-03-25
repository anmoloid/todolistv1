//this is the file of our own module
// we can access the output of this model to be used in other files like app.js using modules.export
//module.exports is an js object so it can have its own attributes and its functions and therefore we can use multiple functions

module.exports.getDate=getDate;
function getDate()
{
    let today=new Date();
    
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    
    let Day=today.toLocaleDateString("en-US",options)
    return Day;
}

//here we have created 2 functions called getDate and getDay that do different things and we can call each function separately
module.exports.getDay=getDate;

function getDay()
{
    let today=new Date();
    
    let options={
        weekday:"long",
    }
    
    let Day=today.toLocaleDateString("en-US",options)
    return Day;
}