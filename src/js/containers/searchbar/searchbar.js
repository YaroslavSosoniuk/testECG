import React from 'react';
import './style.css';

let searchbar = (props) => {

    return(
        <div className='searchbar__wrapper'>
            <input type='text' onInput={props.handleSearch}/>
        </div>
    )

};
export default searchbar;