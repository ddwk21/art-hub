// fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
//     .then((response) => response.json())
//     .then((data) => console.log(data))
let workingObjects = [];
let harvardWorking;
let imageEl = document.getElementById("image");
const harvardKey = "41920f1f-a0a4-40cf-b3fb-3ce184ea6dc1";
const harvardArt = "https://api.harvardartmuseums.org/object";

const harvardPages = 24170;
//there are this many pages at 100 size for harvard fetch

// function saveData(x){
//     harvardWorking = x;
// }

function harvardFetch() {
  //Get a random number between 0 and the number of pages of 100 entries
  let randomPage = Math.floor(Math.random() * harvardPages);

  //fetch using API key and the previously generated random page
  fetch(
    "https://api.harvardartmuseums.org/object?&size=10&&apikey=" +
      harvardKey +
      "&page=" +
      randomPage +
      ""
  )
    .then((response) => response.json())
    .then(
      (data) =>
        (harvardWorking = data.records.filter(function (record) {
          return !!record.primaryimageurl;
        }))
    )
    //Filter function only allows in records that have an image included with their data, then adds them to the array harvardworking

    //call renderHarvard function
    .then(() => renderHarvard());
}

//random number between 0 and 400k
function metFetch() {
  // let dataPoolStart = Math.floor(Math.random()*400001)
  // let dataPoolEnd = dataPoolStart + 50;

  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
      randomId
  )
    .then((response) => response.json())
    .then((data) => (metWorking = data))
    .then(() => renderMet());

  console.log("placeholder");
}

function renderMet() {
  console.log(metWorking);
  if (!metWorking.primaryImage) {
    metFetch();
    return;
  } else {
    console.log("Image found");
  }
  console.log(workingObjects);
}

harvardFetch();
// add counter
// const otherImage = imageEl.appendChild('img')
function renderHarvard() {
  if (harvardWorking.length <= 1) {
    harvardFetch();
    return;
} else {
    //randomly select an item from harvardworking array
    let art = harvardWorking[Math.floor(Math.random() * harvardWorking.length)];
    if (art.classificationid === 17) {
        console.log("photo")
        harvardFetch();
      return;
    }
    imageEl.src = art.primaryimageurl;
    if (!! art.images) {
      //logic here
      for (let i = art.images.length - 1; i > 0; i--) {
        //'<img src ='+art.images[i].whateverurlvariablename+'/>'
        console.log(art.images[i].baseimageurl);
        $(".art-image").append("img").attr("src", art.images[i].baseimageurl);
        // load first image last
        //for each image
        //append image element child to container/frame div
        //set image.src to images[i].baseurl
      }
    }
    //CHECK CLASSIFICATION HERE. IF PHOTO, CALL HARVARD FETCH AGAIN, RETURN FUNCTION

    $("#info").append(`<p>Title: ${art.title}</p>`);
    $("#info").append(`<p>Name: ${art.people[0].name}</p>`);
    $("#info").append(`<p>Role: ${art.people[0].role}</p>`);
    $("#info").append(`<p>Dated: ${art.dated}</p>`);
    $("#info").append(`<p>Culture: ${art.culture}</p>`);
    $("#info").append(`<p>Medium: ${art.medium}</p>`);
    // using the console.log to filter through images that fit the criteria.
    // if (!! art.people[0].name){
        console.log(
            art.people[0].name,
            art.people[0].role,
            art.dated,
            art.culture,
      art.medium
    );
    console.log(art.images); // Display amount of images attached to file.
    console.log(art);
    
  // } else {
}
  // }
  
  // exclude classification:17

  console.log(harvardWorking);
  
  //trying to set the image from index html to the image of the record from the array
  
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // PUT THIS IN AN ELSE FUNCTION, SO IF THERE ARE NO ADDITIONAL IMAGES JUST USE PRIMARY
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  
}
// function fetchMaster()
// {
//     let toggle = Math.floor(Math.random())

//     if(toggle) metFetch();

//     else harvardFetch();

// }

function handleScroll() {
  let pageEnd = document.body.offsetHeight;
  let breakpoint = window.innerHeight + window.pageYOffset;
  console.log(breakpoint);

  if (breakpoint >= pageEnd) {
    console.log("loadnew");
    //rendering logic here
  }
}

window.addEventListener("scroll", handleScroll);
//Write scrolling event listener

//on scroll check page position in relation to last child of body

//if close enough to last child of body, run some rendering logic

//use placeholder div generation to make sure it works
