import React from 'react';

// Import style
import "./Title.css";

export const Title = ({children}) => {
    return(
        <div id="title"> 
            {children}
        </div>
    );
}