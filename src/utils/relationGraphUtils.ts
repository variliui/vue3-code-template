import Graph from 'graphology';
import circlepack from 'graphology-layout/circlepack';
import {type RGLink, type RGLine, type  RGNode, type RelationGraphInstance} from 'relation-graph/vue3'

export const relayout = async (layout: string, graphInstance: RelationGraphInstance) => {
  switch (layout) {
    case 'force':
      //   relayoutByForce(graphInstance);

      break;
    case 'sigma':
      relayoutBySigma(graphInstance);
      break;
    default:
      break;
  }
  return;
};

export const relayoutBySigma = async (graphInstance: any) => {
  // graphInstance.stopAutoLayout();
  const graph = new Graph();
  // const graphInstance = this.$refs.graphRef.getInstance();
  graphInstance.getNodes().forEach((node: RGNode) => {
    graph.addNode(node.id, {
      text: node.text,
      width: node.el.offsetWidth,
      height: node.el.offsetHeight,
    });
  });
  graphInstance.getLinks().forEach((link: RGLink) => {
    link.relations.forEach((line: RGLine) => {
      graph.addEdge(link.fromNode.id, link.toNode.id, {
        id: line.id, // 设置id，到会儿通过id找到jsonData中的line，设置line.data.points
        weight: 1, // 这是一个非常重要的参数，尝试设置为0或者1或者中间值查看效果
      });
    });
  });
  circlepack.assign(graph);
  graph.nodes().forEach((nodeId) => {
    // 拷贝布局结果到relation-graph对应的节点中
    const node = graph.getNodeAttributes(nodeId);
    const rgNode = graphInstance.getNodeById(nodeId);
    rgNode.x = node.x * 10; // 通过乘以一个变量，来调节节点之间的距离
    rgNode.y = node.y * 10;
  });
  await graphInstance.moveToCenter();
  await graphInstance.zoomToFit();
  // graphInstance.refresh();
};


interface INode {
  dataId: string,
  cnName: string,
  type: string,
  level: number,
  DC_Content: string,
  classification: string,
  DC_RequirementId: string,
  description: string
}

interface ILine {
  id: string,
  relType: string,
  from: string,
  to: string,
  relDescription: string
}

/**
 * 生成类型数组里的随机类型
 * @param types 类型数组
 */
const generateRandType = (types:string[]) => {
  return types[Math.floor(Math.random() * types.length)];
}

let nodeId = 0;
/**
 * 单个节点数据的生产
 * @param nodeName 节点名称
 * @param nodeType 节点类型
 * @returns 节点数据
 */
const createOneNode = (nodeName: string, nodeType: number): INode => {
  nodeId++;
  const tempId = 'D' + nodeId.toString().padStart(5, "0");
  const mainTypes = ['需求', '架构']
  const extraTypes = ['需求', '架构', '功能', '仿真任务', '测试要求']
  let type = "";
  switch (nodeType) {
    case 1:
      type = generateRandType(mainTypes);
      break;
    case 2:
      type = generateRandType(mainTypes);
      break;
    case 3:
      type = generateRandType(extraTypes);
      break;
  }
  const oneNode:INode = {
    dataId: tempId,
    cnName: nodeName,
    type: type,
    DC_Content: `用于定义${nodeName}的需求是什么`,
    level: nodeType,
    classification: "",
    DC_RequirementId: "Req00020",
    description: nodeName
  };
  return oneNode;
};
let lineId = 0;
/**
 * 单个关系数据的生产
 * @param fromId 关系起始节点
 * @param toId 关系终止节点
 * @returns 关系数据
 */
const createOneLink = (fromId: string, toId: string) => {
  lineId++;
  const rel = Math.random() > 0.5 ? '引用' : '满足';
  const oneLink:ILine =
  {
    id: '' + lineId,
    relType: rel,
    from: fromId,
    to: toId,
    relDescription: `功能需求${rel}功能需求`
  };
  return oneLink;
};
/**
 * 创建随机节点和关系数据
 * @returns 返回生成的节点和关系数据
 */
export const createRandomNodesAndRelations = () => {
  /**
   * 第一层节点
   */
  const nodeList1 = ['飞船设计要求', '航空监视要求', '馈电链路接口要求', '测控链路接口要求', '导航信息接收功能要求', '导航增强信号广播功能', '用户终端宽带接受功能', '数据加密功能', '数据缓存功能', '重量要求', '频段要求', '卫星容量', '星间链路', '星上载荷处理功能'];
  /**
   * 第二层节点
   */
  const nodeList2 = ['移动通信业务分析', '接受终端数据', '信号放大LNA', '下变频', '基带数据处理', '载荷数据处理', '数据调制', '上变频', '信号放大PA', '广播信号'];
  /**
   * 第三层节点
   */
  const nodeList3 = ['GNSS分系统', '供电分系统', '基带分系统', '天线分系统', '射频分系统', '数据调制分系统', '载荷分系统'];
  /**
   * 所有节点
   */
  const nodes: any[] = [];
  /**
   * 分层节点用来构造关系
   */
  const nodes1:INode[] = [];
  const nodes2:INode[] = [];
  const nodes3:INode[] = [];
  for (const nodeName of nodeList1) {
    const one = createOneNode(nodeName, 1);
    nodes1.push(one);
    nodes.push(one);
  }
  for (const nodeName of nodeList2) {
    const one = createOneNode(nodeName, 2);
    nodes2.push(one);
    nodes.push(one);
  }
  for (const nodeName of nodeList3) {
    const one = createOneNode(nodeName, 3);
    nodes3.push(one);
    nodes.push(one);
  }
  const relationships:any[] = [];
  addRelations(nodes1, nodes1, relationships, 10)
  addRelations(nodes1, nodes2, relationships, 20)
  addRelations(nodes2, nodes2, relationships, 10)
  addRelations(nodes2, nodes3, relationships, 20)
  addRelations(nodes3, nodes3, relationships, 10)
  const out = {
    nodes,
    relationships,
  };
  return out;
};

/**
 * 添加随机关系
 * @param nodes1 起点节点
 * @param nodes2 终点节点
 * @param relationships 关系数组
 * @param rand 概率 0~100
 */
const addRelations = (nodes1: any[], nodes2: any[], relationships: any[], rand: number) => {
  for (let i1 = 0; i1 < nodes1.length; i1++) {
    const n1 = nodes1[i1];
    for (let i2 = i1; i2 < nodes2.length; i2++) {
      const n2 = nodes2[i2];
      if (getRan(rand) && n1.dataId !== n2.dataId) {
        const one = createOneLink(n1.dataId, n2.dataId);
        relationships.push(one);
      }
    }
  }
}

/**
 * 0-100的概率随机生成一个布尔值
 * t%的概率返回true
 * @param t 概率值
 * @returns
 */
const getRan = (t: number) => {
  return Math.random() < (t / 100);
};