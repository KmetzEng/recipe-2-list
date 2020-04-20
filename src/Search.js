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
        this.props.handleSearch(this.state)
        this.setState(this.initialState)
        
    }

    render() {
        const { recipeURL } = this.state
        return (
            <form>
                <label htmlFor="recipeURL">Recipe URL:</label>
                <input 
                    type="text"
                    name="recipeURL"
                    id="recipeURL"
                    value={ this.recipeURL }
                    onChange={ this.handleInput }
                />
                <input 
                    type="button"
                    value="Search!"
                    onClick={ this.submitURL }
                />
            </form>
        );
    }
}

export default Search