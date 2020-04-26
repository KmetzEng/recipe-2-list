import React from 'react'

const IngredientArrayToList = (props) => {
    const ingredients = props.ingredients.map((ingredient, index) => {
        let ingredientNoSpan = ingredient.toString().replace(/<\/?span[^>]*>/g,'').replace(/&nbsp;/gi,'');
        return (
            <li>{ ingredientNoSpan }</li>
        );
    })

    return <ul className="ingredients-list">{ ingredients }</ul>
};


const IngredientList = (props) => {
    const { ingredients } = props;

    return (
        <div className="ingredients-container">
            <h3 className="ingredients-header">Ingredients:</h3>
            <IngredientArrayToList ingredients={ingredients}/>
        </div>
    );
}

export default IngredientList;