import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Rout from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Rout />, document.getElementById('root'));
registerServiceWorker();
