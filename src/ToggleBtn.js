import React, { Component } from 'react'

class ToggleBtn extends Component {
    state = {
      layoutMode: 0,
    }

    toggleLayout = () => {
      const { layoutMode } = this.state;
      if (layoutMode) {

        document.getElementById("list-container").classList.remove("list-container-cols");
        document.getElementById("list-container").classList.add("list-container-stacked");
        document.getElementById("ingredients-container").classList.remove("ingredients-container");
        document.getElementById("ingredients-container").classList.add("ingredients-container-stacked");
        document.getElementById("instructions-container").classList.remove("instructions-container");
        document.getElementById("instructions-container").classList.add("instructions-container-stacked");

        this.setState({
          [layoutMode]: 1,
        });

      } else {

        document.getElementById("list-container").classList.remove("list-container-stacked");
        document.getElementById("list-container").classList.add("list-container-cols");
        document.getElementById("ingredients-container").classList.remove("ingredients-container-stacked");
        document.getElementById("ingredients-container").classList.add("ingredients-container");
        document.getElementById("instructions-container").classList.remove("instructions-container-stacked");
        document.getElementById("instructions-container").classList.add("instructions-container");

        this.setState({
          [layoutMode]: 0,
        });

      }
    }

    render() {
        return(
          <input
            type="button"
            id="toggle-btn"
            className="display-toggle-btn"
            value="DISPLAY TOGGLE"
            onClick={ this.toggleLayout }
          />
        )
    }
}

export default ToggleBtn;
