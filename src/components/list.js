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
                        <div className="infoBox">
                            <h4><a href={restaurant.url}>{restaurant.name}</a></h4>
                            <p>{restaurant.type}</p>
                        </div>
                        <div className="buttonBox">
                            <button><FontAwesomeIcon icon={faPencilAlt} /></button>
                            <button onClick={() => {removeHandler(restaurant.key) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                        </div>
                    </li>
                )
            } else {
                return(
                    <li key={index} >
                        <h4 className="infoBox">hello</h4>
                        <div className="buttonBox">
                            <button><FontAwesomeIcon icon={faPencilAlt} /></button>
                            <button onClick={() => { removeHandler(restaurant.key) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                        </div>
                    </li>
                )
            }
        })
    );
}

export default List;