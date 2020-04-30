import React, { Component } from 'react';
import Search from './Search';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';

const supported_sources = [
  'cookieandkate.com',
];

class App extends Component {

  state = {
    recipeURL: '',
    ingredients: [],
    instructions: [],
  };


  handleSearch = (recipeURL) => {
    this.setState({ recipeURL: recipeURL, ingredients: [], instructions: [] }, this.getRecipeInfo);
  };


  updateRecipeInfo = (ingArr, instrArr) => {
    this.setState({ recipeURL: '', ingredients: ingArr, instructions: instrArr });
  };


  processRecipeData = (data) => {
    let dataArr = [];
    data.forEach(el => dataArr.push(el.innerHTML));
    return dataArr;
  };


  checkIfSupported = (source) => {
    return supported_sources.some( src => src === source);  // Check if some source is the one we're looking for
  };


  getRecipeInfo = async () => {
    const { recipeURL } = this.state;

    let recipeDomain = recipeURL.replace('https://', '').replace('http://', '').split('/')[0];  // used for selecting parse method
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  // Allows cors for front-end js

    let pageData = fetch(proxyUrl + recipeURL)
      .then((res) => {
        return res.text()
      })
      .then((html) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        return doc;
    });

    if(this.checkIfSupported(recipeDomain)) {
      console.log('Supported Recipe Source!');
      // TODO - get and use the correct parsing technique
    }
    else {
      console.log('Unsupported Recipe Source!');
    }
    
    // Get ingredient data and instruction data as node lists and then make arrays
    const ingData = Array.from((await pageData).querySelectorAll('div[class*=ingredients] > ul > li'));
    const instrData = Array.from((await pageData).querySelectorAll('div[class*=instructions] > ol > li'));

    let ingArr = this.processRecipeData(ingData);
    let instrArr = this.processRecipeData(instrData);

    this.updateRecipeInfo(ingArr, instrArr);
  };


  render() {
    const { ingredients, instructions } = this.state;

    return (
      <div className="container">
        <div className="main-container">
          <h1 className="page-title">Recipe2List</h1>
          <Search handleSearch={ this.handleSearch } />
        </div>
        <div className="list-container">
          <IngredientList ingredients={ ingredients } />
          <InstructionList instructions={ instructions } />
        </div>
        <div className="compat-list">
          <p>Recipe Sources Known to Work With Recipe2List</p>
          <p>Bon Appetit - </p>
        </div>
      </div>
    );
  };

};

export default App;
