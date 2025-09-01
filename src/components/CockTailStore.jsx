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

      if (!drinks) {
        setCocktails([]);
        return;
      }

      setCocktails(drinks);
    } catch (error) {
      setCocktails([]);
      setIsError({
        status: true,
        msg: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const CURRENT_URL = `${BASE_URL}${searchTerm}`;
    fetchCocktails(CURRENT_URL);
  }, [searchTerm]);

  return (
    <center>
      {/* Search Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <ul id="growing-search-freebie">
          <li>
            <div className="growing-search">
              <div className="input">
                <input
                  type="text"
                  name="search"
                  placeholder="Search cocktails"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="submit">
                <button type="submit" name="go_search">
                  <span className="fa fa-search"></span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </form>

      <hr />

      {/* Loader */}
      {loading && !isError.status && (
        <div className="lds-spinner">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}></div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError.status && <h1 className="errormsg">{isError.msg}</h1>}

      {/* Cocktails List */}
      {!loading && !isError.status && Array.isArray(cocktails) && cocktails.length > 0 && (
        <ul className="cocktail-grid">
          {cocktails.map(({ idDrink, strDrink, strDrinkThumb }) => (
            <li key={idDrink} className="cocktail-item">
              <img
                src={strDrinkThumb}
                alt={strDrink}
                width="250"
                className="cocktail-image"
              />
              <div className="cocktail-info">
                <p>{strDrink}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* No Results */}
      {!loading && !isError.status && Array.isArray(cocktails) && cocktails.length === 0 && (
        <h2>No cocktails found</h2>
      )}

      <footer>&copy; Murali Krishna Mallela</footer>
    </center>
  );
};

export default CockTailStore;
