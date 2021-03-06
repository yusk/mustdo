import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css';
import './App.css';
import topRoutes from './presentation/router/Top'
import { InjectionProvider } from './di_container/InjectionProvider';
import container from './di_container/tsyringe.config';

export const App = () => {
  return (
    <InjectionProvider container={container}>
      <AppRouter />
    </InjectionProvider>
  )
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {topRoutes.map((config, i) => (
          <Route key={i} path={config.path} exact={config.exact} children={config.children} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default App;