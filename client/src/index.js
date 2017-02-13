import React from 'react';
import {render} from 'react-dom';

import Routers from './routes'
//import antd CSS
import '../node_modules/antd/dist/antd.min.css';
import './css/common.css'



render(<Routers />,document.getElementById('root'));
