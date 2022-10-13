// fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
//     .then((response) => response.json())
//     .then((data) => console.log(data)) 
let workingObjects = [];
let harvardWorking;
let imageEl = document.getElementById("image");
const harvardKey = "41920f1f-a0a4-40cf-b3fb-3ce184ea6dc1";
const harvardArt = "https://api.harvardartmuseums.org/object"

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

    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+randomId )
        .then((response) => response.json())
        .then((data) => metWorking = data) 
        .then(() => renderMet())


    
    console.log('placeholder');
    
}

function renderMet()
{
    console.log(metWorking)
    if(!metWorking.primaryImage)
    {
        metFetch()
        return
    }

    else
    {
        console.log('Image found')
    }
    console.log(workingObjects)
}

harvardFetch()

// const otherImage = imageEl.appendChild('img')
function renderHarvard()
{
    //randomly select an item from harvardworking array
    let art = harvardWorking[Math.floor(Math.random()*harvardWorking.length)]
    $("#info").append(`<p>Title: ${art.title}</p>`)
    $("#info").append(`<p>Name: ${art.people[0].name}</p>`)
    $("#info").append(`<p>Role: ${art.people[0].role}</p>`)
    $("#info").append(`<p>Dated: ${art.dated}</p>`)
    $("#info").append(`<p>Culture: ${art.culture}</p>`)
    $("#info").append(`<p>Medium: ${art.medium}</p>`)
// using the console.log to filter through images that fit the criteria.
    if (!! art.people[0].name){
    console.log(art.people[0].name, art.people[0].role, art.dated, art.culture, art.medium)
    console.log(art.images)// Display amount of images attached to file. 
    console.log(art)
    } else {

    }   

    console.log(harvardWorking)
    
    //trying to set the image from index html to the image of the record from the array
    imageEl.src = art.primaryimageurl;
}
// function fetchMaster()
// {
//     let toggle = Math.floor(Math.random())

//     if(toggle) metFetch();

//     else harvardFetch();

// }


