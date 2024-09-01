import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const AcademyApp = lazy(() => import('./AcademyApp'));
const Course = lazy(() => import('./courses/[...course]/page'));
const Courses = lazy(() => import('./courses/page'));

/**
 * The Academy app routes.
 */
const AcademyAppConfig: FuseRouteItemType = {
	path: 'apps/academy',
	element: <AcademyApp />,
	children: [
		{
			path: '',
			element: <Navigate href="/apps/academy/courses" />
		},
		{
			path: 'courses/:courseId/*',
			element: <Course />
		},
		{
			path: 'courses',
			element: <Courses />
		}
	]
};

export default AcademyAppConfig;
