import React from 'react'

const InstructionArrayToList = (props) => {
    const instructions = props.instructions.map((instruction, index) => {
        let instructionNoSpan = instruction.toString().replace(/<\/?span[^>]*>/g,'').replace(/&nbsp;/gi,'');
        return (
            <li>{ instructionNoSpan }</li>
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