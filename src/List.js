import React, { Component } from 'react'

class List extends Component {
    render() {
        return (
            <div>
                <h2 className="ingredientHeader">Ingredients:</h2>
                <ul className="ingredientList">
                    <li>List elements will go here</li>
                </ul>
            </div>
        )
    }
}

export default List