import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

const rootNode = document.getElementById('root') as HTMLElement;

ReactDOM.render(<Provider store={store}><App /></Provider>, rootNode);

