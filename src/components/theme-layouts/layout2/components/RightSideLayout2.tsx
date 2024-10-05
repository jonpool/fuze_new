import { lazy, memo, Suspense } from 'react';

const QuickPanel = lazy(() => import('src/components/theme-layouts/components/quickPanel/QuickPanel'));
const MessengerPanel = lazy(() => import('src/app/(control-panel)/apps/messenger/messengerPanel/MessengerPanel'));
const NotificationPanel = lazy(() => import('src/app/(control-panel)/apps/notifications/NotificationPanel'));

/**
 * The right side layout 2.
 */
function RightSideLayout2() {
	return (
		<Suspense>
			<QuickPanel />

			<MessengerPanel />

			<NotificationPanel />
		</Suspense>
	);
}

export default memo(RightSideLayout2);