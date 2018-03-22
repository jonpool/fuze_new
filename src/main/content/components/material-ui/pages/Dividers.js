import React from 'react';
                        import {FuseExample, FuseHighlight, FusePageSimple} from '@fuse';
                        import {Button, Icon, Typography} from 'material-ui';
                        import {withStyles} from 'material-ui/styles/index';
                        /* eslint import/no-webpack-loader-syntax: off */
                        const styles = theme => ({
                            layoutRoot: {}
                        });
                        function Dividers({classes}) {
                          return (
                            
         <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <Typography variant="title">Dividers</Typography>
                    <Button className="normal-case"
                            variant="raised" component="a" href="https://material-ui-next.com/demos/dividers" target="_blank">
                        <Icon className="mr-4">link</Icon>
                        Reference
                    </Button>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl mx-auto">
                     <Typography className="text-44 mt-32 mb-8" component="h1">Dividers</Typography><Typography className="mb-16" component="p"><a href="https://material.io/guidelines/components/dividers.html">Dividers</a> group and separate content within lists and page layouts. The divider is a thin rule, lightweight yet sufficient to distinguish content visually and spatially.</Typography><Typography className="text-32 mt-32 mb-8" component="h2">List Dividers</Typography><Typography className="mb-16" component="p">The divider renders as a <code>&lt;hr&gt;</code> by default.
You can save rendering this DOM element by using the <code>divider</code> property on the <code>ListItem</code> component.</Typography><FuseExample
                    className="my-24"
                    component={require('main/content/components/material-ui/material-ui-examples/dividers/ListDividers.js').default} 
                    raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/dividers/ListDividers.js')}/>

<Typography className="text-32 mt-32 mb-8" component="h2">Inset Dividers</Typography><Typography className="mb-16" component="p">The following example demonstrates the <code>inset</code> property.
We need to make sure the <code>Divider</code> is rendered as a <code>li</code> to match the HTML5 specification.
The example shows two ways of achieving this.</Typography><FuseExample
                    className="my-24"
                    component={require('main/content/components/material-ui/material-ui-examples/dividers/InsetDividers.js').default} 
                    raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/dividers/InsetDividers.js')}/>
                </div>
            }
        />
    
                          );
                        }
                        
                        export default withStyles(styles, {withTheme: true})(Dividers);
                        