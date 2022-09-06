import React from "react";

function Popup(props) {
  React.useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", props.onEscClick)
    }
    return () => {
      document.removeEventListener("keydown", props.onEscClick)
    }
  }, [props.isOpen, props.onEscClick]);
}

export default Popup;
