import cloneDeep from 'lodash.clonedeep';
import { objectToFormData } from 'object-to-formdata';

export default (data, { noOverwrite, toJSON } = {}) => {
  data = cloneDeep(data);

  Object.keys(data).forEach((d) => {
    if (noOverwrite && noOverwrite.indexOf(d) !== -1) return;
    if (toJSON && toJSON.indexOf(d) !== -1 && data[d]) data[d] = JSON.stringify(data[d]);

    // Transform empty array into empty string (M Relationships)
    if (Array.isArray(data[d]) && !data[d].length) data[d] = '';
    // Transform array of subresources into array of id (M Relationships)
    else if (data[d] && data[d].length && data[d][0] && data[d][0].id) data[d] = data[d].map(i => i.id);
    // Transform single subresource into id (S Relationships)
    else if (data[d] && data[d].id) data[d] = data[d].id;
    // Transform null and undefined fields into empty string (Files)
    else if (data[d] === null || typeof data[d] === 'undefined') data[d] = '';
    // Transform array of file into multiple fields
  });

  return objectToFormData(data);
};
