import { lazy, memo } from 'react';

const QuickPanel = lazy(() => import('app/theme-layouts/shared-components/quickPanel/QuickPanel'));
const NotificationPanel = lazy(() => import('src/app/main/apps/notifications/NotificationPanel'));

/**
 * The right side layout 3.
 */
function RightSideLayout3() {
	return (
		<>
			<QuickPanel />

			<NotificationPanel />
		</>
	);
}

export default memo(RightSideLayout3);
