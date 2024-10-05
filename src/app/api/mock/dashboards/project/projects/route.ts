import mockApi from 'src/@mock-utils/mockApi';
import { ProjectType } from '@/app/(control-panel)/dashboards/project/ProjectDashboardApi';

/**
 * GET api/mock/dashboards/project/projects
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('dashboards_project_projects');
	const items = await api.findAll<ProjectType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
