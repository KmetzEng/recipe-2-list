import React from 'react'

const IngredientArrayToList = (props) => {
    const ingredients = props.ingredients.map((ingredient, index) => {
        return (
            <li className="ingredient" key={index}>{ ingredient }</li>
        );
    })

    return <ul className="ingredients-list">{ ingredients }</ul>
};


const IngredientList = (props) => {
    const { ingredients } = props;

    return (
        <div className="ingredients-container">
            <h3 className="ingredients-header">
                <span className="list-img"><img src="/images/salad_icon.png" width="25px" height="25px" alt="" /></span>
                <span className="list-text">Ingredients:</span>
                <span className="list-img"><img src="/images/bread_icon.png" width="25px" height="25px" alt="" /></span>
            </h3>
            <IngredientArrayToList ingredients={ingredients}/>
        </div>
    );
}

export default IngredientList;