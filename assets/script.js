// fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
//     .then((response) => response.json())
//     .then((data) => console.log(data)) 
let metWorking = [];
let harvardWorking;
let imageEl = document.getElementById("image");
const harvardKey = "41920f1f-a0a4-40cf-b3fb-3ce184ea6dc1";
const harvardArt = "https://api.harvardartmuseums.org/object";

const harvardPages = 2417;
//there are this many pages at 100 size for harvard fetch

// function saveData(x){
//     harvardWorking = x;
// }


function harvardFetch()
{
    //Get a random number between 0 and the number of pages of 100 entries
    let randomPage = Math.floor(Math.random()*harvardPages)

    //fetch using API key and the previously generated random page
    fetch('https://api.harvardartmuseums.org/object?&size=100&apikey='+harvardKey+'&page='+randomPage+'')
        .then((response) => response.json())
        .then((data) => harvardWorking = data.records.filter(function(record){return !!record.primaryimageurl}))
        //Filter function only allows in records that have an image included with their data, then adds them to the array harvardworking

        //call renderHarvard function
        .then(() => renderHarvard())
}




//random number between 0 and 400k
function metFetch()
{
    // let dataPoolStart = Math.floor(Math.random()*400001)
    // let dataPoolEnd = dataPoolStart + 50;

    for(let i = 0; i<1; i++)
    {    
        let dataPoolStart = Math.floor(Math.random()*400001)
        fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=art&hasImages=true' )
            .then((response) => response.json())
            .then((data) => metWorking.push(data)) 
            .then(() => console.log(metWorking))
    }
    console.log('placeholder');
    
}
//Will ask josh how to get around CORS issue.
//Want to return object with image IDs, then store in local storage
//Want to randomly select an object id from stored IDs and then fetch it and display image.

harvardFetch()
metFetch()

// const otherImage = imageEl.appendChild('img')
function renderHarvard()
{
    if(harvardWorking.length < 1){
        harvardFetch();
        return;
    }
    //randomly select an item from harvardworking array
    else  
    {
        let art = harvardWorking[Math.floor(Math.random()*harvardWorking.length)]


        console.log(art)

        console.log(harvardWorking)
        
        //trying to set the image from index html to the image of the record from the array
        imageEl.src = art.primaryimageurl;
    }
}
// function fetchMaster()
// {
//     let toggle = Math.floor(Math.random())

//     if(toggle) metFetch();

//     else harvardFetch();

// }

//arraychooser

