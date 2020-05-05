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
        <div id="instructions-container" className="instructions-container">
            <h3 className="instructions-header">
                <span className="list-img"><img src="/images/check_icon.png" width="25px" height="25px" alt="" /></span>
                <span className="list-text">Instructions:</span>
                <span className="list-img"><img src="/images/notepad_icon.png" width="25px" height="25px" alt="" /></span>
            </h3>
            <InstructionArrayToList instructions={instructions}/>
        </div>
    );
}

export default InstructionsList;
