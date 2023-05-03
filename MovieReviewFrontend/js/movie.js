// Avoid `console` errors in browsers that lack a console.
const url = new URL(location.href);
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")

const APILINK = 'https://BackendMoveSite.carterantrobus.repl.co/api/v1/reviews/';


const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          <strong>New Review</strong>
          <p><a>Review</a>
            <input type="text" id="new_review" value="">
          </p>
          <p><a>Username</a>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')"><i class="fa-solid fa-share"></i></a>
          </p>
      </div>
    </div>
  </div>
`
main.appendChild(div_new)

returnReviews(APILINK);

function returnReviews(url){
  fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data){
      console.log(data);
      data.forEach(review => {
        const div_card = document.createElement('div');
        div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card" id="${review._id}">
                <p><a>Review: </a>${review.review}</p>
                <p><a>Username: </a>${review.user}</p>
                <p><a onclick="editReview('${review._id}','${review.review}', '${review.user}')"><i class="fa-solid fa-pen-to-square"></i></a> <a onclick="deleteReview('${review._id}')"><i class="fa-solid fa-eraser"></i></a></p>
              </div>
            </div>
          </div>
        `

        main.appendChild(div_card);
      });
    });
}

function editReview(id, review, user) {

  const element = document.getElementById(id);
  const reviewInputId = "review" + id
  const userInputId = "user" + id

  element.innerHTML = `
              <p><a>Review</a>
                <input type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><a>Username</a>
                <input type="text" id="${userInputId}" value="${user}">
              </p>
              <p><a onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)"><i class="fa-solid fa-share"></i></a>
              </p>

  `
}

function saveReview(reviewInputId, userInputId, id="") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": user, "review": review})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  } else {
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });
}
