// fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
//     .then((response) => response.json())
//     .then((data) => console.log(data))
let metWorking;
let harvardWorking;
let imageEl;
const harvardKey = "41920f1f-a0a4-40cf-b3fb-3ce184ea6dc1";
const harvardArt = "https://api.harvardartmuseums.org/object";
let elementCount = 0;
let scrollLoaded;
var liked = $('#likeBtn'+elementCount+'')

const harvardPages = 24170;
//there are this many pages at 10 size for harvard fetch

// function saveData(x){
//     harvardWorking = x;
// }

function harvardFetch() {
  //Get a random number between 0 and the number of pages of 100 entries
  let randomPage = Math.floor(Math.random() * harvardPages);
  // scrollLoaded = false;
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

    .then(() => renderHarvard())
    // .finally(() => (scrollLoaded = true));
}

//random number between 0 and 400k
function metFetch() {
  // scrollLoaded = false;
  // let dataPoolStart = Math.floor(Math.random()*400001)
  // let dataPoolEnd = dataPoolStart + 50;

  let randomId = Math.floor(Math.random() * 400000);

  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
      randomId
  )
    .then((response) => response.json())
    .then((data) => (metWorking = data))
    .then(() => renderMet())
    // .finally(() => (scrollLoaded = true));

  console.log("placeholder");
}

function renderMet() {
  console.log(metWorking);
  if (!metWorking.primaryImage) {
    metFetch();
    return;
  } else {
    let thisElement = addContent();
    console.log("Image found");
    let metArt = metWorking;
    thisElement.src = metArt.primaryImage;

    if (metArt.title)
      $("#info" + elementCount).append(`<p>` + metArt.title + "</p>");
    console.log($(body));

    if (metArt.artistDisplayName)
      $("#info" + elementCount).append(
        `<p>` + metArt.artistDisplayName + "</p>"
      );

    if (metArt.objectBeginDate)
      $("#info" + elementCount).append(
        `<p>` + metArt.objectBeginDate + "</p>"
      );

    if (metArt.culture)
      $("#info" + elementCount).append(`<p>` + metArt.culture + "</p>");
  }
  console.log(workingObjects);
}

metFetch();
harvardFetch();
harvardFetch();
// add counter
// const otherImage = imageEl.appendChild('img')
function renderHarvard() {
  let art = harvardWorking[Math.floor(Math.random() * harvardWorking.length)];

  if (harvardWorking.length <= 1 || art.classificationid == 17) {
    harvardFetch();
    return;
  } else {
    //randomly select an item from harvardworking array

    console.log("art", art);
    // if (art.classificationid === 17 || !art.title || !art.people || !art.dated || !art.culture) {
    //     console.log("start over")
    //     console.log(art.people)
    //     harvardFetch();
    //   return;
    // }

    if (elementCount >= 1) {
      let thisElement = addContent()
      thisElement.src = art.primaryimageurl;
    }

    

    // if (!! art.images) {
    //   //logic here
    //   for (let i = art.images.length - 1; i > 0; i--) {
    //     //'<img src ='+art.images[i].whateverurlvariablename+'/>'
    //     console.log(art.images[i].baseimageurl);
    //     $(".art-image").append("img").attr("src", art.images[i].baseimageurl);
    //     // load first image last
    //     //for each image
    //     //append image element child to container/frame div
    //     //set image.src to images[i].baseurl
    //   }
    // }
    //CHECK CLASSIFICATION HERE. IF PHOTO, CALL HARVARD FETCH AGAIN, RETURN FUNCTION
    if (art.title)
      $("#info" + elementCount).append(`<p>` + art.title + "</p>");
    console.log($(body));

    if (art.people.name)
      $("#info" + elementCount).append(
        `<p>` + art.people[0].name + "</p>"
      );

    if (art.dated)
      $("#info" + elementCount).append(`<p>` + art.dated + "</p>");

    if (art.culture)
      $("#info" + elementCount).append(`<p>` + art.culture + "</p>");
    // $("#info").append(`<p>Medium: ${art.medium}</p>`);
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

function addContent() {
  elementCount++;
  let thisElementCount = elementCount;

  //generate new frame div
  $("#body").append(
    '<div class="art-container" id = "art-container' + elementCount + '"></div>'
  );

  //generate new img element
  $("#art-container" + elementCount).append(
    '<img class="mx-auto art-image my-11" id = "image' +
      elementCount +
      '" alt="Art Image"/>'
  );
  
  // $('#body').append(
  //   '<div class="right"></div>'
  // );

  $("#art-container" + elementCount).append(
    '<div class="overlay"><div class="art-info max-w-1/2" id="info' +
      elementCount +
      '"></div></div>'
  );

    let thisElement = document.getElementById('image'+thisElementCount);
    return thisElement;
  //append new art-info element to same element as above, give art info a unique ID using the same method as above "art-info"+element count
  //make sure where you are adding info to the element, you also use this unique id. Same methodology

    $('#art-container'+elementCount).append(
      '<div id= "like'+elementCount+'"><button class="btn" id = "likeBtn'+elementCount+'">♥</button></div>');
     

  //if api = harvard logicblah

  //

  //append new art-info element to same element as above, give art info a unique ID using the same method as above "art-info"+element count
  //make sure where you are adding info to the element, you also use this unique id. Same methodology

  //assign element to variable, pass element to rendering/fetching functions
}
function fetchMaster() {
  let toggle = Math.random();

  if (toggle < 0.5) metFetch();
  else harvardFetch();

  if (toggle) metFetch();
  else harvardFetch();
}

function handleScroll() {
  let pageEnd = document.body.offsetHeight - 50;
  let breakpoint = window.innerHeight + window.pageYOffset;
  console.log(pageEnd)
  console.log(breakpoint);

  if (breakpoint >= pageEnd) {
    console.log("loadnew");
    fetchMaster();
    //rendering logic here
  }
}

// set to localStorage
$('.favBtn').click(function () {
  var likeBtn = $("#likeBtn").val();
  window.localStorage.setItem('artEl','baseimageurl' );
});
// // call from local storage
$("#likeBtn").val(localStorage.getItem(""));

window.addEventListener("scroll", handleScroll);
//Write scrolling event listener

//on scroll check page position in relation to last child of body

//if close enough to last child of body, run some rendering logic

window.onscroll = function () {
  stickNav();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
