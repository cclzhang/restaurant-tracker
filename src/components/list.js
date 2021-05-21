import React, {Component} from 'react';
import firebase from '../firebase';
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/List.css'

class List extends Component{
    constructor(){
        super();
        this.state = {
            visibility: false,
        }
    }
    removeHandler = (restaurantKey) => {
        const dbRef = firebase.database().ref(this.props.refKey);
        dbRef.child(restaurantKey).remove();
    }

    infoBox = (name, url, type) =>{
        return (
            <div className="infoBox">
                <h4><a href={url}>{name}</a></h4>
                <p>-- {type}</p>
            </div>
        )
    }

    classDecider = ()=>{
        if (this.state.visibility) {
            return "editInput"
        } else {
            return "editInput hidden"
        }
    }

    editClick = (e)=>{
        e.preventDefault();
        this.setState({
            visibility: !this.state.visibility,
        })
    }

    render(){
        return (
            this.props.listType.map((restaurant, index) => {
                return(
                    <li key={restaurant.key} >
                        {restaurant.name ? 
                            this.infoBox(restaurant.name, restaurant.url, restaurant.type) 
                            : <h4 className="infoBox">{restaurant.data}</h4>}
                        <div className={this.classDecider()}>
                            <input type="search" id="edit"/>
                            <label htmlFor="edit">type another restaurant</label>
                            <button>edit</button>
                        </div>
                        <div className="buttonBox">
                            <button disabled id={index} onClick={e=> this.editClick(e)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                            <button onClick={() => {this.removeHandler(restaurant.key) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                        </div>
                    </li>
                )
            })
        )
    }
}

export default List;