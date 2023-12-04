import React, { useState, useEffect } from "react";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const CockTailStore = () => {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });

  const fetchCocktails = async (url) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(url);
      const { drinks } = await response.json();
      setCocktails(drinks);
      setLoading(false);
      setIsError({ status: false, msg: "" });
      if (!drinks) {
        throw new Error("No Data Found");
      }
    } catch (error) {
      setLoading(false);
      setIsError({
        status: true,
        msg: error.message || "some thing went Wrong!",
      });
    }
  };

  useEffect(() => {
    const CURRENT_URL = `${BASE_URL}${searchTerm}`;
    fetchCocktails(CURRENT_URL);
  }, [searchTerm]);

  return (
    <center>
      <form action="">
        <center>
          <ul id="growing-search-freebie">
            <li>
              <div class="growing-search">
                <div class="input">
                  <input
                    type="text"
                    name="search"
                    placeholder="search cocktails"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </div>
                <div class="submit">
                  <button type="submit" name="go_search">
                    <span class="fa fa-search"></span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </center>
      </form>
      <hr />
      {loading && !isError?.status && (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {isError && <h1 className="errormsg">{isError.msg}</h1>}
      {!loading && !isError?.status && (
        <ul className="cocktail-grid">
          {cocktails.map(({ idDrink, strDrink, strDrinkThumb }) => (
            <li key={idDrink} className="cocktail-item">
              <img
                src={strDrinkThumb}
                alt=""
                width="250"
                className="cocktail-image"
              />{" "}
              <br />
              <div className="cocktail-info">
                <p>{strDrink}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <footer>&copy;Murali krishna Mallela</footer>
    </center>
  );
};

export default CockTailStore;
