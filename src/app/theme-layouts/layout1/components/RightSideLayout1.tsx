import { memo, lazy } from 'react';

const QuickPanel = lazy(() => import('app/theme-layouts/shared-components/quickPanel/QuickPanel'));
const NotificationPanel = lazy(() => import('src/app/main/apps/notifications/NotificationPanel'));

/**
 * The right side layout 1.
 */
function RightSideLayout1() {
	return (
		<>
			<QuickPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout1);
