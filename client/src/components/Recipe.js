import React from 'react';

const Recipe = ({title,description}) => {
    return (
        <div className='recipe'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}
export default Recipe;