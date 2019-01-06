import React from 'react';
import {Typography} from '@material-ui/core';
import {FusePageSimple} from '@fuse';
import {Link} from 'react-router-dom';

const JwtAuthDoc = () => {
    return (
        <FusePageSimple
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <Typography variant="h6">JWT Authentication</Typography>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl mx-auto">

                    <Typography className="mb-16" component="p">
                        With JWT Authentication in Fuse React.
                    </Typography>

                    <ul>
                        <li className="mb-12">
                            You can <Link to="/register">register</Link>.
                        </li>
                        <li className="mb-12">
                            You can <Link to="/login">login</Link>.
                        </li>
                        <li className="mb-12">
                            Also saves user data (user shortcuts, layout and theme settings) to db.
                        </li>
                    </ul>

                    <Typography className="mt-32 mb-16" component="p">
                        Related Service folder is located at <code>/src/jwtService</code>
                    </Typography>

                    <Typography className="my-24 italic" component="p" color="textSecondary">
                        Note: Make sure {`<Router>`} component wrapped with {`<Auth>`} component in 'index.js'.
                    </Typography>

                    <Typography className="my-24 italic" component="p" color="textSecondary">
                        Important: We don't give you any backend code. We are demonstrating the usage with fake-db(which is works with https requests as real).
                    </Typography>

                </div>
            }
        />
    );
};

export default JwtAuthDoc;
