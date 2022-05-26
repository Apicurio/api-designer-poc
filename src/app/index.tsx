import React, {useState, useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Config, ConfigContext, BasenameContext} from "@rhoas/app-services-ui-shared";
import {AppLayout} from "@app/app-layout";
import {AppRoutes} from "@app/routes";
import {Spinner} from "@patternfly/react-core";
import {ApiDesignerConfigContext, ApiDesignerConfigType} from "@app/contexts/config";
import {getKeycloakInstance} from "./auth/keycloak/keycloakAuth";
import {
    KeycloakAuthProvider,
    KeycloakContext,
} from "@app/auth/keycloak/KeycloakContext";

import "@app/app.css";

import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/patternfly/utilities/Sizing/sizing.css";
import "@patternfly/patternfly/utilities/Spacing/spacing.css";
import "@patternfly/patternfly/utilities/Display/display.css";
import "@patternfly/patternfly/utilities/Flex/flex.css";


let keycloak: Keycloak.KeycloakInstance | undefined;
// @ts-ignore
const apiDesignerConfig: ApiDesignerConfigType = ApiDesignerConfig || window["ApiDesignerConfig"];


const App: React.FunctionComponent = () => {
    const [initialized, setInitialized] = useState(false);

    // Initialize Keycloak
    useEffect(() => {
        if (apiDesignerConfig.auth.enabled) {
            const init = async () => {
                keycloak = await getKeycloakInstance();
                setInitialized(true);
            };
            init();
        } else {
            setInitialized(true);
        }
    }, []);

    if (!initialized) return <Spinner/>;

    // @ts-ignore
    const cfg: Config = {
        srs: {
            apiBasePath: apiDesignerConfig.apis.srs,
        },
        ams: {
            apiBasePath: apiDesignerConfig.apis.ams,
        },
        ads: {
            editorsBasePath: apiDesignerConfig.federatedModules.editors
        }
    };

    return (
        <BasenameContext.Provider value={{getBasename: () => ""}}>
            <ApiDesignerConfigContext.Provider value={apiDesignerConfig}>
                <ConfigContext.Provider value={cfg}>
                    <KeycloakContext.Provider value={{keycloak, profile: keycloak?.profile}}>
                        <KeycloakAuthProvider>
                            <Router>
                                <React.Suspense fallback={<Spinner/>}>
                                    <AppLayout>
                                        <AppRoutes/>
                                    </AppLayout>
                                </React.Suspense>
                            </Router>
                        </KeycloakAuthProvider>
                    </KeycloakContext.Provider>
                </ConfigContext.Provider>
            </ApiDesignerConfigContext.Provider>
        </BasenameContext.Provider>
    );
}

export default App;
