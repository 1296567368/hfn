//判断列表中是否有数据
function isShow() {
    // liList.length || hide()
    // liList.length && show()
    liList.length ? show() : hide()
}

// 这是让todo-main和todo-footer隐藏的函数
function hide() {
    todoMain.style.display = 'none';
    todoFooter.style.display = 'none';
    var oh1 = document.createElement('h1')
    oh1.textContent = '恭喜你,没有任务!'
    //console.log(oh1);
    inner.appendChild(oh1)
}
// 这是让todo-main和todo-footer展示的函数
function show() {
    todoMain.style.display = 'block';
    todoFooter.style.display = 'block';
    var oH1 = inner.getElementsByTagName('h1')[0]
    if (oH1) {
        oH1.remove()
    }

}

//判断是否全部选中
function changeAllCheckbox() {
    var allItems = liList.length
    var allCheckedItems = 0
    Array.from(input).forEach(function (item) {
        if (item.checked) {
            allCheckedItems++
        }
    })
    //console.log(allCheckedItems, allItems);
    if (allCheckedItems === allItems && allCheckedItems !== 0) {
        allCheckBtn.checked = true
    } else {
        allCheckBtn.checked = false
    }
}
//8.动态的展示所有任务项的个数和已经完成的任务项的个数
function showListNum() {
    var allItems = liList.length
    var allCheckedItems = 0
    Array.from(input).forEach(function (item) {
        if (item.checked) {
            allCheckedItems++
        }
    })
    //console.log(allCheckedItems, allItems)
    totalNum.textContent = allItems
    doneNum.textContent = allCheckedItems

}