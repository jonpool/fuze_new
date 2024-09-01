import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const CalendarApp = lazy(() => import('./page'));

/**
 * The Calendar App Route.
 */
const CalendarAppRoute: FuseRouteItemType = {
	path: 'apps/calendar',
	element: <CalendarApp />
};

export default CalendarAppRoute;
