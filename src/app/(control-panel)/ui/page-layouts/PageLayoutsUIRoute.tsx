import { lazy } from 'react';
import Link from '@fuse/core/Link';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import EmptyExampleComponent from '../../../(public)/documentation/user-interface/page-layouts/empty/EmptyExampleComponent';
import PageLayoutOverview from '../../../(public)/documentation/user-interface/page-layouts/components/PageLayoutOverview';
import SimpleWithSidebarsNormalScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/simple/with-sidebars/normal-scroll/SimpleWithSidebarsNormalScrollComponent';
import SimpleWithSidebarsPageScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/simple/with-sidebars/page-scroll/SimpleWithSidebarsPageScrollComponent';
import SimpleWithSidebarsContentScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/simple/with-sidebars/content-scroll/SimpleWithSidebarsContentScrollComponent';
import SimpleFullWidthNormalScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/simple/full-width/normal-scroll/SimpleFullWidthNormalScrollComponent';
import SimpleFullWidthPageScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/simple/full-width/page-scroll/SimpleFullWidthPageScrollComponent';
import SimpleFullWidthContentScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/simple/full-width/content-scroll/SimpleFullWidthContentScrollComponent';
import CardedFullWidthNormalScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/carded/full-width/normal-scroll/CardedFullWidthNormalScrollComponent';
import CardedFullWidthPageScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/carded/full-width/page-scroll/CardedFullWidthPageScrollComponent';
import CardedFullWidthContentScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/carded/full-width/content-scroll/CardedFullWidthContentScrollComponent';
import CardedWithSidebarsNormalScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/carded/with-sidebars/normal-scroll/CardedWithSidebarsNormalScrollComponent';
import CardedWithSidebarsPageScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/carded/with-sidebars/page-scroll/CardedWithSidebarsPageScrollComponent';
import CardedWithSidebarsContentScrollComponent from '../../../(public)/documentation/user-interface/page-layouts/carded/with-sidebars/content-scroll/CardedWithSidebarsContentScrollComponent';
import overviews from '../../../(public)/documentation/user-interface/page-layouts/constants/overviews';

const OverviewPageLayoutsUI = lazy(
	() => import('../../../(public)/documentation/user-interface/page-layouts/overview/OverviewPageLayoutsUI')
);

/**
 * The UI configuration for the page layouts.
 */
const PageLayoutsUIRoute: FuseRouteItemType = {
	path: 'ui/page-layouts',
	children: [
		{
			path: '',
			element: <Link to="overview" />
		},
		{
			path: 'overview',
			element: <OverviewPageLayoutsUI />
		},
		{
			path: 'empty',
			element: <EmptyExampleComponent />
		},
		{
			path: 'carded',
			children: [
				{
					path: 'full-width',
					children: [
						{
							path: '',
							element: <Link to="overview" />
						},
						{
							path: 'overview',
							element: <PageLayoutOverview layoutOptions={overviews.carded.fullWidth} />
						},
						{
							path: 'normal-scroll',
							element: <CardedFullWidthNormalScrollComponent />
						},
						{
							path: 'page-scroll',
							element: <CardedFullWidthPageScrollComponent />
						},
						{
							path: 'content-scroll',
							element: <CardedFullWidthContentScrollComponent />
						}
					]
				},
				{
					path: 'with-sidebars',
					children: [
						{
							path: '',
							element: <Link to="overview" />
						},
						{
							path: 'overview',
							element: <PageLayoutOverview layoutOptions={overviews.carded.withSidebars} />
						},
						{
							path: 'normal-scroll',
							element: <CardedWithSidebarsNormalScrollComponent />
						},
						{
							path: 'page-scroll',
							element: <CardedWithSidebarsPageScrollComponent />
						},
						{
							path: 'content-scroll',
							element: <CardedWithSidebarsContentScrollComponent />
						}
					]
				}
			]
		},
		{
			path: 'simple',
			children: [
				{
					path: 'full-width',
					children: [
						{
							path: '',
							element: <Link to="overview" />
						},
						{
							path: 'overview',
							element: <PageLayoutOverview layoutOptions={overviews.simple.fullWidth} />
						},
						{
							path: 'normal-scroll',
							element: <SimpleFullWidthNormalScrollComponent />
						},
						{
							path: 'page-scroll',
							element: <SimpleFullWidthPageScrollComponent />
						},
						{
							path: 'content-scroll',
							element: <SimpleFullWidthContentScrollComponent />
						}
					]
				},
				{
					path: 'with-sidebars',
					children: [
						{
							path: '',
							element: <Link to="overview" />
						},
						{
							path: 'overview',
							element: <PageLayoutOverview layoutOptions={overviews.simple.withSidebars} />
						},
						{
							path: 'normal-scroll',
							element: <SimpleWithSidebarsNormalScrollComponent />
						},
						{
							path: 'page-scroll',
							element: <SimpleWithSidebarsPageScrollComponent />
						},
						{
							path: 'content-scroll',
							element: <SimpleWithSidebarsContentScrollComponent />
						}
					]
				}
			]
		}
	]
};

export default PageLayoutsUIRoute;
