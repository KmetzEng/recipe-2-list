import React from 'react'

const InstructionArrayToList = (props) => {
    const instructions = props.instructions.map((instruction, index) => {
        return (
            <li className="instruction" key={index}>{ instruction }</li>
        );
    })

    return <ol className="instruction-list">{ instructions }</ol>
};


const InstructionsList = (props) => {
    const { instructions } = props;

    return (
        <div className="instructions-container">
            <h3 className="instructions-header">Instructions:</h3>
            <InstructionArrayToList instructions={instructions}/>
        </div>
    );
}

export default InstructionsList;