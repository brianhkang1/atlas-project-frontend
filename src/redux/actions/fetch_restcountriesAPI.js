export function fetchRestCountriesAPI(){
  return (dispatch) => {
    let arr = []
    dispatch({ type: 'FETCHING_RESTCOUNTRIESAPI' });

    return fetch(`https://restcountries.eu/rest/v2/`)
      .then(response => response.json())
      .then(json => {
        json.map(country => arr.push({name: country.name, alpha3Code: country.alpha3Code, capital: country.capital}))
        dispatch({ type: 'ADD_FETCHED_RESTCOUNTRIESAPI', payload: arr})
      })
  }

}
