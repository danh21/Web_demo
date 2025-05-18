const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var tabItems = $$('.tab-item')
var tabPanes = $$('.tab-pane')
var line = $('.line')

line.style.left = tabItems[0].offsetLeft + 'px'
line.style.width = tabItems[0].offsetWidth + 'px'

tabItems.forEach((tabItem, index) => {
    tabItem.onclick = function() {
        $('.tab-item.active').classList.remove('active')
        $('.tab-pane.active').classList.remove('active')
        tabItem.classList.add('active')
        tabPanes[index].classList.add('active')
        line.style.left = tabItem.offsetLeft + 'px'
        line.style.width = tabItem.offsetWidth + 'px'
        //console.log([tabItem])
    }
});