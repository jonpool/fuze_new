import FuseExample from '@fuse/core/FuseExample';
                   import FuseHighlight from '@fuse/core/FuseHighlight';
                   import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
                   import Button from '@mui/material/Button';
                   import Icon from '@mui/material/Icon';
                   import Typography from '@mui/material/Typography';
                  
                   function ButtonGroupDoc(props) {
                     return (
                       
                <>
					<div className="flex flex-1 grow-0 items-center justify-end">
					  <Button 
							className="normal-case"
							variant="contained"
                            color="secondary"
							component="a" 
							href="https://mui.com/components/button-group" 
							target="_blank"
							role="button"
							startIcon={<FuseSvgIcon>heroicons-outline:external-link</FuseSvgIcon>}
							>
							Reference
						</Button>
					</div>
                     <Typography className="text-40 my-16 font-700" component="h1">Button Group</Typography>
<Typography className="description">The ButtonGroup component can be used to group related buttons.</Typography>



<Typography className="text-32 mt-40 mb-10 font-700" component="h2">Basic button group</Typography>
<Typography className="mb-40" component="div">The buttons can be grouped by wrapping them with the <code>{`ButtonGroup`}</code> component.
They need to be immediate children.</Typography>
<Typography className="mb-40" component="div"><FuseExample
                    name="BasicButtonGroup.js"
                    className="my-24"
                    iframe={false}
                    component={require('../components/button-group/BasicButtonGroup.tsx').default} 
                    raw={require('!raw-loader!../components/button-group/BasicButtonGroup.tsx')}
                    /></Typography>
<Typography className="text-32 mt-40 mb-10 font-700" component="h2">Button variants</Typography>
<Typography className="mb-40" component="div">All the standard button variants are supported.</Typography>
<Typography className="mb-40" component="div"><FuseExample
                    name="VariantButtonGroup.js"
                    className="my-24"
                    iframe={false}
                    component={require('../components/button-group/VariantButtonGroup.tsx').default} 
                    raw={require('!raw-loader!../components/button-group/VariantButtonGroup.tsx')}
                    /></Typography>
<Typography className="text-32 mt-40 mb-10 font-700" component="h2">Sizes and colors</Typography>
<Typography className="mb-40" component="div">The <code>{`size`}</code> and <code>{`color`}</code> props can be used to control the appearance of the button group.</Typography>
<Typography className="mb-40" component="div"><FuseExample
                    name="GroupSizesColors.js"
                    className="my-24"
                    iframe={false}
                    component={require('../components/button-group/GroupSizesColors.tsx').default} 
                    raw={require('!raw-loader!../components/button-group/GroupSizesColors.tsx')}
                    /></Typography>
<Typography className="text-32 mt-40 mb-10 font-700" component="h2">Vertical group</Typography>
<Typography className="mb-40" component="div">The button group can be displayed vertically using the <code>{`orientation`}</code> prop.</Typography>
<Typography className="mb-40" component="div"><FuseExample
                    name="GroupOrientation.js"
                    className="my-24"
                    iframe={false}
                    component={require('../components/button-group/GroupOrientation.tsx').default} 
                    raw={require('!raw-loader!../components/button-group/GroupOrientation.tsx')}
                    /></Typography>
<Typography className="text-32 mt-40 mb-10 font-700" component="h2">Split button</Typography>
<Typography className="mb-40" component="div"><code>{`ButtonGroup`}</code> can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.</Typography>
<Typography className="mb-40" component="div"><FuseExample
                    name="SplitButton.js"
                    className="my-24"
                    iframe={false}
                    component={require('../components/button-group/SplitButton.tsx').default} 
                    raw={require('!raw-loader!../components/button-group/SplitButton.tsx')}
                    /></Typography>
<Typography className="text-32 mt-40 mb-10 font-700" component="h2">Disabled elevation</Typography>
<Typography className="mb-40" component="div">You can remove the elevation with the <code>{`disableElevation`}</code> prop.</Typography>
<Typography className="mb-40" component="div"><FuseExample
                    name="DisableElevation.js"
                    className="my-24"
                    iframe={false}
                    component={require('../components/button-group/DisableElevation.tsx').default} 
                    raw={require('!raw-loader!../components/button-group/DisableElevation.tsx')}
                    /></Typography>

                </>
    
                     );
                   }
                   
                   export default ButtonGroupDoc;
                   