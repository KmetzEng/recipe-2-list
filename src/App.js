import React, { Component } from 'react';
import Search from './Search';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';
import ToggleBtn from './ToggleBtn';

const supported_sources = [
  'cookieandkate.com',
  'bonappetit.com',
  'budgetbytes.com',
  'foodnetwork.com',
  'tasty.co',
  'allrecipes.com',
  'thekitchn.com',
  'myrecipes.com',
  'eatingwell.com',
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
    data.forEach(el => dataArr.push(el.innerText));
    return dataArr;
  };


  checkIfSupported = (source) => {
    return supported_sources.some( src => src === source);  // Check if some source is the one we're looking for
  };


  getSelectorsBySource = (source) => {
    let selectors = {
      ingSelector: '',
      instrSelector: '',
    };

    switch(source) {
      case 'cookieandkate.com':
        selectors['ingSelector'] = 'div[class*=ingredients] > ul > li';
        selectors['instrSelector'] = 'div[class*=instructions] > ol > li';
        break;
      case 'bonappetit.com':
        selectors['ingSelector'] = 'div[class*=ingredientsGroup] > ul > li';
        selectors['instrSelector'] = '[class*=steps] > li';
        break;
      case 'budgetbytes.com':
        selectors['ingSelector'] = '[class*=wprm-recipe-ingredients] > li';
        selectors['instrSelector'] = '[class*=wprm-recipe-instructions] > li';
        break;
      case 'foodnetwork.com':
        selectors['ingSelector'] = 'div[class*=o-Ingredients__m-Body] > p';
        selectors['instrSelector'] = 'div[class*=o-Method__m-Body] > ol > li';
        break;
      case 'tasty.co':
        selectors['ingSelector'] = 'div[class*=ingredients__section] > ul > li';
        selectors['instrSelector'] = 'ol[class*=prep-steps] > li';
        break;
      case 'allrecipes.com', 'eatingwell.com':
        selectors['ingSelector'] = 'ul[class*=ingredients-section] > li';
        selectors['instrSelector'] = 'ul[class*=instructions-section] > li[class*=instructions-section-item] > div[class=section-body] > p';
        break;
      case 'thekitchn.com':
        selectors['ingSelector'] = 'ul[class*=Recipe__ingredients] > li';
        selectors['instrSelector'] = 'ol[class*=Recipe__instructions] > li';
        break;
      case 'myrecipes.com':
        selectors['ingSelector'] = 'div[class*=ingredients] > ul > li';
        selectors['instrSelector'] = 'div[class=step] > p';
        break;
      default:
        selectors['ingSelector'] = 'ul > li';
        selectors['instrSelector'] = 'ol > li';
        break;
    };

    console.log(selectors);
    return selectors;
  };


  getRecipeInfo = async () => {
    const { recipeURL } = this.state;

    let recipeDomain = recipeURL.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];  // used for selecting parse method
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  // Allows cors for front-end js

    console.log(recipeDomain);

    // Get the page html
    let pageData = fetch(proxyUrl + recipeURL)
      .then((res) => {
        return res.text()
      })
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        return doc;
    });

    // Check if recipe source is supported and modify page
    let selectors = {};
    if(this.checkIfSupported(recipeDomain)) {
      document.getElementById('recipe-url').style.border = '5px solid #68e379';
      document.getElementById('recipe-url').title = 'Recipe Source is Supported!';
      document.getElementById('recipe-url').value = '';
      selectors = this.getSelectorsBySource(recipeDomain);
    }
    else {
      document.getElementById('recipe-url').style.border = '5px solid #e39568';
      document.getElementById('recipe-url').title = 'Recipe Source is Unsupported! Results may vary.';
      document.getElementById('recipe-url').value = '';
      selectors = this.getSelectorsBySource(recipeDomain);
    }


    // Parse Based on Selectors
    let ingData = [];
    let instrData = [];
    if(selectors['ingSelector'] === '') {
      console.log('no ingredients found!');
    }
    else {
      ingData = Array.from((await pageData).querySelectorAll(selectors['ingSelector']));
      instrData = Array.from((await pageData).querySelectorAll(selectors['instrSelector']));
    }

    // clean up arrays
    let ingArr = this.processRecipeData(ingData);
    let instrArr = this.processRecipeData(instrData);

    console.log(ingData, ingArr);
    console.log(instrData, instrArr);

    this.updateRecipeInfo(ingArr, instrArr);
  };


  render() {
    const { ingredients, instructions } = this.state;

    return (
      <div className="container">
        <div className="main-container">
          <h1 className="page-title">
            <span><img className="title-img" src="/images/fork_knife_cross.png" height="25px" alt="" /></span>
            <span className="title-text">Recipe-2-List</span>
            <span><img className="title-img" src="/images/fork_knife_cross_mirror.png" height="25px" alt="" /></span>
          </h1>
          <h2 className="sub-title">recipe ingredients and instructions without the story</h2>
          <Search handleSearch={ this.handleSearch } />
        </div>
        <div id="list-container" className="list-container-cols">
          <IngredientList ingredients={ ingredients } />
          <InstructionList instructions={ instructions } />
        </div>
        <div className="compat-list">
          <p>
            Recipe Sources Known to Work With Recipe-2-List<br />
            AllRecipes - Bon Appetit - EatingWell - Food Network - MyRecipes - Tasty - The Kitchn - Budget Bytes - Cookie and Kate
          </p>
        </div>
        <div className="credits">
          <p>Kmetz Engineering - April 2020<br />kmetzeng@gmail.com</p>
        </div>
      </div>
    );
  };

};

export default App;
