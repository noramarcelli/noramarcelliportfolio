console.log('My Portfolio');

var gProjs = [
    {   id: 1, 
        name: 'Mosscow MineSweeper', 
        title: 'Minesweeper Game', 
        fullImg: "img/portfolio/01-full.jpg", 
        thumbImg: "img/portfolio/01-thumbnail.jpg",
        url: ,
        publishedAt: 1520518436, 
        labels: ["Matrixes", "keyboard events"]
    },
    {   id: 2, 
        name: 'Touch Nums', 
        title: 'Touch the number', 
        fullImg: "img/portfolio/02-full.jpg", 
        thumbImg: "img/portfolio/02-thumbnail.jpg",
        url: ,
        publishedAt: 1520518436, 
        labels: ["Matrixes", "keyboard events"]
    },
    {
        id: 3, 
        name: 'In Picture', 
        title: 'In the picture quest', 
        fullImg: "img/portfolio/03-full.jpg", 
        thumbImg: "img/portfolio/03-thumbnail.jpg",
        url: ,
        publishedAt: 1520518436, 
        labels: ["Matrixes", "keyboard events"]
    },
];
var aboutText = 'Currently a student at boot-camp full-stack program at Coding academy. Looking for new opportunities as a Front End developer. Coming from online marketing background of 10 years, with gaming specialization for the last 5 years. will be happy to integrate into any organization that is relevant to those fields but not only of course. Available to start from June 2018. Fluent in English, Hebrew and Russian.';

// function updateProfile() {
//     // $("p.large text-muted  about-description").html(aboutText); // update the text in the team - profile describtion
// }
renderProjects();
function renderProjects() {
    $(".bg-light div p.large.text-muted.about-description").html(aboutText);
    var strHtml = '';
    
    gProjs.forEach(function (proj, i) {
        strHtml += `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${i}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${proj.url}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>
        `;
    });


    // DOM
    var elProjects = document.querySelector('.projects');
    elProjects.innerHTML = strHtml;
}