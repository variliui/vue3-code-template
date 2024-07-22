<template>
    <div :class="EDragClassName.MAIN">
        <div :class="EDragClassName.LEFT">
            <slot name="side"></slot>
        </div>
        <div v-if="showDragBar" :class="EDragClassName.RESIZE" @click="collapseSideBar">⋮</div>
        <div :class="EDragClassName.RIGHT">
            <slot name="main"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs } from 'vue';
import { generateRandomString } from '@/utils/util';
enum EDragClassName {
    MAIN = 'main-container',
    LEFT = 'left-container',
    RESIZE = 'resize-container',
    RIGHT = 'right-container'
}

type TProps = {
    minSideWidth?: number;
    maxSideWidth?: number;
    id?: string;
    showDragBar?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    minSideWidth: 60,
    maxSideWidth: 180,
    id: generateRandomString(),
    showDragBar: true
});

const currentSideWidthWithPx = computed(() => {
    return currentSideWidth.value + 'px';
});
/**
 * 侧边栏最小宽度
 */
const { minSideWidth, maxSideWidth, id, showDragBar } = toRefs(props);
/**
 * 当前侧边宽度
 */
const currentSideWidth = defineModel<number>('currentSideWidth');

// 暂时用点击替代拖拽
const collapseSideBar = () => {
    // const minWidth = 60
    // const maxWidth = 180
    // if(currentSideWidth.value) {
    //     if (currentSideWidth.value <= minWidth + 50) {
    //         currentSideWidth.value = maxWidth
    //     } else {
    //         currentSideWidth.value = minWidth + 10
    //     }
    // }
};

/**
 * 用来控制拖拽条的拖动
 */
const dragControllerDiv = () => {
    // return
    // 获取所有的 resize-container 元素
    let resize = Array.from(
        document.getElementsByClassName('resize-container')
    ) as HTMLDivElement[];
    // 获取所有的 left-container 元素
    let leftContainer = Array.from(
        document.getElementsByClassName('left-container')
    ) as HTMLDivElement[];
    // 获取所有的 right-container 元素
    let rightContainer = Array.from(
        document.getElementsByClassName('right-container')
    ) as HTMLDivElement[];
    // 获取所有的 main-container 元素
    let box = Array.from(document.getElementsByClassName('main-container')) as HTMLDivElement[];
    // 遍历所有的 resize-container 元素
    resize.forEach((resizer, i) => {
        // 鼠标按下事件
        resizer.onmousedown = (e) => {
            // 改变颜色以提醒用户
            resizer.style.background = '#818181';
            // 改变鼠标样式
            document.body.style.cursor = 'col-resize';
            // 记录鼠标按下时的位置
            let startX = e.clientX;
            // 记录元素当前的位置
            resizer['left'] = resizer.offsetLeft;
            // 鼠标拖动事件
            document.onmousemove = (e) => {
                // 计算鼠标移动的距离
                let endX = e.clientX;
                let moveDistance = resizer['left'] + (endX - startX);
                // 计算右侧区域的宽度
                let maxT = box[i].clientWidth - resizer.offsetWidth;
                // 限制左侧区域的最小宽度
                if (moveDistance < minSideWidth.value) moveDistance = minSideWidth.value;
                if (maxSideWidth.value !== 0 && moveDistance > maxSideWidth.value)
                    moveDistance = maxSideWidth.value;
                // 限制右侧区域的最小宽度
                if (moveDistance > maxT - minSideWidth.value)
                    moveDistance = maxT - minSideWidth.value;
                currentSideWidth.value = moveDistance;
                // 设置左侧区域的宽度
                resizer.style.left = moveDistance;
                // 更新左侧和右侧区域的宽度
                leftContainer.forEach((leftDiv, j) => {
                    leftDiv.style.width = moveDistance + 'px';
                    rightContainer[j].style.width = box[i].clientWidth - moveDistance - 10 + 'px';
                });
            };
            // 鼠标松开事件
            document.onmouseup = (evt) => {
                // 恢复颜色
                resizer.style.background = '#d6d6d6';
                // 恢复鼠标样式
                document.body.style.cursor = '';
                // 清除鼠标移动和松开事件
                document.onmousemove = null;
                document.onmouseup = null;
                // 如果存在 releaseCapture 方法，则调用它来释放鼠标捕获
                if ('releaseCapture' in resizer) {
                    (resizer as HTMLDivElement)['releaseCapture']();
                }
            };
            // 如果存在 setCapture 方法，则调用它来设置鼠标捕获
            if ('setCapture' in resizer) {
                (resizer as HTMLDivElement)['setCapture']();
            }
            // 阻止默认行为
            return false;
        };
    });
};

onMounted(() => {
    dragControllerDiv();
});
</script>

<style scoped lang="scss">
.main-container {
    width: 100%;
    height: 100%;
    margin: 0px;
    display: initial;
    overflow: hidden;
    padding-top: 8px;
}
/*左侧div样式*/
.left-container {
    width: calc(v-bind('currentSideWidthWithPx') - 10px); /*左侧初始化宽度*/
    height: 100%;
    background: #ffffff;
    float: left;
    border: 0;
}
/*拖拽区div样式*/
.resize-container {
    cursor: col-resize;
    float: left;
    position: relative;
    top: 45%;
    background-color: #d6d6d6;
    border-radius: 5px;
    margin-top: -10px;
    width: 10px;
    height: 50px;
    background-size: cover;
    background-position: center;
    font-size: 32px;
    color: white;
}
/*拖拽区鼠标悬停样式*/
.resize-container:hover {
    color: #444444;
}
/*右侧div样式*/
.right-container {
    float: left;
    width: calc(100% - v-bind('currentSideWidthWithPx')); /*右侧初始化宽度*/
    height: 100%;
}
</style>
