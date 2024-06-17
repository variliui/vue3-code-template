<template>
    <div style="height: calc(100vh - 50px)" class="low-code-class">
        <RelationGraph ref="graphRef" :options="graphOptions">
            <template #tool-bar>
                <div
                    style="position: absolute;z-index: 30;top:10px;left: 40px; padding:10px;width:300px;height:70px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);border-radius: 10px;">
                    <div>
                        <div class="c-mb-button c-mb-button-c"
                            style="width: 50px;" @mousedown="startAddNode">
                            <span class="c-mb-text">节点</span>
                        </div>
                        <div class="c-mb-button c-mb-button-c"
                            style="width: 50px;" @click="startAddLine">
                            <span class="c-mb-text">线条</span>
                        </div>
                        <div class="c-mb-button" @click="zoomToFit">
                            <span class="c-mb-text">适应</span>
                        </div>
                        <div class="c-mb-button" @click="refresh">
                            <span class="c-mb-text">刷新</span>
                        </div>
                        <div>
                            <el-button @click="autoReload">测试</el-button>
                        </div>
                    </div>
                </div>
            </template>
        </RelationGraph>
    </div>
</template>


<script setup lang="ts">
// @ts-nocheck
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import RelationGraph, { type RGOptions, type RGJsonData, type JsonNode, type JsonLine, type RGNode, type RGLine } from 'relation-graph-vue3';
import { ref, onMounted, computed } from 'vue';

defineOptions({
    name: 'LowCode'
});

const graphOptions = ref<RGOptions>({
    debug: false,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border'
});

const newNodeIdIndex = ref<number>(1);
const newLineIdIndex = ref<number>(1);
const graphRef = ref<InstanceType<typeof RelationGraph>>();

onMounted(() => {
    showGraph();
});

const refresh = () => {
    graphInstance.value.refresh();
};

const graphInstance = computed(() => {
    return graphRef.value.getInstance();
})

const autoReload = () => {
    graphInstance.value.toggleAutoLayout();
}

const toggleAutoLayout = () => {
    // devLog('this.options.autoLayouting', this.options.autoLayouting)
    graphInstance.value.toggleAutoLayout();
};

const zoomToFit = async () => {
    await graphInstance.value.setZoom(100);
    await graphInstance.value.moveToCenter();
    await graphInstance.value.zoomToFit();
};
const startAddNode = (e) => {
    graphInstance.value.startCreatingNodePlot(e, {
        templateText: 'Node',
        templateStyleClass: 'my-node-template',
        onCreateNode: (x, y) => {
            console.log('新增节点：', x, y);
            const newId = newNodeIdIndex.value++;
            graphInstance.value.addNodes([{
                id: 'newNode-' + newId,
                text: '新节点' + newId,
                color: '#5da0f8',
                x: x - 60,
                y: y - 60
            }]);
        }
    });
};
const startAddLine = (e) => {
    graphInstance.value.startCreatingLinePlot(e, {
        template: {
            lineWidth: 3,
            color: '#8080ff',
            text: '新连线'
        },
        onCreateLine: (from, to) => {
            console.log('新增连线：', from, to);
            if (to.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
                const newLineId = newLineIdIndex.value++;
                graphInstance.value.addLines([{
                    from: from.id,
                    to: to.id,
                    lineWidth: 3,
                    color: '#8080ff',
                    text: '新连线' + newLineId
                }]);
            }
        }
    });
};

const showGraph = () => {
    const __graph_json_data = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'A', borderColor: 'yellow' },
            { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
            { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
            { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
            { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
            { from: 'a', to: 'c', text: '关系2' },
            { from: 'a', to: 'e', text: '关系3' },
            { from: 'b', to: 'e', text: '', color: '#67C23A' }
        ]
    };

    graphInstance.value.setJsonData(__graph_json_data, () => {
        // 这些写上当图谱初始化完成后需要执行的代码.
    });
};
</script>

<style scoped lang="scss">
.c-node-menu-item {
    line-height: 30px;
    padding-left: 10px;
    cursor: pointer;
    color: #444444;
    font-size: 14px;
    border-top: #efefef solid 1px;
}

.c-node-menu-item:hover {
    background-color: rgba(66, 187, 66, 0.2);
}
</style>

<style scoped lang="scss">
.low-code-class{
    :deep(.my-node-template) {
    background-color: #8080ff !important;
    color: #ffffff !important;
    transform: translate(-60px, -60px) !important;
    cursor: default;
}
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(1440deg);
    }
}

.rg-icon {
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    fill: currentColor;
    overflow: hidden;
}

.c-mb-button {
    height: 50px;
    width: 50px;
    padding-top: 5px;
    background-color: #ffffff;
    opacity: 1;
    text-align: center;
    cursor: pointer;
    color: #999999;
    font-size: 18px;
    float: left;
    box-sizing: border-box;
    position: relative;
    border-radius: 5px;
}

.c-mb-button .c-mb-text {
    display: inline-block;
    height: 14px;
    width: 42px;
    font-size: 12px;
    line-height: 12px;
    margin-top: 24px;
    margin-left: -28px;
    position: absolute;
    color: #262626;
}

.c-mb-button-on {
    background-color: #2E74B5;
    border-top: #2E4E8F solid 1px;
    color: #ffffff;
}

.c-mb-button:hover {
    background-color: #00bb00;
    border-top: #00bb00 solid 1px;
    color: #ffffff;
}

.c-mb-button:hover .c-mb-text,
.c-mb-button-on .c-mb-text {
    color: #ffffff;
}

.c-mb-button .c-mb-child-panel {
    height: 46px;
    position: absolute;
    top: 0px;
    z-index: 999;
    background-color: #ffffff;
    display: none;
    border: #bbbbbb solid 1px;
    box-shadow: 0px 0px 8px #cccccc;
    box-sizing: border-box;
}

.c-mb-button:hover .c-mb-child-panel {
    display: block;
}

.c-mb-button .c-mb-button {
    height: 44px;
    width: 42px;
    margin: 0px;
    border: none;
}

.c-mb-button-c .c-mb-text {
    color: #262626 !important;
}

.c-mb-button-c:hover .c-mb-text,
.c-mb-button-on .c-mb-text {
    color: #ffffff !important;
}

.c-loading-icon {
    animation: turn 1s linear infinite;
}

@keyframes turn {
    0% {
        -webkit-transform: rotate(0deg);
    }

    25% {
        -webkit-transform: rotate(90deg);
    }

    50% {
        -webkit-transform: rotate(180deg);
    }

    75% {
        -webkit-transform: rotate(270deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}
</style>

<style>


</style>