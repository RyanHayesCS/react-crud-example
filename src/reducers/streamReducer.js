import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types';

export default (state = {}, action) =>{
    switch(action.type) {
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')};//create new object, take key value pairs out of it and add them in, create new object with
        case FETCH_STREAM:                                        //mapKeys function, take objects from it and add to new overall object
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        default:
            return state;
    }
};