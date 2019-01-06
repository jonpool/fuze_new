import React from 'react';
import {Typography} from '@material-ui/core';
import {FuseHighlight, FusePageSimple} from '@fuse';

const FuseAuthorizationDoc = () => {
    return (
        <FusePageSimple
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <Typography variant="h6">FuseAuthorization</Typography>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl mx-auto">

                    <Typography className="mb-16" component="p">
                        <code className="language-bash">FuseAuthorization</code> is authorization component of the Fuse React. It allows to block routes based on user roles. It
                        should wraps the FuseTheme component.
                    </Typography>

                    <FuseHighlight component="pre" className="language-jsx">
                        {
                            `
                               <FuseAuthorization routes={routes}>
                                    <FuseTheme>
                                        <FuseLayout
                                            routes={routes}
                                            toolbar={
                                                <MainToolbar/>
                                            }
                                            navbarHeader={
                                                <MainNavbarHeader/>
                                            }
                                            navbarContent={
                                                <MainNavbarContent/>
                                            }
                                            footer={
                                                <MainFooter/>
                                            }
                                            rightSidePanel={
                                                <React.Fragment>
                                                    <ChatPanel/>
                                                    <QuickPanel/>
                                                </React.Fragment>
                                            }
                                            contentWrapper={
                                                <SettingsPanel/>
                                            }
                                        />
                                    </FuseTheme>
                                </FuseAuthorization>
                                `
                        }
                    </FuseHighlight>

                    <Typography className="text-32 mt-32 mb-8" component="h2">Configuration</Typography>

                    <Typography className="mb-16" component="p">
                        You can define authorization roles in route config files.
                    </Typography>

                    <FuseHighlight component="pre" className="language-js">
                        {`
                                export const AdminRoleExampleConfig = {
                                    settings: {
                                        layout: {
                                            config: {}
                                        }
                                    },
                                    auth    : authRoles.admin,//['admin']
                                    routes  : [
                                        {
                                            path     : '/auth/admin-role-example',
                                            component: AdminRoleExample
                                        }
                                    ]
                                };
                            `}
                    </FuseHighlight>

                    <Typography className="mb-16 mt-32" component="p">
                        You can also hide navigation item/group/collapse by adding auth property in <code className="language-bash">fuse-configs/fuseNavigationConfig.js</code>.
                    </Typography>

                    <FuseHighlight component="pre" className="language-js">
                        {`
                                  {
                                    'id'   : 'only-admin-navigation-item',
                                    'title': 'Nav item only for Admin',
                                    'type' : 'item',
                                    'auth' : authRoles.admin,
                                    'url'  : '/auth/admin-role-example',
                                    'icon' : 'verified_user'
                                  },
                            `}
                    </FuseHighlight>

                    <Typography className="text-32 mt-32 mb-8" component="h2">On fuseRoutesConfig.js file</Typography>

                    <Typography className="mb-16 mt-32" component="p">
                        If you don't want to set auth on every page config;
                        <br/>You can group the configs and define authorization the fuseRoutesConfig.js file,
                        <br/>With this configuration below makes <b>whole app</b> auth protected:
                    </Typography>

                    <FuseHighlight component="pre" className="language-js">
                        {`
                                    import React from 'react';
                                    import {Redirect} from 'react-router-dom';
                                    import {FuseUtils} from '@fuse/index';
                                    import {appsConfigs} from 'app/main/apps/appsConfigs';
                                    import {pagesConfigs} from 'app/main/pages/pagesConfigs';
                                    import {authRoleExamplesConfigs} from 'app/main/auth/authRoleExamplesConfigs';
                                    import {UserInterfaceConfig} from 'app/main/user-interface/UserInterfaceConfig';
                                    import {ComponentsConfig} from 'app/main/components/ComponentsConfig';
                                    import {ComponentsThirdPartyConfig} from 'app/main/components-third-party/ComponentsThirdPartyConfig';
                                    import {GettingStartedConfig} from 'app/main/getting-started/GettingStartedConfig';
                                    import {LoginConfig} from 'app/main/login/LoginConfig';
                                    import {RegisterConfig} from 'app/main/register/RegisterConfig';
                                    import {CallbackConfig} from 'app/main/callback/CallbackConfig';
                                    import _ from '@lodash';
                                    import {authRoles} from 'auth';

                                    function setAdminAuth(configs)
                                    {
                                        return configs.map(config => _.merge({}, config, {auth: authRoles.admin}))
                                    }

                                    const routeConfigs = [
                                        ...setAdminAuth([
                                            ...appsConfigs,
                                            ...pagesConfigs,
                                            ...authRoleExamplesConfigs,
                                            ComponentsConfig,
                                            ComponentsThirdPartyConfig,
                                            UserInterfaceConfig,
                                            GettingStartedConfig
                                        ]),
                                        LoginConfig,
                                        RegisterConfig,
                                        CallbackConfig
                                    ];

                                    export const routes = [
                                        ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
                                        {
                                            path     : '/',
                                            component: () => <Redirect to="/apps/dashboards/analytics"/>
                                        },
                                        {
                                            exact    : true,
                                            component: () => <Redirect to="/pages/errors/error-404"/>
                                        }
                                    ];
                            `}
                    </FuseHighlight>

                </div>
            }
        />
    );
};

export default FuseAuthorizationDoc;
