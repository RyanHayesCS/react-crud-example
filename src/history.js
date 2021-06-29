//this file is used in order to maintain a history object outside of browser, i.e. within application.
//this is used in order to utilize programmatic navigation without passing history object into action creators
import { createBrowserHistory } from 'history'; 

export default createBrowserHistory();