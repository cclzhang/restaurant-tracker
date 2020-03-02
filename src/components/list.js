import React from 'react';
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function list(props){
    return (
        props.listType.map((restaurant) => {
            return(
                <li key={restaurant.key} >
                    <p><a href={restaurant.url}>{restaurant.name}</a></p>
                    <button><FontAwesomeIcon icon={faPencilAlt} /></button>
                    <button onClick={() => { this.removeWant(restaurant.key) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </li>
            )
        })
    );
}

export default list;