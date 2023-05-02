import moment from 'moment';

export const formatDate=(date,format)=>{
  return moment(date).format(format);
}