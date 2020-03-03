import React from 'react';
import firebase from '../firebase';
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function List(props){
    const removeHandler = (restaurantKey) => {
        const dbRef = firebase.database().ref(props.refKey);
        dbRef.child(restaurantKey).remove();
    }

    return (
        props.listType.map((restaurant, index) => {
            if (restaurant.name) {
                return(
                    <li key={restaurant.key} >
                        <h4><a href={restaurant.url}>{restaurant.name}</a></h4>
                        <p>{restaurant.type}</p>
                        <button><FontAwesomeIcon icon={faPencilAlt} /></button>
                        <button onClick={() => {removeHandler(restaurant.key) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </li>
                )
            } else {
                return(
                    <li key={index} >
                        <h4>hello</h4>
                        <button><FontAwesomeIcon icon={faPencilAlt} /></button>
                        <button onClick={() => { removeHandler(restaurant.key) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </li>
                )
            }
        })
    );
}

export default List;