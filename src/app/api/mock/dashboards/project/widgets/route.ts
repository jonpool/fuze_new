import mockApi from 'src/@mock-utils/mockApi';
import { ProjectDashboardWidgetType } from '@/app/(control-panel)/dashboards/project/ProjectDashboardApi';

/**
 * GET api/mock/dashboards/project/widgets
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('dashboards_project_widgets');
	const items = await api.findAll<ProjectDashboardWidgetType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
