import { useParams } from 'next/navigation';
import { useGetMailboxMailsQuery } from '../MailboxApi';

function useGetMails() {
	const { mailParams } = useParams<{ mailParams: string[] }>();
	const [category, subCategory] = mailParams;

	return useGetMailboxMailsQuery({ category, subCategory });
}

export default useGetMails;
