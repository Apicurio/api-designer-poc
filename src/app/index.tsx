import React, {useState, useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Config, ConfigContext, BasenameContext} from "@rhoas/app-services-ui-shared";
import {AppLayout} from "@app/app-layout";
import {AppRoutes} from "@app/routes";
import {EmptyState, EmptyStateIcon, Spinner, Title} from "@patternfly/react-core";
import {ApiDesignerConfigContext, ApiDesignerConfigType} from "@app/contexts/config";
import {getKeycloakInstance} from "./auth/keycloak/keycloakAuth";
import {AlertProvider} from "@app/alerts";
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
        ads: {
            editorsBasePath: apiDesignerConfig.federatedModules.editors
        }
    };

    const loadingState: React.ReactNode = (
        <EmptyState>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title size="lg" headingLevel="h4">
                Loading
            </Title>
        </EmptyState>
    );

    return (
        <BasenameContext.Provider value={{getBasename: () => ""}}>
            <AlertProvider>
                <ApiDesignerConfigContext.Provider value={apiDesignerConfig}>
                    <ConfigContext.Provider value={cfg}>
                        <KeycloakContext.Provider value={{keycloak, profile: keycloak?.profile}}>
                            <KeycloakAuthProvider>
                                <Router>
                                    <React.Suspense fallback={loadingState}>
                                        <AppLayout>
                                            <AppRoutes/>
                                        </AppLayout>
                                    </React.Suspense>
                                </Router>
                            </KeycloakAuthProvider>
                        </KeycloakContext.Provider>
                    </ConfigContext.Provider>
                </ApiDesignerConfigContext.Provider>
            </AlertProvider>
        </BasenameContext.Provider>
    );
}

export default App;
