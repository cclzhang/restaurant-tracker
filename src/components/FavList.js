import React, {Component} from 'react';
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FavList extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         favourites: [],
    //         wantToTry: [],
    //         userInput: "",
    //     }
    // }
    render(){
        return(
            <section className="list favourites">
                <h3>favourite restaurants</h3>
                <ul>
                    {this.state.favourites.map((restaurant) => {
                        return (
                            <li key={restaurant.key}>
                                <p>{restaurant.name}</p>
                                <button><FontAwesomeIcon icon={faPencilAlt} /></button>
                                <button onClick={() => { this.removeFav(restaurant.key) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </li>
                        );
                    })}
                </ul>
            </section>
        )
    }
}

export default FavList;