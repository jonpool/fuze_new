import { useParams } from 'next/navigation';
import _ from 'lodash';
import { useAppSelector } from 'src/store/hooks';
import { useGetFileManagerFolderQuery } from '../FileManagerApi';
import { selectSelectedItemId } from '../fileManagerAppSlice';

function useFileManagerData() {
	const routeParams = useParams<{ folderId: string }>();
	const { folderId } = routeParams;
	const { data, isLoading } = useGetFileManagerFolderQuery(folderId);
	const folders = _.filter(data?.items, { type: 'folder' });
	const files = _.reject(data?.items, { type: 'folder' });

	const selectedItemId = useAppSelector(selectSelectedItemId);
	const selectedItem = _.find(data?.items, { id: selectedItemId });

	return {
		folders,
		files,
		isLoading,
		selectedItem,
		selectedItemId,
		path: data?.path
	};
}

export default useFileManagerData;
