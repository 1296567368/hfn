// 主要定义todos案例中的业务逻辑
var todolist = [
    {
        id: 1,
        todoName: '吃饭',
        isDone: true,
    },
    {
        id: 2,
        todoName: '睡觉',
        isDone: true,
    },
    {
        id: 3,
        todoName: '敲代码',
        isDone: false,
    },
]
//获取元素
var inner = document.getElementsByClassName('inner')[0]
var todoMain = document.getElementsByClassName('todo-main')[0]
var todoFooter = document.getElementsByClassName('todo-footer')[0]
var liList = todoMain.getElementsByTagName('li')
var input = todoMain.getElementsByTagName('input')
var oIpt = document.getElementById('ipt')
var delBtn = todoFooter.getElementsByTagName('button')[0]

var doneNum = document.getElementById('doneNum')
var totalNum = document.getElementById('totalNum')

// 0.判断数组中是否有数据,如果有,则展示todo-main和todo-footer.如果没有数据就不展示
if (todolist.length === 0) {
    // 没有数据,就不展示todo-main和todo-footer,并且提示一句话,提示恭喜你,没有任务
    hide()
} else {
    // 1. 将数据渲染到页面上
    // 1.1 根据数据,动态的创建html字符串
    // 1.1.1. 遍历数组,根据数组元素的个数,动态的创建多个字符串
    var htmlArr = todolist.map(function (item, index) {
        //判断:
        // 如果item.isDone的值是true,就给input加checked, 如果没有就不加
        if (item.isDone) {
            return (
                '<li><label><input type="checkbox" checked/><span class="done">' + item.todoName +
                '</span> </label><button class="btn btn-danger">删除</button></li>')
        } else {
            return (
                '<li>\
            <label>\
              <input type="checkbox" />\
              <span>'+ item.todoName + '</span>\
            </label>\
            <button class="btn btn-danger">删除</button>\
            </li>'
            )
        }
    })
    todoMain.innerHTML = htmlArr.join('')
    showListNum()
}

// 2. 实现添加任务的逻辑
// 2.1 给input注册键盘抬起事件
var oIpt = document.getElementById('ipt')

oIpt.onkeyup = function (e) {
    if (e.keyCode === 13) {
        var value = this.value.trim()
        if (!value) return;
        // 清空添加任务的表单项
        oIpt.value = ''

        //根据输入数据动态生成li
        var str = '<label>\
        <input type="checkbox" />\
        <span>'+ value + '</span>\
        </label>\
        <button class="btn">删除</button>'
        var newLi = document.createElement('li')
        newLi.innerHTML = str
        // console.log(newLi);
        todoMain.appendChild(newLi)
        isShow()
        changeAllCheckbox() 
        showListNum()
    }
}


// 3. 更新任务项的状态
// 3.1 获取所有的任务项的input[checkbox]
// 3.2 注册点击事件
// 注意: 由于有新的任务项,所以需要事件委托
todoMain.onclick = function (e) {
    // 3.3 在事件处理函数中,获取input[checkbox]的状态,然后给span添加或删除类名done
    if (e.target.nodeName.toLowerCase() == "input") {
        var isCkecked = e.target.checked
        // console.log(e.target);
        // console.log(isCkecked);
        if (isCkecked) {
            e.target.nextElementSibling.classList.add('done');
        } else {
            e.target.nextElementSibling.classList.remove('done');
        }
    }

    //删除任务功能
    //5. 点击任务项的删除按钮,删除当前任务项
    if (e.target.nodeName.toLowerCase() == "button") {
        e.target.parentNode.remove()
    }
    isShow()
    changeAllCheckbox()
    showListNum()
}

// 6. 全选按钮的点击事件逻辑,全选选中了,每一个任务项也都选中,全选取消,每一个任务项也都取消
var allCheckBtn = todoFooter.getElementsByTagName('input')[0]
//console.log(allCheckBtn);
// var isAllChecked = allCheckBtn.checked//不可以使用?
// allCheckBtn.checked = true
//console.log(allCheckBtn.checked);
allCheckBtn.onclick = function () {
    if (allCheckBtn.checked) {
        for (var i = 0; i < input.length; i++) {
            input[i].checked = true
            input[i].nextElementSibling.classList.add('done');
        }
    } else {
        for (var i = 0; i < input.length; i++) {
            input[i].checked = false
            input[i].nextElementSibling.classList.remove('done');
        }
    }
    showListNum()
}

//7.删除所有选中的任务项
delBtn.onclick = function () {
    //console.log(input);
    Array.from(input).forEach(function (item) {
        if (item.checked) {
            item.parentNode.parentNode.remove()
        }
    })
    isShow()
    showListNum()
}

//8.动态的展示所有任务项的个数和已经完成的任务项的个数
