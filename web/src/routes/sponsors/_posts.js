// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import * as db from '../mongoosehelpers';
import { Announcement } from '../../dbschemas/announcement.js';

const posts = async (collection, query) => {
	const response = await db.queryCollection(collection, query);
	return JSON.stringify(response);
};

export default posts;
