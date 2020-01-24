import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./Rout/Home'));
const Login = lazy(() => import('./Rout/Login'));
const Register = lazy(() => import('./Rout/Register'));
const Admin = lazy(() => import('./Rout/Admin'));
const User = lazy(() => import('./Rout/User'));
const Singlepage = lazy(() => import('./Rout/Singlepage'));
const Basket = lazy(() => import('./Rout/Basket'));
const Changepass = lazy(() => import('./Rout/Cheangepass'));

//Make the App skelton to be the router
const App = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login.html" component={Login} />
				<Route exact path="/register.html" component={Register} />
				<Route exact path="/admin.html" component={Admin} />
				<Route exact path="/user.html" component={User} />
				<Route exact path="/singlepage.html" component={Singlepage} />
				<Route exact path="/basket.html" component={Basket} />
				<Route path="/changepass.html" component={Changepass} />
			</Switch>
		</Suspense>
	</Router>
);

export default App;
