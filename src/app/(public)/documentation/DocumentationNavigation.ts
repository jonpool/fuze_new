import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import FuseComponentsNavigation from './fuse-components/FuseComponentsNavigation';
import MaterialUIComponentsNavigation from './material-ui-components/MaterialUIComponentsNavigation';
import ThirdPartyComponentsNavigation from './third-party-components/ThirdPartyComponentsNavigation';
import fuseReactLatestVersion from './changelog/constants/fuseReactLatestVersion';
import { authRoles } from '../../../auth';

/**
 * Documentation Navigation
 */
const DocumentationNavigation: FuseNavItemType = {
	id: 'documentation',
	title: 'Documentation',
	subtitle: 'Everything you need to know about Fuse',
	icon: 'heroicons-outline:book-open',
	type: 'group',
	children: [
		{
			id: 'changelog',
			title: 'Changelog',
			type: 'item',
			icon: 'heroicons-outline:megaphone',
			url: '/documentation/changelog',
			badge: {
				title: fuseReactLatestVersion,
				bg: 'rgb(236, 12, 142)',
				fg: '#FFFFFF'
			}
		},
		{
			id: 'getting-started',
			title: 'Getting Started',
			type: 'group',
			icon: 'play_arrow',
			children: [
				{
					id: 'introduction-doc',
					title: 'Introduction',
					type: 'item',
					icon: 'heroicons-outline:play',
					url: '/documentation/getting-started/introduction'
				},
				{
					id: 'git-repository-doc',
					title: 'Git Repository',
					type: 'item',
					icon: 'heroicons-outline:folder-open',
					url: '/documentation/getting-started/git-repository'
				}
			]
		},
		{
			id: 'development-guide',
			title: 'Development Guide',
			type: 'group',
			icon: 'developer_board',
			children: [
				{
					id: 'installation-doc',
					title: 'Installation',
					type: 'item',
					icon: 'heroicons-outline:code-bracket-square',
					url: '/documentation/getting-started/installation'
				},
				{
					id: 'development-server-doc',
					title: 'Development Server',
					type: 'item',
					icon: 'heroicons-outline:server',
					url: '/documentation/development/development-server'
				},
				{
					id: 'production-doc',
					title: 'Production Build',
					type: 'item',
					icon: 'heroicons-outline:bolt',
					url: '/documentation/development/production'
				},
				{
					id: 'deployment-doc',
					title: 'Deployment',
					type: 'item',
					icon: 'heroicons-outline:paper-airplane',
					url: '/documentation/development/deployment'
				},
				{
					id: 'directory-structure-doc',
					title: 'Directory Structure',
					type: 'item',
					icon: 'heroicons-outline:folder',
					url: '/documentation/development/directory-structure'
				},
				{
					id: 'api-integration-doc',
					title: 'API Integration',
					type: 'item',
					icon: 'heroicons-outline:cloud',
					url: '/documentation/development/api-integration'
				},
				{
					id: 'mock-api-doc',
					title: 'Mock API Documentation',
					type: 'item',
					icon: 'heroicons-outline:document-text',
					url: '/documentation/mock-api'
				},
				{
					id: 'fuse-react-code-splitting-doc',
					title: 'Code Splitting',
					type: 'item',
					icon: 'heroicons-outline:scissors',
					url: '/documentation/development/code-splitting'
				},
				{
					id: 'fuse-react-multi-language-doc',
					title: 'Localization (Multi-Language)',
					type: 'item',
					icon: 'heroicons-outline:globe-alt',
					url: '/documentation/development/multi-language'
				},
				{
					id: 'updating-fuse-react-doc',
					title: 'Updating Guide',
					type: 'item',
					icon: 'heroicons-outline:chevron-double-up',
					url: '/documentation/development/updating-fuse-react'
				},
				{
					id: 'ts-file-remaming-migration-doc',
					title: 'Typescript Migration',
					type: 'item',
					icon: 'heroicons-outline:document-text',
					url: '/documentation/development/ts-file-rename-migration'
				},
				{
					id: 'fuse-react-ides-vscode-webstorm-doc',
					title: 'IDE Configuration',
					type: 'item',
					icon: 'heroicons-outline:code-bracket',
					url: '/documentation/development/ides-vscode-webstorm'
				}
			]
		},
		{
			id: 'configuration',
			title: 'Configuration',
			type: 'group',
			icon: 'settings',
			children: [
				{
					id: 'default-settings-doc',
					title: 'Default Settings',
					type: 'item',
					icon: 'heroicons-outline:cog',
					url: '/documentation/configuration/settings'
				},
				{
					id: 'fuse-react-routing-doc',
					title: 'Routing',
					type: 'item',
					icon: 'heroicons-outline:map',
					url: '/documentation/configuration/routing'
				},
				{
					id: 'fuse-react-navigation-doc',
					title: 'Navigation',
					type: 'item',
					icon: 'heroicons-outline:queue-list',
					url: '/documentation/configuration/navigation'
				}
			]
		},
		{
			id: 'user-interface',
			title: 'User Interface',
			type: 'group',
			icon: 'palette',
			children: [
				{
					id: 'theme-schemes-doc',
					title: 'Theme Schemes',
					type: 'item',
					icon: 'heroicons-outline:swatch',
					url: '/documentation/theming/theme-schemes'
				},
				{
					id: 'theme-layouts-doc',
					title: 'Theme Layouts',
					type: 'item',
					icon: 'heroicons-outline:square-3-stack-3d',
					url: '/documentation/theming/theme-layouts'
				},
				{
					id: 'page-layouts-doc',
					title: 'Page Layouts',
					type: 'item',
					icon: 'heroicons-outline:rectangle-group',
					url: '/documentation/theming/page-layouts'
				},
				{
					id: 'user-interface.page-layouts',
					title: 'Page Layouts',
					type: 'collapse',
					icon: 'heroicons-outline:rectangle-group',
					children: [
						{
							id: 'user-interface.page-layouts.overview',
							title: 'Overview',
							type: 'item',
							url: '/ui/page-layouts/overview'
						},
						{
							id: 'user-interface.page-layouts.carded',
							title: 'Carded',
							type: 'collapse',
							children: [
								{
									id: 'user-interface.page-layouts.carded.full-width',
									title: 'Full Width',
									type: 'collapse',
									url: '/ui/page-layouts/carded/full-width',
									children: [
										{
											id: 'user-interface.page-layouts.carded.full-width.overview',
											title: 'Full Width Overview',
											type: 'item',
											url: '/ui/page-layouts/carded/full-width/overview'
										},
										{
											id: 'user-interface.page-layouts.carded.full-width.normal-scroll',
											title: 'Full Width Normal Scroll',
											type: 'item',
											url: '/ui/page-layouts/carded/full-width/normal-scroll'
										},
										{
											id: 'user-interface.page-layouts.carded.full-width.page-scroll',
											title: 'Full Width Page Scroll',
											type: 'item',
											url: '/ui/page-layouts/carded/full-width/page-scroll'
										},
										{
											id: 'user-interface.page-layouts.carded.full-width.content-scroll',
											title: 'Full Width Content Scroll',
											type: 'item',
											url: '/ui/page-layouts/carded/full-width/content-scroll'
										}
									]
								},
								{
									id: 'user-interface.page-layouts.carded.with-sidebars',
									title: 'With Sidebars',
									type: 'collapse',
									url: '/ui/page-layouts/carded/with-sidebars',
									children: [
										{
											id: 'user-interface.page-layouts.carded.with-sidebars.overview',
											title: 'With Sidebars Overview',
											type: 'item',
											url: '/ui/page-layouts/carded/with-sidebars/overview'
										},
										{
											id: 'user-interface.page-layouts.carded.with-sidebars.normal-scroll',
											title: 'With Sidebars Normal Scroll',
											type: 'item',
											url: '/ui/page-layouts/carded/with-sidebars/normal-scroll'
										},
										{
											id: 'user-interface.page-layouts.carded.with-sidebars.page-scroll',
											title: 'With Sidebars Page Scroll',
											type: 'item',
											url: '/ui/page-layouts/carded/with-sidebars/page-scroll'
										},
										{
											id: 'user-interface.page-layouts.carded.with-sidebars.content-scroll',
											title: 'With Sidebars Content Scroll',
											type: 'item',
											url: '/ui/page-layouts/carded/with-sidebars/content-scroll'
										}
									]
								}
							]
						},
						{
							id: 'user-interface.page-layouts.simple',
							title: 'Simple',
							type: 'collapse',
							children: [
								{
									id: 'user-interface.page-layouts.simple.full-width',
									title: 'Full Width',
									type: 'collapse',
									url: '/ui/page-layouts/simple/full-width',
									children: [
										{
											id: 'user-interface.page-layouts.simple.full-width.overview',
											title: 'Full Width Overview',
											type: 'item',
											url: '/ui/page-layouts/simple/full-width/overview'
										},
										{
											id: 'user-interface.page-layouts.simple.full-width.normal-scroll',
											title: 'Full Width Normal Scroll',
											type: 'item',
											url: '/ui/page-layouts/simple/full-width/normal-scroll'
										},
										{
											id: 'user-interface.page-layouts.simple.full-width.page-scroll',
											title: 'Full Width Page Scroll',
											type: 'item',
											url: '/ui/page-layouts/simple/full-width/page-scroll'
										},
										{
											id: 'user-interface.page-layouts.simple.full-width.content-scroll',
											title: 'Full Width Content Scroll',
											type: 'item',
											url: '/ui/page-layouts/simple/full-width/content-scroll'
										}
									]
								},
								{
									id: 'user-interface.page-layouts.simple.with-sidebars',
									title: 'With Sidebars',
									type: 'collapse',
									url: '/ui/page-layouts/simple/with-sidebars',
									children: [
										{
											id: 'user-interface.page-layouts.simple.with-sidebars.overview',
											title: 'With Sidebars Overview',
											type: 'item',
											url: '/ui/page-layouts/simple/with-sidebars/overview'
										},
										{
											id: 'user-interface.page-layouts.simple.with-sidebars.normal-scroll',
											title: 'With Sidebars Normal Scroll',
											type: 'item',
											url: '/ui/page-layouts/simple/with-sidebars/normal-scroll'
										},
										{
											id: 'user-interface.page-layouts.simple.with-sidebars.page-scroll',
											title: 'With Sidebars Page Scroll',
											type: 'item',
											url: '/ui/page-layouts/simple/with-sidebars/page-scroll'
										},
										{
											id: 'user-interface.page-layouts.simple.with-sidebars.content-scroll',
											title: 'With Sidebars Content Scroll',
											type: 'item',
											url: '/ui/page-layouts/simple/with-sidebars/content-scroll'
										}
									]
								}
							]
						},
						{
							id: 'user-interface.page-layouts.empty',
							title: 'Empty Page',
							type: 'item',
							url: '/ui/page-layouts/empty'
						}
					]
				},
				{
					id: 'user-interface.icons',
					title: 'Icons',
					type: 'collapse',
					icon: 'heroicons-outline:bolt',
					url: '/ui/icons',
					children: [
						{
							id: 'user-interface.icons.heroicons-outline',
							title: 'Heroicons Outline',
							type: 'item',
							url: '/ui/icons/heroicons/outline'
						},
						{
							id: 'user-interface.icons.heroicons-solid',
							title: 'Heroicons Solid',
							type: 'item',
							url: '/ui/icons/heroicons/solid'
						},
						{
							id: 'user-interface.icons.material-twotone',
							title: 'Material Twotone',
							type: 'item',
							url: '/ui/icons/material/twotone'
						},
						{
							id: 'user-interface.icons.material-outline',
							title: 'Material Outline',
							type: 'item',
							url: '/ui/icons/material/outline'
						},
						{
							id: 'user-interface.icons.material-solid',
							title: 'Material Solid',
							type: 'item',
							url: '/ui/icons/material/solid'
						},
						{
							id: 'user-interface.icons.feather',
							title: 'Feather',
							type: 'item',
							url: '/ui/icons/feather'
						}
					]
				},
				{
					id: 'user-interface.tailwindcss',
					title: 'TailwindCSS',
					type: 'item',
					icon: 'heroicons-outline:sparkles',
					url: '/ui/tailwindcss'
				},
				{
					id: 'user-interface.typography',
					title: 'Typography',
					type: 'item',
					icon: 'heroicons-outline:pencil',
					url: '/ui/typography'
				},
				{
					id: 'changing-default-font-doc',
					title: 'Changing Default Font',
					type: 'item',
					icon: 'heroicons-outline:italic',
					url: '/documentation/theming/changing-default-font'
				},
				{
					id: 'rtl-doc',
					title: 'RTL Support',
					type: 'item',
					icon: 'heroicons-outline:language',
					url: '/documentation/theming/rtl-support'
				}
			]
		},

		{
			id: 'authentication-authorization',
			title: 'Authentication & Authorization',
			subtitle: 'User roles and permissions',
			type: 'group',
			icon: 'heroicons-outline:square-3-stack-3d',
			children: [
				{
					id: 'authentication',
					title: 'Authentication',
					type: 'item',
					icon: 'verified_user',
					url: '/documentation/authentication'
				},
				{
					id: 'authorization',
					title: 'Authorization',
					type: 'item',
					icon: 'verified_user',
					url: '/documentation/fuse-components/fuse-authorization'
				},
				{
					id: 'auth',
					title: 'Auth',
					type: 'collapse',
					icon: 'heroicons-outline:shield-check',
					children: [
						{
							id: 'sign-in',
							title: 'Sign in',
							type: 'item',
							url: '/sign-in',
							auth: authRoles.onlyGuest,
							icon: 'lock'
						},
						{
							id: 'register',
							title: 'Register',
							type: 'item',
							url: '/register',
							auth: authRoles.onlyGuest,
							icon: 'person_add'
						},
						{
							id: 'sign-out',
							title: 'Sign out',
							type: 'item',
							auth: authRoles.user,
							url: '/sign-out',
							icon: 'exit_to_app'
						},
						{
							id: 'auth-admin-example',
							title: 'Admin: Auth protected page',
							type: 'item',
							url: '/auth/admin-role-example',
							icon: 'security'
						},
						{
							id: 'only-admin-navigation-item',
							title: 'Nav item only for Admin',
							type: 'item',
							auth: authRoles.admin,
							url: '/auth/admin-role-example',
							icon: 'verified_user'
						},
						{
							id: 'auth-staff-example',
							title: 'Staff: Auth protected page',
							type: 'item',
							url: '/auth/staff-role-example',
							icon: 'security'
						},
						{
							id: 'only-staff-navigation-item',
							title: 'Nav item only for Staff',
							type: 'item',
							auth: authRoles.staff,
							url: '/auth/staff-role-example',
							icon: 'verified_user'
						},
						{
							id: 'auth-guest-example',
							title: 'Guest: Auth protected page',
							type: 'item',
							url: '/auth/guest-role-example',
							icon: 'security'
						},
						{
							id: 'only-guest-navigation-item',
							title: 'Nav item only for Guest',
							type: 'item',
							auth: authRoles.onlyGuest,
							url: '/auth/guest-role-example',
							icon: 'verified_user'
						}
					]
				}
			]
		},
		{
			id: 'components',
			title: 'Components',
			type: 'group',
			icon: 'heroicons-outline:collection',
			children: [FuseComponentsNavigation, MaterialUIComponentsNavigation, ThirdPartyComponentsNavigation]
		},
		{
			type: 'divider',
			id: 'divider-2'
		},
		{
			id: 'navigation-features',
			title: 'Navigation features',
			subtitle: 'Collapsable levels & badge styles',
			type: 'group',
			icon: 'heroicons-outline:bars-3',
			children: [
				{
					id: 'navigation-features.level.0',
					title: 'Level 0',
					icon: 'heroicons-outline:check-circle',
					type: 'collapse',
					children: [
						{
							id: 'navigation-features.level.0.1',
							title: 'Level 1',
							type: 'collapse',
							children: [
								{
									id: 'navigation-features.level.0.1.2',
									title: 'Level 2',
									type: 'collapse',
									children: [
										{
											id: 'navigation-features.level.0.1.2.3',
											title: 'Level 3',
											type: 'collapse',
											children: [
												{
													id: 'navigation-features.level.0.1.2.3.4',
													title: 'Level 4',
													type: 'collapse',
													children: [
														{
															id: 'navigation-features.level.0.1.2.3.4.5',
															title: 'Level 5',
															type: 'collapse',
															children: [
																{
																	id: 'navigation-features.level.0.1.2.3.4.5.6',
																	title: 'Level 6',
																	type: 'item'
																}
															]
														}
													]
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'navigation-features2.level.0',
					title: 'Level 0',
					subtitle: 'With subtitle',
					icon: 'heroicons-outline:check-circle',
					type: 'collapse',
					children: [
						{
							id: 'navigation-features2.level.0.1-1',
							title: 'Level 1.1',
							type: 'item'
						},
						{
							id: 'navigation-features2.level.0.1-2',
							title: 'Level 1.2',
							type: 'item'
						}
					]
				},
				{
					id: 'navigation-features.active',
					title: 'Active item',
					subtitle: 'Manually marked as active',
					icon: 'heroicons-outline:check-circle',
					type: 'item',
					active: true
				},
				{
					id: 'navigation-features.disabled-collapse',
					title: 'Disabled collapse',
					subtitle: 'Some subtitle',
					icon: 'heroicons-outline:check-circle',
					type: 'collapse',
					disabled: true,
					children: [
						{
							id: 'navigation-features.disabled-collapse.child',
							title: "You shouldn't be able to see this child",
							type: 'item'
						}
					]
				},
				{
					id: 'navigation-features.disabled-item',
					title: 'Disabled item',
					subtitle: 'Some subtitle',
					icon: 'heroicons-outline:check-circle',
					type: 'item',
					disabled: true
				},
				{
					id: 'navigation-features.badge-style-oval',
					title: 'Oval badge',
					icon: 'heroicons-outline:tag',
					type: 'item',
					badge: {
						title: '8',
						classes: 'w-20 h-20 bg-teal-400 text-black rounded-full'
					}
				},
				{
					id: 'navigation-features.badge-style-rectangle',
					title: 'Rectangle badge',
					icon: 'heroicons-outline:tag',
					type: 'item',
					badge: {
						title: 'Updated!',
						classes: 'px-8 bg-teal-400 text-black rounded'
					}
				},
				{
					id: 'navigation-features.badge-style-rounded',
					title: 'Rounded badge',
					icon: 'heroicons-outline:tag',
					type: 'item',
					badge: {
						title: 'NEW',
						classes: 'px-10 bg-teal-400 text-black rounded-full'
					}
				},
				{
					id: 'navigation-features.badge-style-simple',
					title: 'Simple badge',
					icon: 'heroicons-outline:tag',
					type: 'item',
					badge: {
						title: '87 Unread',
						classes: 'bg-transparent text-teal-500'
					}
				}
			]
		}
	]
};

export default DocumentationNavigation;
