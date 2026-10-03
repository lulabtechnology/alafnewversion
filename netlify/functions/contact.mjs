import { handleContact } from '../../server/contact.mjs';
export default async (request,context) => handleContact(request,{ip:context.ip||'unknown'});
export const config={path:'/api/contact'};
