 /**
   * 定时页面刷新程序
   * 实现在每天指定时间刷新网页
   * 请注意：由于本程序使用cookie设置了一个小时之内只允许刷新一次的限定，调试的时候试验一次后
   *   请删除cookie后再试第二次，否则一个小时之内将不再重复刷新
**/
   var pT = 10; //时间精确点，以该数字表示的秒数进行巡检，时间越小，越精确,最小不要小于1，最大不要大于30
   var h = 8; //小时数，（24小时制）
   var m = 0; //分钟数，加上这个为了方便你调试，使用时可设置为0
   console.log('加载文件成功')
   setInterval(function(){
     console.log('定时器')
      var d = new Date();
      if(Number(d.getHours()) == h && Number(d.getMinutes()) == m && getCookie("reloadTime") == "hasReload"){
        console.log('界面重新刷新，并设置cookie')
        location.reload(true);
        setCookie("reloadTime", "hasReload", 1);
      }
      // 一分钟内可能会刷新多次
   }, 4000 * pT)
   function getCookie(cookieName){
      var strCookie=document.cookie;
      var arrCookie=strCookie.split("; ");
      console.log(strCookie);
      console.log(arrCookie)
      for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        console.log(arr)
        // js 解码 unescape
        if(cookieName==arr[0]) return unescape(arr[1]);
      }
      return false;
   }
   function setCookie(cookieName, cValue, cExpires, cPath, cDomain, secure){ // cExpires为过期的小时数
      if(cExpires){
        var date=new Date();
        cExpires = date.setTime(date.getTime()+Number(cExpires)*3600*1000);
        cExpires = date.toGMTString();
      }
      // escape js 编码字符串
      document.cookie = cookieName + "=" + escape(cValue) +
        ((cExpires) ? "; expires=" + cExpires : "") +
        ((cPath) ? "; path=" + cPath : "; path=/") + 
        ((cDomain) ? "; domain=" + cDomain : "") + 
        ((secure) ? "; secure" : "");
      console.log(document.cookie)
   }