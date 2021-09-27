import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//Core App pages
import FeatureFlags from './components/pages/FeatureFlags';
import NotFound from './components/pages/NotFound.js';
import Common from './components/pages/Common.js';


const Routes = () => (
	<Switch>
		<Route path="/" exact render={() => <Redirect to="/featureaccess" />} />
		<Route path="/common" exact component={Common} />		
		<Route path="/featureaccess" exact component={FeatureFlags} />

		{/* Finally, catch all unmatched routes */}
		<Route component={NotFound} />
	</Switch>
);

export default Routes;
