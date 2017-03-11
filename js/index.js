window.onload= function(){
    leftCategory();
};
/*左侧滑动*/
var leftCategory = function(){
    /*拿DOM对象*/
    /*父盒子*/
    var parentDom = document.getElementsByClassName('m_remen')[0];
    /*子盒子*/
    var childDom = parentDom.getElementsByClassName('m_remen_ul')[0];

    var parentWidth = parentDom.offsetWidth;

    var childWidth = childDom.offsetWidth;


    /*左侧盒子定位的区间*/
    var maxX = 0,minX = -(childWidth-parentWidth);
    /*缓冲距离 150*/
    var distance = 150;

    /*改变位置的方法*/
    var changeTranslateX = function(x){
        childDom.style.transform = "translateX("+x+"px)";
        childDom.style.webkitTransform = "translateX("+x+"px)";
    }
    /*加过渡*/
    var addTransition = function(){
        childDom.style.transition = "all .2s ease";
        childDom.style.webkitTransition = "all .2s ease";/*兼容 老版本webkit内核浏览器*/
    }
    /*清除过渡*/
    var removeTransition = function(){
        childDom.style.transition = "none";
        childDom.style.webkitTransition = "none";/*兼容 老版本webkit内核浏览器*/
    }


    var startX = 0;
    var endX = 0;
    var moveX = 0;
    /*记录当前的X的定位*/
    var currX = 0;

    /*1.滑动*/
    childDom.addEventListener('touchstart',function(e){
        /*初始的X的坐标*/
        startX = e.touches[0].clientX;

    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        /*不停的做滑动的时候记录的endX的值*/
        endX = e.touches[0].clientX;
        moveX = startX - endX;/*计算了移动的距离*/

        /*2.滑动区间*/
        /*就是滑动区间*/
        if((currX-moveX)<(maxX+distance)&&(currX-moveX)>(minX -distance)){
            removeTransition();
            changeTranslateX(currX-moveX);
        }
    },false);
    childDom.addEventListener('touchend',function(e){
        /*在限制滑动区间之后 重新计算当前定位*/
        /*判断是否在我们的合理定位区间内*/
        /*先向左滑动 */
        if((currX-moveX) > maxX){
            currX = maxX;
            addTransition();
            changeTranslateX(currX);
        }
        /*向左滑动的时候*/
        else if((currX-moveX) < minX){
            currX = minX;
            addTransition();
            changeTranslateX(currX);
        }
        /*正常的情况*/
        else{
            currX = currX-moveX;
        }

        startX = 0;
        endX = 0;
        moveX = 0;
    },false);



}
