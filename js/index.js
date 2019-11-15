(function () {
    let fenlei = document.querySelector('#box .banner .fenlei');
    let fenlei2 = document.querySelector('#box .banner .fenlei .fenlei2');
    let shangsanjiao = document.querySelector('#box .banner .fenlei .icon-shangsanjiao');
    let xiasanjiao = document.querySelector('#box .banner .fenlei .icon-xiasanjiao');

    fenlei.addEventListener('mouseenter', function () {
        fenlei2.style.display = 'block';
        shangsanjiao.style.display = 'none';
        xiasanjiao.style.display = 'inline-block';
    }, false)
    fenlei.addEventListener('mouseleave', function () {
        fenlei2.style.display = 'none';
        shangsanjiao.style.display = 'inline-block';
        xiasanjiao.style.display = 'none';
        shangsanjiao.style.display = 'inline-block';
    })


    let bofangjians = document.querySelectorAll('#box .rightbox2 div .bofangjian');
    let divs = document.querySelectorAll('#box .rightbox2 div')

    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('mouseenter', function () {
            bofangjians[i].style.display = 'block';
            divs[i].style.background = '#eee';
        })
        divs[i].addEventListener('mouseleave', function () {
            bofangjians[i].style.display = 'none';
            divs[i].style.background = '#fff';
        })
    }

    let bofangjians1 = document.querySelectorAll('#box .rightbox div .bofangjian');
    let divs1 = document.querySelectorAll('#box .rightbox div')

    for (let i = 0; i < divs1.length; i++) {
        divs1[i].addEventListener('mouseenter', function () {
            bofangjians1[i].style.display = 'block';
            divs1[i].style.background = '#eee';
        })
        divs1[i].addEventListener('mouseleave', function () {
            bofangjians1[i].style.display = 'none';
            divs1[i].style.background = '#fff';
        })

    }




    //轮播图部分
    //获取元素
    let ul = document.querySelector('.nav .lunboBox .img_box ul');
    let box = document.querySelector('.nav');
    let tipBox = document.querySelector('.nav .lunboBox .tip_box');
    let tips = document.getElementsByClassName('nav')[0].getElementsByClassName('tip');//么有映射
    let leftBtn = document.querySelector('.nav .lunboBox .btn_box .left_btn');
    let rightBtn = document.querySelector('.nav .lunboBox .btn_box .right_btn');
    let n = 0;
    let timer = null;

    //获取数据
    function getData() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', './data.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
                let data = JSON.parse(xhr.response)
                console.log(data)
                render(data)
                move();//数据渲染完成 之后再去开启轮播
                tipClick();
            }
        }
        xhr.send();
    }
    getData();

    //渲染数据
    function render(data) {
        data = data || [];
        let str = '';
        let tipStr = '';
        data.push(data[0]);//在数组末尾添加 第一项 ，是为了在最后补一张一样的图
        data.forEach((item, index) => {
            let { img, desc } = item;
            str += `
            <li>
            <img src="${img}" alt="">
            <p class="desc">${desc}</p>
           </li>`
            if (index != data.length - 1) {
                if (index == 0) {
                    tipStr += `<span class="tip current"></span>\n`
                } else {
                    tipStr += `<span class="tip"></span>\n`
                }
            }
        })
        tipBox.innerHTML = tipStr;
        ul.innerHTML = str;
        ul.style.width = data.length * 396 + 'px'//新添加一个图片 要更新盒子的宽度
    }

    function move() {
        timer = setInterval(() => {
            change();
        }, 2000);
    }
    function change() {
        n++;//n=4的时候现实的是  伪 第一张
        if (n == (tips.length + 1)) {
            ul.style.left = 0;//让图片直接闪到第一张，紧接着要向第二章图移动
            n = 1;
        }
        tipClass(n)
        animate(ul, { left: -396 * n }, 500)
    }

    //鼠标滑入时  清除动画
    box.onmouseenter = function () {
        clearInterval(timer);

    }
    //鼠标滑出  动画在重启
    box.onmouseleave = function () {
        move();
    }
    //控制点和图片对应
    function tipClass(m) {
        m = m >= tips.length ? 0 : m;//当n指向了 伪 第一张的时候 要让第一张高亮
        for (let i = 0; i < tips.length; i++) {
            tips[i].className = 'tip';
        }
        tips[m].className = 'tip current';
    }

    //点击左右按钮 切换轮播图
    rightBtn.onclick = function () {
        change();
    }
    leftBtn.onclick = function () {
        n--;
        if (n < 0) {
            ul.style.left = -396 * (tips.length) + 'px';
            n = tips.length - 1;
        }
        tipClass(n)
        animate(ul, { left: -396 * n }, 500, function () { console.log(666) })
    }

    function tipClick() {
        for (let i = 0; i < tips.length; i++) {
            tips[i].onclick = function () {
                n = i;
                tipClass(n)
                animate(ul, { left: -396 * n }, 500, function () { console.log(666) })
            }

        }
    }


    //鼠标上去显示图片
    let as = document.querySelectorAll('.righttext .previewBox ul li a');
    let imgs = document.querySelectorAll('.righttext .previewBox ul li .pictureBox img')
    let spans = document.querySelectorAll('.righttext .previewBox ul li span')
    let rps = document.querySelector('.righttext .previewBox ul li')

    for (var i = 0; i < as.length; i++) {
        as[i].index = i;//添加一个index的属性
        as[i].onmouseenter = function () {
            for (var i = 0; i < imgs.length; i++) {
                as[i].className = ''; //先清空所有的class名
                spans[i].className = '';
                imgs[i].className = '';//先清空所有的class名
            }
            this.className = 'active'; //再让点击的时候的class为active
            spans[this.index].className = 'show1'
            imgs[this.index].className = 'show';//再让点击的当前的为show。
                 
        }
        as[i].onmouseleave = function () {
            spans[this.index].className = 'show1';
        }
        
    }
    /* for (let i = 0; i < imgs.length; i++) {
        imgs[i].index = i;
        as[i].addEventListener('mouseenter', function (e) {
            imgs[i].style.display = 'block';

        })
        as[i].addEventListener('mouseleave',function(e){
            imgs[i].style.display = 'none';           
            // imgs[i].style.display = 'block';
        })
        rp.addEventListener('mouseleave',function(e){          
            imgs[0].style.display = 'block';

        })
    } */
})()


