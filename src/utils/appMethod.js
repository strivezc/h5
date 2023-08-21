import {isAndroid, isIOS} from './index';

/**
 *@desc 不同意协议，通知app清空数据返回登录页
 *@author zzc
 *@date 2021/08/26
 */
export function disagreePrivacy(){
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    try {
      return window.webkit.messageHandlers.disagreePrivacy.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (/(Android)/i.test(navigator.userAgent)) {
    try {
      return window.qd.disagreePrivacy()
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 *@desc 返回原生
 *@author zzc
 *@date 2021/11/12
 */
export function goBack() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.goBack.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.goBack()
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 *@desc 获取会员产品信息和token
 *@author zzc
 *@date 2021/12/20
 */
export function getMemberInfo() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.getMemberInfo.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.getMemberInfo()
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 *@desc 获取拼团信息
 *@date 2022/03/11
 */
export function grouponInfo() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.grouponInfo.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.grouponInfo()
    } catch (error) {
      console.log(error)
    }
  }
}

// 查看拼团
export function watchGrouponOrder(spellGroupSenderId) {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.watchGrouponOrder.postMessage(spellGroupSenderId)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.watchGrouponOrder(spellGroupSenderId)
    } catch (error) {
      console.log(error)
    }
  }
}
//
export function watchOrder() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.watchOrder.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.watchOrder()
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 *@desc 查看vip购买记录
 *@author zzc
 *@date 2021/12/20
 */
export function goPurchaseRecord() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.goPurchaseRecord.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.goPurchaseRecord()
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 *@desc 退出登录
 *@author zzc
 *@date 2021/11/12
 */
export function logout() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.logout.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.logout()
    } catch (error) {
      console.log(error)
    }
  }
}

export function getToken() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.getToken.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.getToken()
    } catch (error) {
      console.log(error)
    }
  }
}

export function wxShareInApp(params) {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.wxShare.postMessage(params)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.wxShare(params.base64,params.type,params.title,params.desc,params.link,params.imgUrl)
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 *@desc 获取黄金会员邀请信息
 *@author zzc
 *@date 2022/8/10
 */
export function getMemberInviteInfo() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.getMemberInviteInfo.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.getMemberInviteInfo()
    } catch (error) {
      console.log(error)
    }
  }
}

export function saveImage(params) {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.saveImage.postMessage(params)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.saveImage(params.base64)
    } catch (error) {
      console.log(error)
    }
  }
}
export function saveImageByLink(params) {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.saveImageByLink.postMessage(params)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.saveImageByLink(params.url)
    } catch (error) {
      console.log(error)
    }
  }
}
export function callPhone(phone) {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.callPhone.postMessage(phone)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.callPhone(phone)
    } catch (error) {
      console.log(error)
    }
  }
}

export function enterVoteActivity() {
  if (isIOS()) {
    try {
      return window.webkit.messageHandlers.enterVoteActivity.postMessage(null)
    } catch (error) {
      console.log(error)
    }
  } else if (isAndroid()) {
    try {
      return window.qd.enterVoteActivity()
    } catch (error) {
      console.log(error)
    }
  }
}
