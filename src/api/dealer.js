import request from '@/utils/request';
import { config } from '@/utils/config';

export function getJoinSchoolPromotionInfo(data) {
  return request({
    url: `${config.market}/joinSchoolPromotion/getJoinSchoolPromotionInfo`,
    method: 'post',
    hideMessage:true,
    data
  });
}

