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

  //random ID to pull from met data
  let randomId = Math.floor(Math.random() * 400000);

  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
      randomId
  )
    .then((response) => response.json())
    .then((data) => (metWorking = data))
    .then(() => renderMet())

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

    if (elementCount >= 1) {
      let thisElement = addContent()
      thisElement.src = art.primaryimageurl;
    }

    
    if (art.title)
      $("#info" + elementCount).append(`<p>` + art.title + "</p>");

    if (art.people[0].name)
      $("#info" + elementCount).append(
        `<p>` + art.people[0].name + "</p>"
      );

    if (art.dated)
      $("#info" + elementCount).append(`<p>` + art.dated + "</p>");

    if (art.culture)
      $("#info" + elementCount).append(`<p>` + art.culture + "</p>");

  }

}

function addContent() {
  elementCount++;
  let thisElementCount = elementCount;

  //generate new frame div
  $("#body").append(
    '<div class="art-container" id = "art-container' + thisElementCount + '"></div>'
    );
    
    //generate new img element
    $("#art-container" + thisElementCount).append(
      '<img class="mx-auto art-image my-11" id = "image' +
      thisElementCount +
      '" alt="Art Image"/>'
      );

      
     

      
          $('#art-container'+thisElementCount).append(
            '<div class="like-container" id= "like'+thisElementCount+'"><button class="btn" id = "'+thisElementCount+'">♥</button></div>')

      //add like button

            
            // set to localStorage
            $('#'+thisElementCount).click(function (event) {
            let imageEl = document.getElementById('image'+event.target.id) 
          if (!window.localStorage.getItem('image'+event.target.id)){
            window.localStorage.setItem('image'+event.target.id,imageEl.src )
            $(event.target).css('background-color', '#ff6347');
            console.log(localStorage)
           }
          else if (!! window.localStorage.getItem('image'+event.target.id)){
            window.localStorage.removeItem('image'+event.target.id)
            $(event.target).css('background-color', 'transparent');
            console.log(localStorage)
           }
            }
            );
        
        
  $("#art-container" + thisElementCount).append(
    '<div class="overlay"><div class="art-info max-w-1/2" id="info' +
      thisElementCount +
      '"></div></div>'
      );

    let thisElement = document.getElementById('image'+thisElementCount)
    return thisElement


}
//Decide which API to pull from
function fetchMaster() {
  let toggle = Math.random();

  if (toggle < 0.5) metFetch();
  else harvardFetch();

  if (toggle) metFetch();
  else harvardFetch();
}

//on scroll check page position in relation to last child of body

//if close enough to last child of body, run some rendering logic

function handleScroll() {
  let pageEnd = document.body.offsetHeight - 50;
  let breakpoint = window.innerHeight + window.pageYOffset;

  if (breakpoint >= pageEnd) {
    console.log("loadnew");
    fetchMaster();
    //rendering logic here
  }
}

window.addEventListener("scroll", handleScroll);

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
