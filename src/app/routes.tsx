import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";


const HomePage: React.FunctionComponent = () => {
    return (<h1>Home Page</h1>);
};

const RegistryArtifactsPage: React.FunctionComponent = () => {
    return (<h1>Registry Artifacts</h1>);
};

export const AppRoutes = (): ReactElement => {
    return (
        <Switch>
            <Route path='/' exact={true} component={HomePage}/>
            <Route path='/registries/:registryId' exact={true} component={RegistryArtifactsPage}/>
        </Switch>
    );
};
