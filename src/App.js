import React, { Component } from 'react';
import Search from './Search';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';


class App extends Component {

  state = {
    recipeURL: '',
    ingredients: [],
    instructions: [],
  };


  handleSearch = recipeURL => {
    this.setState({ recipeURL: recipeURL, ingredients: [], instructions: [] }, this.getRecipeInfo)
  };


  getRecipeInfo = async () => {
    const { recipeURL } = this.state;
    console.log(recipeURL);

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  // Allows cors for front-end js

    let pageData = fetch(proxyUrl + recipeURL)
      .then((res) => {
        return res.text()
      })
      .then((html) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        return doc;
      });
    console.log((await pageData).body.getElementsByTagName('ol'));

    let ings = this.getRecipeIngredients(pageData);      
    console.log(ings);

    let instrs = this.getRecipeInstructions(pageData);
    console.log(instrs);
  };


  getRecipeIngredients = (pageData) => {
    let dom = new DOMParser().parseFromString(pageData, 'text/html');
    let uls = dom.querySelectorAll('ul');
    return uls;
  };


  getRecipeInstructions = (pageData) => {
    let dom = new DOMParser().parseFromString(pageData, 'text/html');
    let ols = dom.querySelectorAll('ol');
    return ols;
  };



  render() {
    const { ingredients, instructions } = this.state;

    return (
      <div className="container">
        <h1>Henlo, world!</h1>
        <Search handleSearch={ this.handleSearch } />
        <div className="list-container">
          <IngredientList ingredients={ ingredients } />
          <InstructionList instructions={ instructions } />
        </div>
      </div>
    );
  };

};

export default App;
