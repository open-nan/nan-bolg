import rss from '@astrojs/rss';
import { allPageList } from '@nan-pack/note';
import { toPageURl } from '../utils/file-utils';


export async function GET(context) {
	return rss({
		title: 'NAN Blog',
		description: 'Welcome to my website!',
		site: context.site,
		items: allPageList.map((path) => {
			return {
				pubDate: new Date(),
				link: toPageURl(path, '/post'),
			 }
		}),
	})
}
