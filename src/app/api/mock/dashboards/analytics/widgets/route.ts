import mockApi from 'src/@mock-utils/mockApi';
import { AnalyticsDashboardWidgetType } from '@/app/(control-panel)/dashboards/analytics/AnalyticsDashboardApi';

/**
 * GET api/mock/dashboards/analytics/widgets
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('dashboards_analytics_widgets');
	const items = await api.findAll<AnalyticsDashboardWidgetType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
