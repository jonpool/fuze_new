import { redirect } from 'next/navigation';

function MainPage() {
	redirect(`/dashboards/analytics`);
	return null;
}

export default MainPage;
