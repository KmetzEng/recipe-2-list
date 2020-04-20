import React, { Component } from 'react';
import Search from './Search'
import List from './List'

class App extends Component {
  state = {
    recipeURL: '',
    ingredients: [],
  }

  handleSearch = recipeURL => {
    this.setState({ recipeURL: recipeURL, ingredients: [] })
  }

  getIngredients = state => {
    const { recipeURL, ingredients } = this.state
  }

  render() {
    return (
      <div className="container">
        <h1>Henlo, world!</h1>
        <Search handleSearch={this.handleSearch} />
        <List />
      </div>
    )
  }

}

export default App;
