import { useAppSelector } from 'src/store/hooks';
import { useMemo } from 'react';
import i18next from 'i18next';
import { selectNavigationAll } from '../store/navigationSlice';
import FuseNavigationHelper from '@/@fuse/utils/FuseNavigationHelper';
import useUser from '@/auth/useUser';
import { selectCurrentLanguageId } from '@/store/i18nSlice';
import { FuseNavItemType } from '@/@fuse/core/FuseNavigation/types/FuseNavItemType';
import FuseUtils from '@/@fuse/utils';

function useNavigation() {
	const { data: user } = useUser();
	const userRole = user?.role;
	const currentLanguageId = useAppSelector(selectCurrentLanguageId);
	const navigationData = useAppSelector(selectNavigationAll);

	const navigation = useMemo(() => {
		const _navigation = FuseNavigationHelper.unflattenNavigation(navigationData);

		function setAdditionalData(data: FuseNavItemType[]): FuseNavItemType[] {
			return data?.map((item) => ({
				hasPermission: Boolean(FuseUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18next.t(`navigation:${item?.translate}`) } : {}),
				...(item?.children ? { children: setAdditionalData(item?.children) } : {})
			}));
		}

		const translatedValues = setAdditionalData(_navigation);

		return translatedValues;
	}, [navigationData, currentLanguageId]);

	const flattenNavigation = useMemo(() => {
		return FuseNavigationHelper.flattenNavigation(navigation);
	}, [navigation]);

	return { navigation, flattenNavigation };
}

export default useNavigation;
