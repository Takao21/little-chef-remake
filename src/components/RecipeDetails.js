import Axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../App";
import Footer from "./Footer";
import "./RecipeDetails.css";

function RecipeDetails({ match }) {
  const { recipeDetails, setRecipeDetails } = useContext(RecipeContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await Axios({
          method: "get",
          url: `${process.env.REACT_APP_ENDPOINT}/feeds/list-similarities`,
          headers: {
            "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
          },
          params: {
            start: "0",
            limit: "18",
            id: match.params.id,
          },
        });
        setRecipeDetails(res.data.feed[0].content);
      } catch (err) {
        setRecipeDetails({});
        console.log(err);
      }
    };
    window.scrollTo(0, 0);
    if (!recipeDetails.hasOwnProperty("description")) {
      fetchDetails();
    }
  }, []);
  return (
    recipeDetails.hasOwnProperty("description") && (
      <div className="RecipeDetails">
        <nav className="navigation d-flex justify-content-between align-items-baseline">
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <span>
              <i className="far fa-arrow-alt-circle-left backBtn mr-2"></i>
              {/* <strong>Home Page</strong> */}
            </span>
          </Link>
          <span className="align-self-center nav-logo">
            <h4>Little Chef's Recipes From Heaven</h4>
          </span>
        </nav>
        <div className="head-div container-fluid">
          <div className="row justify-content-around">
            <div className="col-12 col-lg-6">
              <div
                className="img-container"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "50vh",
                  borderRadius: "2rem",
                  backgroundImage: `url(${recipeDetails["details"]["images"][0]["hostedLargeUrl"]})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "#eee",
                }}
              ></div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="head-text-div">
                <h1 className="details-title">{recipeDetails.details.name}</h1>
                <hr></hr>
                <p className="description-para">
                  {recipeDetails.description.text}
                </p>
                <hr></hr>
                <p>
                  <strong>
                    <i className="fas fa-star"></i> Average Rating:{" "}
                  </strong>
                  {recipeDetails.details.rating} / 5
                </p>
                <hr></hr>
                <p>
                  <strong>
                    <i className="fas fa-utensils"></i> Number of Servings:
                  </strong>{" "}
                  {recipeDetails.details.numberOfServings}
                </p>
                <hr></hr>
                <p>
                  <strong>
                    <i className="fas fa-clock"></i> Total Time:
                  </strong>{" "}
                  {recipeDetails.details.totalTime}
                </p>
                <hr></hr>
              </div>
            </div>
          </div>
        </div>
        <div className="ingredients-div-container container-fluid d-flex justify-content-center mt-5">
          <div className="ingredients-div container-fluid">
            <div className="row justify-content-around">
              <div className="col-6">
                <h2>Ingredients</h2>
                <hr></hr>
                <ul
                  style={{ listStyleType: "circle" }}
                  className="ingredients-list"
                >
                  {recipeDetails.ingredientLines.map(
                    (ingredient, i) =>
                      !!ingredient.wholeLine && (
                        <li key={i}>{ingredient.wholeLine}</li>
                      )
                  )}
                </ul>
              </div>
              <div className="col-6 d-flex align-items-center text-center">
                <i className="ingredients-decor fas fa-carrot m-auto"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="steps-div-container container-fluid d-flex justify-content-center mt-5">
          <div className="steps-div container-fluid">
            <div className="row justify-content-around">
              <div className="col-6 d-flex align-items-center text-center">
                <i className="ingredients-decor fas fa-scroll m-auto"></i>
              </div>
              <div className="col-6">
                <h2>Preparation Steps</h2>
                <hr></hr>
                <div className="ingredients-list">
                  {recipeDetails.preparationSteps.map((step, i) => (
                    <div className="prep-step" key={i}>
                      <h6>
                        <i className="fas fa-check-circle"></i>{" "}
                        <strong>Step {i + 1}</strong>
                      </h6>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
}

export default RecipeDetails;
