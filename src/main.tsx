import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/styles/global.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { persistor, store } from './app/providers/StoreProvider/config/store';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptor } from '@/app/providers/http/axiosApi';

addInterceptor(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
);
