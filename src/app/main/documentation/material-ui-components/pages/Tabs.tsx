import FuseExample from '@fuse/core/FuseExample';
                   import FuseHighlight from '@fuse/core/FuseHighlight';
                   import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
                   import Button from '@mui/material/Button';
                   import Icon from '@mui/material/Icon';
                   import Typography from '@mui/material/Typography';
                  
                   function TabsDoc(props) {
                     return (
                       
                <>
					<div className="flex flex-1 grow-0 items-center justify-end">
					  <Button 
							className="normal-case"
							variant="contained"
                            color="secondary"
							component="a" 
							href="https://mui.com/components/tabs" 
							target="_blank"
							role="button"
							startIcon={<FuseSvgIcon>heroicons-outline:external-link</FuseSvgIcon>}
							>
							Reference
						</Button>
					</div>
                     <Typography className="text-40 my-16 font-700" component="h1">Tabs</Typography>
<Typography className="description">Tabs make it easy to explore and switch between different views.</Typography>

<Typography className="mb-40" component="div">Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.</Typography>
<Typography className="text-32 mt-40 mb-10 font-700" component="h2">Basic tabs</Typography>
<Typography className="mb-40" component="div">A basic example with tab panels.</Typography>
<Typography className="mb-40" component="div"><FuseExample
                    name="BasicTabs.js"
                    className="my-24"
                    iframe={false}
                    component={require('../components/tabs/BasicTabs.tsx').default} 
                    raw={require('!raw-loader!../components/tabs/BasicTabs.tsx')}
                    /></Typography>

                </>
    
                     );
                   }
                   
                   export default TabsDoc;
                   