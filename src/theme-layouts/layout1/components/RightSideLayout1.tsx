import { lazy, memo, Suspense } from 'react';

const QuickPanel = lazy(() => import('src/theme-layouts/shared-components/quickPanel/QuickPanel'));
const MessengerPanel = lazy(() => import('src/app/(control-panel)/apps/messenger/messengerPanel/MessengerPanel'));
const NotificationPanel = lazy(() => import('src/app/(control-panel)/apps/notifications/NotificationPanel'));

/**
 * The right side layout 1.
 */
function RightSideLayout1() {
	return (
		<Suspense>
			<QuickPanel />

			<MessengerPanel />

			<NotificationPanel />
		</Suspense>
	);
}

export default memo(RightSideLayout1);
