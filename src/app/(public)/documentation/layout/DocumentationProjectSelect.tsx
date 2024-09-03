import React from 'react';
import { MenuItem, Select, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

type ProjectOption = {
	value: string;
	logo: string;
	name: string;
	url: string;
};

const projectOptions: ProjectOption[] = [
	{
		value: 'Vitejs',
		logo: '/assets/images/logo/vite.svg',
		name: 'Vitejs',
		url: 'https://react-material.fusetheme.com/documentation'
	},
	{
		value: 'Nextjs',
		logo: '/assets/images/logo/nextjs.svg',
		name: 'Nextjs',
		url: 'https://react-material.fusetheme.com/documentation'
	}
];

function DocumentationProjectSelect() {
	const [selectedProjectValue, setSelectedProject] = React.useState<string>(projectOptions[1].value);
	const selectedProject = projectOptions.find((project) => project.value === selectedProjectValue);
	const router = useRouter();

	const handleMenuItemClick = (projectValue: string) => {
		setSelectedProject(projectValue);

		const selectedProjectUrl = projectOptions.find((project) => project.value === projectValue)?.url;

		if (selectedProjectUrl) {
			router.push(selectedProjectUrl);
		}
	};

	return (
		<div>
			<Select
				value={selectedProjectValue}
				onChange={(event) => handleMenuItemClick(event.target.value)}
				displayEmpty
				renderValue={(_selectedValue) => (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img
							src={selectedProject.logo}
							alt={`${selectedProject.name} Logo`}
							width={20}
							height={20}
							style={{ marginRight: 8 }}
						/>
						<Typography className="text-md font-semibold">{selectedProject.name}</Typography>
					</div>
				)}
				size="small"
			>
				{projectOptions.map((project) => (
					<MenuItem
						key={project.value}
						value={project.value}
					>
						<ListItemIcon>
							<img
								src={project.logo}
								alt={`${project.name} Logo`}
								width={20}
								height={20}
							/>
						</ListItemIcon>
						<ListItemText
							primary={project.name}
							classes={{ primary: 'text-md font-semibold' }}
						/>
					</MenuItem>
				))}
			</Select>
		</div>
	);
}

export default DocumentationProjectSelect;
