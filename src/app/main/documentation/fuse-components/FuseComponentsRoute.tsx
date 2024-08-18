import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { Navigate } from 'react-router-dom';
import DocumentationPageLayout from '../DocumentationPageLayout';

const FuseThemeDoc = lazy(() => import('./fuse-theme/FuseThemeDoc'));
const FuseAuthorizationDoc = lazy(() => import('./fuse-authorization/FuseAuthorizationDoc'));
const FuseLayoutDoc = lazy(() => import('./fuse-layout/FuseLayoutDoc'));
const FusePageCardedDoc = lazy(() => import('./fuse-page-carded/FusePageCardedDoc'));
const FusePageSimpleDoc = lazy(() => import('./fuse-page-simple/FusePageSimpleDoc'));
const FuseScrollbarsDoc = lazy(() => import('./fuse-scrollbars/FuseScrollbarsDoc'));
const FuseHighlightDoc = lazy(() => import('./fuse-highlight/FuseHighlightDoc'));
const FuseCountdownDoc = lazy(() => import('./fuse-countdown/FuseCountdownDoc'));
const FuseNavigationDoc = lazy(() => import('./fuse-navigation/FuseNavigationDoc'));
const FuseMessageDoc = lazy(() => import('./fuse-message/FuseMessageDoc'));
const FuseDialogDoc = lazy(() => import('./fuse-dialog/FuseDialogDoc'));

/**
 * Fuse Components Route
 */
const FuseComponentsRoute: FuseRouteItemType = {
	path: 'documentation/fuse-components',
	element: <DocumentationPageLayout />,
	children: [
		{
			path: '',
			element: <Navigate to="fuse-theme" />
		},
		{
			path: 'fuse-theme',
			element: <FuseThemeDoc />
		},
		{
			path: 'fuse-authorization',
			element: <FuseAuthorizationDoc />
		},
		{
			path: 'fuse-layout',
			element: <FuseLayoutDoc />
		},
		{
			path: 'fuse-page-carded',
			element: <FusePageCardedDoc />
		},
		{
			path: 'fuse-page-simple',
			element: <FusePageSimpleDoc />
		},
		{
			path: 'fuse-scrollbars',
			element: <FuseScrollbarsDoc />
		},
		{
			path: 'fuse-highlight',
			element: <FuseHighlightDoc />
		},
		{
			path: 'fuse-countdown',
			element: <FuseCountdownDoc />
		},
		{
			path: 'fuse-navigation',
			element: <FuseNavigationDoc />
		},
		{
			path: 'fuse-message',
			element: <FuseMessageDoc />
		},
		{
			path: 'fuse-dialog',
			element: <FuseDialogDoc />
		}
	]
};

export default FuseComponentsRoute;
