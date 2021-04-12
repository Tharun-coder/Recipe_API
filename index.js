let recipe_url = "https://api.edamam.com/search?";
let app_id = "9b0770c2";
let app_key = "7c3903f3f681bd8d1f4ee4635ba8e992";
let btn = document.querySelector(".search-btn");
let info_body = document.querySelector(".info-body");

async function getData(recipe) {
  try {
    let res = await fetch(
      `${recipe_url}q=${recipe}&app_id=${app_id}&app_key=${app_key}`
    );
    let data = await res.json();
    data.hits.forEach((hit) => {
      let col = createTag("div", "col-lg-3 col-sm-6 col-md-4 mt-5");
      col.setAttribute("style", "height:500px;overflow:auto");
      let card = createTag("div", "card");
      let img = createTag("img", "card-img-top");
      img.src = hit.recipe.image;
      img.setAttribute("style", "height:200px;width:100%");
      let card_body = createTag("div", "card-body");

      //HealthLabels
      let health_div = createTag("div", "heathLabels");
      health_div.innerHTML = `<!-- Button trigger modal -->
      <button type="button" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#exampleModal">
        About
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">About</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body health-modal">
            ${hit.recipe.healthLabels.join(" | ")}
            </div>
          </div>
        </div>
      </div>`;

      //ingredients
      let ingre_div = createTag("div", "ingredients");
      ingre_div.innerHTML = `<!-- Button trigger modal -->
      <button type="button" class="btn btn-dark btn-sm mt-1" data-toggle="modal" data-target="#exampleModal">
        Ingredients
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Ingredients</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body ingredients-modal">
            ${hit.recipe.ingredientLines.join(" | ")}
            </div>
          </div>
        </div>
      </div>`;

      let calories = createTag("h5", "card-title");
      calories.innerHTML = `Calories - ${hit.recipe.calories.toFixed(3)}`;
      let vitamins = createTag("div", "card-text");
      vitamins.innerHTML = "<b>Vitamins</b>";
      for (i = 0; i < 5; i++) {
        let p = createTag("p", `vitamins ${hit.recipe.digest[i].tag}`);
        p.setAttribute("style", "margin-bottom:0px");
        p.innerHTML = `<i>${
          hit.recipe.digest[i].label
        }</i> - ${hit.recipe.digest[i].total.toFixed(3)}`;
        vitamins.append(p);
      }

      card_body.append(calories, health_div, ingre_div, vitamins);
      card.append(img, card_body);
      col.append(card);
      info_body.append(col);
    });
  } catch (err) {
    console.log(err);
  }
}

btn.addEventListener("click", () => {
  let input = document.querySelector(".search-item");
  input.value === ""
    ? alert("Please provide input to proceed with search")
    : getData(input.value);
});

function createTag(ele, ele_class) {
  let element = document.createElement(ele);
  element.setAttribute("class", ele_class);
  return element;
}
