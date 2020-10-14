export default {
  //校验中英文文字符
  vify_cnen: function(phone) {
    let myreg = /^[\u4e00-\u9fa5a-zA-Z\d_]{0,50}$/gi;
    if (myreg.test(phone) !== true) {
      return false;
    } else {
      return true;
    }
    return true;
  },
  //校验中英文文字符
  vify_cn16: function(phone) {
    let myreg = /^[\u4e00-\u9fa5a-zA-Z\d_]{2,16}$/gi;
    if (myreg.test(phone) !== true) {
      return false;
    } else {
      return true;
    }
    return true;
  },

  isChinese16: function(temp) {
    var re = /[^\u4E00-\u9FA5]{2,16}$/gi;
    if (re.test(temp)) return false;
    return true;
  },
  //校验中文字符
  vify_cn: function(phone) {
    let myreg = /^[\u4e00-\u9fa5]+$/gi;
    if (myreg.test(phone) !== true) {
      console.log(211);
      return false;
    } else {
      console.log(3111);
      return true;
    }
    return true;
  },
  //校验50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号
  vify_cn50: function(phone) {
    let myreg = /^[\u4e00-\u9fa5a-z0-9A-Z\（\）\(\)\d_]{0,50}$/gi;
    if (myreg.test(phone) !== true) {
      console.log(211);
      return false;
    } else {
      console.log(3111);
      return true;
    }
    return true;
  },
  vify_cn30: function(phone) {
    let myreg = /^[\u4e00-\u9fa5a-z0-9A-Z\（\）\(\)\d_]{0,30}$/gi;
    if (myreg.test(phone) !== true) {
      console.log(211);
      return false;
    } else {
      console.log(3111);
      return true;
    }
    return true;
  },
  vify_cn20: function(phone) {
    let myreg = /^[\u4e00-\u9fa5a-z0-9A-Z\（\）\(\)\d_]{0,20}$/gi;
    if (myreg.test(phone) !== true) {
      console.log(211);
      return false;
    } else {
      console.log(3111);
      return true;
    }
    return true;
  },
  //验证邮箱格式
  verEmail: function(str) {
    var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (re.test(str) !== true) {
      return false;
    } else {
      return true;
    }
  },
  //验证手机号码
  verPhone: function(str) {
    var re = /^1[3456789]\d{9}$/
    if (re.test(str) !== true) {
      return false;
    } else {
      return true;
    }
  },
  toTree: function(data) {
    if (!data)
      return []
    for (let i = 0; i < data.length; i++) {
      if (data[i].nodeType == 0) {
        data[i].disabled = true;
      }
    }

    let result = [];
    if (!Array.isArray(data)) {
      return result;
    }
    data.forEach((item) => {
      delete item.children;
    });
    let map = {};
    data.forEach((item) => {
      map[item.id] = item;
    });
    data.forEach((item) => {
      let parent = map[item.pid];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  },
  getTreeExpandedKeys: function(data) {
    let defaultExpandedKeys = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].open) {
        defaultExpandedKeys.push(data[i].id);
      }
    }
    return defaultExpandedKeys
  },
  getTreeExpandedKeysByArea: function(data) {
    let defaultExpandedKeys = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].open && data[i].nodeType == 'AREA') {
        defaultExpandedKeys.push(data[i].id);
      }
    }
    return defaultExpandedKeys
  },


  /* 缓存选择线路的数据*/
  setLineSelectKey(data) {
    localStorage.setItem("lineSelectKey", JSON.stringify(data))
  },
  /* 获取选择的线路数据*/
  getLineSelectKey() {
    let item = localStorage.getItem("lineSelectKey")
    if (item != 'undefined')
      return JSON.parse(item)
    return {}
  },
  /* 缓存灯杆的数据*/
  setLightSelectKey(data) {
    localStorage.setItem("lightTreeSelectKey", JSON.stringify(data))
  },
  /* 获取缓存的灯杆的数据*/
  getLightSelectKey() {
    if (!localStorage.getItem("lightTreeSelectKey"))
      return null
    return JSON.parse(localStorage.getItem("lightTreeSelectKey"))
  },
  setAreaId(data) {
    localStorage.setItem("areaId", JSON.stringify(data))
  },
  getAreaId() {
    return JSON.parse(localStorage.getItem("areaId"))
  },

}
