import React, { Component } from 'react'

class Search extends Component {
    initialState = {
        recipeURL: '',
    };

    state = this.initialState
    
    handleInput = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        });
    }

    submitURL = () => {
        this.props.handleSearch(this.state.recipeURL)
        this.setState(this.initialState)
    }

    render() {
        return (
            <div className="search-form" id="recipe-url-search">
                <form>
                    <label htmlFor="recipeURL">Recipe URL:</label>
                    <input 
                        type="text"
                        name="recipeURL"
                        id="recipe-url"
                        value={ this.recipeURL }
                        onChange={ this.handleInput }
                    />
                    <input 
                        type="button"
                        id="search-btn"
                        value="Search!"
                        onClick={ this.submitURL }
                    />
                </form>
            </div>
        );
    }
}

export default Search