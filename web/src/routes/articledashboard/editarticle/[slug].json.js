import * as db from '../../mongoosehelpers';
import { Announcement } from '../../../dbschemas/announcement.js';

export async function get(req,res){
    const {slug} = req.params;
    const posts = await db.queryCollection(Announcement, {_id:slug})
    res.json(posts)
}