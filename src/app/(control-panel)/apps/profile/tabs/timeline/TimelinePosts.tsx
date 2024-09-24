import FuseLoading from '@fuse/core/FuseLoading';
import { useGetProfilePostsQuery } from 'src/app/(control-panel)/apps/profile/ProfileApi';
import { motion } from 'framer-motion';
import TimelinePostItem from './TimelinePostItem';

const item = {
	hidden: { opacity: 0, y: 40 },
	show: { opacity: 1, y: 0 }
};

function TimelinePosts() {
	const { data: posts, isLoading } = useGetProfilePostsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	return posts.map((post) => (
		<motion.div
			variants={item}
			key={post.id}
		>
			<TimelinePostItem item={post} />
		</motion.div>
	));
}

export default TimelinePosts;
