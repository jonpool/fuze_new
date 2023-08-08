import { FuseNavComponentProps } from '@fuse/core/FuseNavigation/index';
import { FC } from 'react';

const components: { [key: string]: FC<FuseNavComponentProps> } = {};

export function registerComponent(name: string, Component: React.FC) {
	components[name] = Component;
}

export default function FuseNavItem(props: FuseNavComponentProps) {
	const { type } = props;
	const C = components[type];
	return C ? <C {...props} /> : null;
}
