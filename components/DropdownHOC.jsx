import React, { useEffect, useRef } from "react";

const withClickOutside = (WrappedComponent) => {
  return function ClickOutsideComponent(props) {
    const ref = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (props.onClose) {
            props.onClose(); // Call the onClose method if provided in props
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, props]);

    return (
      <div ref={ref}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withClickOutside;
