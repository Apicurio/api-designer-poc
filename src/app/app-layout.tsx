import React, {useEffect, useState} from "react";
import {
    Page,
    PageSidebar,
    PageHeader, PageSection, PageSectionVariants, NavItem, NavGroup, Nav, NavExpandable, NavList
} from "@patternfly/react-core";

export type AppLayoutProps = {
    children?: React.ReactNode;
};

export const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ children }) => {

    const [isNavOpen, setNavOpen] = useState(true);

    const logoProps = {
        href: 'https://patternfly.org',
        onClick: () => console.log('clicked logo'),
        target: '_blank'
    };

    const onNavToggle = () => {
        setNavOpen(!isNavOpen);
    };

    const RightNav = (
        <Nav>
            <NavList>
                <NavItem preventDefault to="#overview" itemId="overview" isActive={false}>
                    Overview
                </NavItem>
                <NavItem preventDefault to="#apiman" itemId="apiman" isActive={false}>
                    API Management
                </NavItem>
                <NavItem preventDefault to="#datasci" itemId="datasci" isActive={false}>
                    Data Science
                </NavItem>
                <NavItem preventDefault to="#apidesigner" itemId="api-designer" isActive={true}>
                    API Designer
                </NavItem>
                <NavExpandable title="Service Registry" groupId="service-registry" isActive={false}>
                    <NavItem
                        preventDefault
                        to="#service-registry-1"
                        groupId="service-registry"
                        itemId="service-registry-1"
                        isActive={false}
                    >
                        Service Registry Instances
                    </NavItem>
                    <NavItem
                        preventDefault
                        to="#service-registry-2"
                        groupId="service-registry"
                        itemId="service-registry-2"
                        isActive={false}
                    >
                        Documentation
                    </NavItem>
                </NavExpandable>
            </NavList>
        </Nav>
    );

    const Header = (
        <PageHeader
            logo="API Designer (poc)"
            logoProps={logoProps}
            showNavToggle
            isNavOpen={isNavOpen}
            onNavToggle={onNavToggle}
        />
    );
    const Sidebar = <PageSidebar nav={RightNav} isNavOpen={isNavOpen} />;

    return (
        <Page header={Header} sidebar={Sidebar}>
            {children}
        </Page>
    );
}

