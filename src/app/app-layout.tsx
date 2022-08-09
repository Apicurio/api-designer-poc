import React, {useContext} from "react";
import {Nav, NavItem, NavList, PageSidebar, Page, PageHeader, PageHeaderTools} from "@patternfly/react-core";
import {KeycloakContext} from "@app/auth/keycloak/KeycloakContext";
import {ApiDesignerConfigType, useApiDesignerContext} from "@app/contexts/config";

export type AppLayoutProps = {
    children?: React.ReactNode;
};

export const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ children }) => {
    const keycloakContext = useContext(KeycloakContext);
    const apiDesignerConfig: ApiDesignerConfigType | undefined = useApiDesignerContext();

    // Force the user to login if auth is enabled.
    if (apiDesignerConfig?.auth.enabled) {
        if (!keycloakContext.keycloak) {
            return (<div>403 Unauthorized</div>);
        }
        if (!keycloakContext.keycloak.authenticated) {
            keycloakContext.keycloak?.login();
            return <></>;
        }
    }

    const logoProps = {
        href: "/"
    };

    const logout = (): void => {
        keycloakContext.keycloak?.logout({redirectUri: window.location.href});
    };

    const logo: React.ReactNode = <div className="app-logo">
            <img className="pf-c-brand logo-make" src="/images/logo.png" alt="apicurio-logo" />
            <span className="logo-model">Applications</span>
        </div>;

    const headerActions: React.ReactNode = apiDesignerConfig?.auth.enabled ?
        <PageHeaderTools style={{float: "right"}}>
            <a onClick={logout}>Logout</a>
        </PageHeaderTools>
        : <React.Fragment />

    const header = (
        <PageHeader
            logo={logo}
            logoProps={logoProps}
            headerTools={headerActions}
        />
    );

    const rightNav: React.ReactNode = (
        <Nav>
            <NavList>
                <NavItem preventDefault to="#apidesigner" itemId="api-designer" isActive={true}>
                    API Designer
                </NavItem>
                <NavItem to={apiDesignerConfig?.apps?.registry} itemId="registry" isActive={false}>
                    Registry
                </NavItem>
            </NavList>
        </Nav>
    );
    const sidebar: React.ReactNode | undefined = apiDesignerConfig?.apps?.showNav ? <PageSidebar nav={rightNav} isNavOpen={true} /> : undefined;

    return (
        <Page header={header} sidebar={sidebar}>
            {children}
        </Page>
    );
}

