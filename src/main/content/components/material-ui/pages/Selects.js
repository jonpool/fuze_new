import React from 'react';
                        import {FuseExample, FuseHighlight, FusePageSimple} from '@fuse';
                        import {Button, Icon, Typography} from 'material-ui';
                        import {withStyles} from 'material-ui/styles/index';
                        /* eslint import/no-webpack-loader-syntax: off */
                        const styles = theme => ({
                            layoutRoot: {}
                        });
                        function Selects({classes}) {
                          return (
                            
         <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <Typography variant="title">Selects</Typography>
                    <Button className="normal-case"
                            variant="raised" component="a" href="https://material-ui-next.com/demos/selects" target="_blank">
                        <Icon className="mr-4">link</Icon>
                        Reference
                    </Button>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl mx-auto">
                     <Typography className="text-44 mt-32 mb-8" component="h1">Selects</Typography><Typography className="text-32 mt-32 mb-8" component="h2">Simple Select</Typography><Typography className="mb-16" component="p">Menus are positioned over their emitting elements such that the currently selected menu item appears on top of the emitting element.</Typography><FuseExample
                    className="my-24"
                    component={require('main/content/components/material-ui/material-ui-examples/selects/SimpleSelect.js').default} 
                    raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/selects/SimpleSelect.js')}/>

<Typography className="text-32 mt-32 mb-8" component="h2">Native Select</Typography><Typography className="mb-16" component="p">As the user experience can be improved on mobile using the native select of the platform,
we allow such pattern.</Typography><FuseExample
                    className="my-24"
                    component={require('main/content/components/material-ui/material-ui-examples/selects/NativeSelect.js').default} 
                    raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/selects/NativeSelect.js')}/>

<Typography className="text-32 mt-32 mb-8" component="h2">Multiple Select</Typography><Typography className="mb-16" component="p">The <code>Select</code> component can handle multiple selections.
It&#39;s enabled with the <code>multiple</code> property.</Typography><FuseExample
                    className="my-24"
                    component={require('main/content/components/material-ui/material-ui-examples/selects/MultipleSelect.js').default} 
                    raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/selects/MultipleSelect.js')}/>

<Typography className="text-32 mt-32 mb-8" component="h2">With a Dialog</Typography><Typography className="mb-16" component="p">While it&#39;s not encouraged by the Material Design specification, you can use a select inside a dialog.</Typography><FuseExample
                    className="my-24"
                    component={require('main/content/components/material-ui/material-ui-examples/selects/DialogSelect.js').default} 
                    raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/selects/DialogSelect.js')}/>

<Typography className="text-32 mt-32 mb-8" component="h2">Text Fields</Typography><Typography className="mb-16" component="p">The <code>TextField</code> wrapper component is a complete form control including a label, input and help text. You can find an example with the select mode <a href="/demos/text-fields#textfield">in this section</a>.</Typography><Typography className="text-32 mt-32 mb-8" component="h2">Controlled open Select</Typography><FuseExample
                    className="my-24"
                    component={require('main/content/components/material-ui/material-ui-examples/selects/ControlledOpenSelect.js').default} 
                    raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/selects/ControlledOpenSelect.js')}/>
                </div>
            }
        />
    
                          );
                        }
                        
                        export default withStyles(styles, {withTheme: true})(Selects);
                        