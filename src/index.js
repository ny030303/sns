import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "uikit/dist/css/uikit.min.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as uikit from 'uikit/dist/js/uikit.min';
import * as uikitIcons from 'uikit/dist/js/uikit-icons.min';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min';
import * as popper from 'popper.js/dist/popper';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

