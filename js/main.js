console.log('My Portfolio');

var gProjs = [
  {
    id: 1,
    name: 'Mosscow MineSweeper',
    title: 'Minesweeper Game',
    fullImg: "img/portfolio/1-full.png",
    thumbImg: "img/portfolio/1-thumbnail.png",
    url: "projs/minesweeper/index.html",
    publishedAt: 1520518436000,
    labels: ["Matrixes", "keyboard events"]
  },
  {
    id: 2,
    name: 'Touch Nums',
    title: 'Touch the number',
    fullImg: "img/portfolio/2-full.png",
    thumbImg: "img/portfolio/2-thumbnail.png",
    url: "projs/touchnums/index.html",
    publishedAt: 1520518436000,
    labels: ["Matrixes", "keyboard events"]
  },
  {
    id: 3,
    name: 'In Picture',
    title: 'In the picture quest',
    fullImg: "img/portfolio/3-full.png",
    thumbImg: "img/portfolio/3-thumbnail.png",
    url: "projs/inpicture/index.html",
    publishedAt: 1520518436000,
    labels: ["Matrixes", "keyboard events"]
  },
  {
    id: 4,
    name: 'My Magic Books Shoop',
    title: 'My Magic Books Shoop',
    fullImg: "img/portfolio/4-full.png",
    thumbImg: "img/portfolio/4-thumbnail.png",
    url: "projs/BooksShop/index.html",
    publishedAt: 1520518436000,
    labels: ["Matrixes", "keyboard events"]
  },
  {
    id: 5,
    name: 'Sokoban',
    title: 'In the picture quest',
    fullImg: "img/portfolio/5-full.png",
    thumbImg: "img/portfolio/5-thumbnail.png",
    url: "projs/sokoban/index.html",
    publishedAt: 1520518436000,
    labels: ["Matrixes", "keyboard events"]
  },
  {
    id: 6,
    name: 'Chess',
    title: 'In the picture quest',
    fullImg: "img/portfolio/6-full.jpg",
    thumbImg: "img/portfolio/6-thumbnail.jpg",
    url: "projs/chess/index.html",
    publishedAt: 1520518436000,
    labels: ["Matrixes", "keyboard events"]
  }

];
var aboutText = 'Currently a student at boot-camp full-stack program at Coding academy. Looking for new opportunities as a Front End developer. Coming from online marketing background of 10 years, with gaming specialization for the last 5 years. will be happy to integrate into any organization that is relevant to those fields but not only of course. Available to start from June 2018. Fluent in English, Hebrew and Russian.';

// function updateProfile() {
//     // $("p.large text-muted  about-description").html(aboutText); // update the text in the team - profile describtion
// }
renderProjs(gProjs);
renderModals();

/* <div class="col-md-4 col-sm-6 portfolio-item">
<a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
<div class="portfolio-hover">
<div class="portfolio-hover-content">
<i class="fa fa-plus fa-3x"></i>
</div>
</div> -->
<img class="img-fluid" src="img/portfolio/1-thumbnail.jpg" alt="">
</a>
<div class="portfolio-caption">
<h4>Threads</h4>
<p class="text-muted">Illustration</p>
</div>
</div>  */
function renderData() {
  $(".bg-light div p.large.text-muted.about-description").html(aboutText);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderProjs(projs) {
  var strHtml = '';
  gProjs.forEach(function (proj, i) {
    // console.log($(proj.id));
    strHtml += `   
            <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${i + 1}">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fa fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="${proj.thumbImg}" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>${proj.name}</h4>
              <p class="text-muted">${proj.title}</p>
            </div>
          </div>
            `;
  });
  var elProjects = document.querySelector('.projects');
  elProjects.innerHTML = strHtml;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderModals() {
  var strHtml = '';

  gProjs.forEach(function (proj, i) {
    strHtml += `
      <div class="portfolio-modal modal fade" id="portfolioModal${i+1}" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2>${proj.name}</h2>
                  <a href="${proj.url}" class="btn btn-primary">Play</a>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                        <li>Date: <span>${formatDate(proj.publishedAt)}</span></li>
                        
                    </ul>
                    <img class="img-fluid d-block mx-auto" src="${proj.fullImg}" alt="">
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
              <i class="fa fa-times"></i>
              Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
  });
  // DOM
  var elModals = document.querySelector('.modals-container');
  elModals.innerHTML = strHtml;
  // $('projects').html(strHtml);
}

function formatDate(timestamp) {
  var time = moment(timestamp).format('L'); 
  console.log (time);
  return time;
}

