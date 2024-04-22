import { Random } from 'mockjs'
/**
 * @author ljh
 * @description 矩阵追溯的mock源数据
 */

interface ITypeStructBase {
  id: string
  code: string
  name: string
}

interface ITypeStructSysML extends ITypeStructBase {}
interface ITypeStructIDS extends ITypeStructBase {}
interface ITypeStructSysLink extends ITypeStructBase {}
interface ITypeStructEDS extends ITypeStructBase {}

/**
 * 最终保存的型号结构树
 */
interface ITypeStructTree {
  id: string
  code: string
  name: string
  children?: ITypeStructTree[]
  SysML: ITypeStructSysML
  IDS: ITypeStructIDS
  SysLink: ITypeStructSysLink
  EDS: ITypeStructEDS
}

export const createBaseTypeStructTreeData = () => {
  return {
    id: Random.id(),
    name: Random.cname(),
    code: Random.string('upper', 10),
    SysML: {
      id: Random.id(),
      name: Random.cname(),
      code: Random.string('upper', 10)
    },
    IDS: {
      id: Random.id(),
      name: Random.cname(),
      code: Random.string('upper', 10)
    },
    SysLink: {
      id: Random.id(),
      name: Random.cname(),
      code: Random.string('upper', 10)
    },
    EDS: {
      id: Random.id(),
      name: Random.cname(),
      code: Random.string('upper', 10)
    }
  }
}

export const createTypeStructTreeData = (): ITypeStructTree => {
  const typeStructTreeData: ITypeStructTree = {
    ...createBaseTypeStructTreeData(),
    children: [
      {
        ...createBaseTypeStructTreeData(),
        children: [
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          },
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          },
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          }
        ]
      },
      {
        ...createBaseTypeStructTreeData(),
        children: [
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          },
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          },
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          }
        ]
      },
      {
        ...createBaseTypeStructTreeData(),
        children: [
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          },
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          },
          {
            ...createBaseTypeStructTreeData(),
            children: [
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              },
              {
                ...createBaseTypeStructTreeData()
              }
            ]
          }
        ]
      }
    ]
  }
  return typeStructTreeData
}

enum ETypeStructSystemType {
  IDS = 'IDS',
  EDS = 'EDS',
  SysML = 'SysML',
  SysLink = 'SysLink'
}

/**
 * --------------- * 结构树页面top选择型号列表接口 * --------------------
 */
interface ITopNodeList {
  nodeName: string
  nodeId: string
  nodeCode: string
}
/**
 * @param num 顶级节点的数量
 */
export const getTopNodeList = (num: number): ITopNodeList[] => {
  /**
   * 创建单个顶级节点
   * @returns 单个顶级节点
   */
  const createOneNode = (id?: string): ITopNodeList => {
    return {
      nodeName: Random.ctitle(),
      nodeId: id ?? Random.id(),
      nodeCode: 'XFA-' + Random.string('upper', 10)
    }
  }
  const result: ITopNodeList[] = []
  for (let i = 0; i < num; i++) {
    result.push(createOneNode(i + ''))
  }
  return result
}

/**
 * --------------- * 根据选择的型号取得存在的结构树 * --------------------
 */
interface ITypeStruct {
  nodeId: string
  nodeTitle: string
  nodeCode: string
  systemCategory: string
  peer: ITypeStructPeer[]
  no: number
  level: number
  parentId?: string
  children?: ITypeStruct[]
}

interface ITypeStructPeer {
  nodeId: string
  nodeTitle: string
  nodeCode: string
  systemCategory: string
}
let tempId = 1;
export const getStructureByTopNodeCode = (id: string): ITypeStruct => {
  tempId++
  const createPeer = (type: ETypeStructSystemType, title: string) => {
    return {
      nodeId: Random.id(),
      nodeTitle: title,
      nodeCode: type + '-' + Random.string('upper', 10),
      systemCategory: type
    }
  }
  const creteOneTypeStruct = (): ITypeStruct => {
    const oneNodeResult: ITypeStruct = {
      nodeId: '1',
      nodeTitle: 'XX型号',
      peer: [
        createPeer(ETypeStructSystemType.SysML, 'XFC'),
        createPeer(ETypeStructSystemType.IDS, 'XFC'),
        createPeer(ETypeStructSystemType.SysLink, 'XFC'),
        createPeer(ETypeStructSystemType.EDS, 'XFC')
      ],
      nodeCode: 'XFA-1',
      systemCategory: 'base',
      no: 1,
      level: 1,
      parentId: '',
      children: [
        {
          nodeId: '1-1',
          nodeTitle: '通信分系统',
          peer: [
            createPeer(ETypeStructSystemType.SysML, 'CommSubSys'),
            createPeer(ETypeStructSystemType.IDS, 'TongXin'),
            createPeer(ETypeStructSystemType.SysLink, 'XFC_AA'),
            createPeer(ETypeStructSystemType.EDS, 'FC_AA')
          ],
          nodeCode: 'CommSubSys',
          systemCategory: 'base',
          no: 1,
          level: 2,
          parentId: '1',
          children: []
        },
        {
          nodeId: '1-2',
          nodeTitle: '推进分系统',
          peer: [
            createPeer(ETypeStructSystemType.SysML, 'BoostSubSys'),
            createPeer(ETypeStructSystemType.IDS, 'TuiJin'),
            createPeer(ETypeStructSystemType.SysLink, 'XFC_AB'),
            createPeer(ETypeStructSystemType.EDS, 'FC_AB')
          ],
          nodeCode: 'BoostSubSys',
          systemCategory: 'base',
          no: 2,
          level: 2,
          parentId: '1',
          children: [
            {
              nodeId: '1-2-1',
              nodeTitle: '电推发动机',
              peer: [
                createPeer(ETypeStructSystemType.SysML, 'PowerEngine'),
                createPeer(ETypeStructSystemType.IDS, 'DianTui'),
                createPeer(ETypeStructSystemType.SysLink, 'XFC_AB_101'),
                createPeer(ETypeStructSystemType.EDS, 'FC_AB_101')
              ],
              nodeCode: 'PowerEngine',
              systemCategory: 'base',
              no: 1,
              level: 3,
              parentId: '1-2',
              children: [
                {
                  nodeId: '1-2-1-1',
                  nodeTitle: '机械特性',
                  peer: [
                    createPeer(ETypeStructSystemType.SysML, ''),
                    createPeer(ETypeStructSystemType.IDS, '机械特性'),
                    createPeer(ETypeStructSystemType.SysLink, 'Mechanical Load'),
                    createPeer(ETypeStructSystemType.EDS, '')
                  ],
                  nodeCode: 'Mechanism',
                  systemCategory: 'base',
                  no: 1,
                  level: 4,
                  parentId: '1-2-1'
                },
                {
                  nodeId: '1-2-1-2',
                  nodeTitle: '电特性',
                  peer: [
                    createPeer(ETypeStructSystemType.SysML, ''),
                    createPeer(ETypeStructSystemType.IDS, '电特性'),
                    createPeer(ETypeStructSystemType.SysLink, 'Electrical Load'),
                    createPeer(ETypeStructSystemType.EDS, '')
                  ],
                  nodeCode: 'Electric',
                  systemCategory: 'base',
                  no: 2,
                  level: 4,
                  parentId: '1-2-1'
                },
                {
                  nodeId: '1-2-1-3',
                  nodeTitle: '热特性',
                  peer: [
                    createPeer(ETypeStructSystemType.SysML, ''),
                    createPeer(ETypeStructSystemType.IDS, '热特性'),
                    createPeer(ETypeStructSystemType.SysLink, 'Thermal Load'),
                    createPeer(ETypeStructSystemType.EDS, '')
                  ],
                  nodeCode: 'Thermal',
                  systemCategory: 'base',
                  no: 3,
                  level: 4,
                  parentId: '1-2-1'
                },
                {
                  nodeId: '1-2-1-4',
                  nodeTitle: '遥测参数',
                  peer: [
                    createPeer(ETypeStructSystemType.SysML, ''),
                    createPeer(ETypeStructSystemType.IDS, ''),
                    createPeer(ETypeStructSystemType.SysLink, 'Telemetry Parameter'),
                    createPeer(ETypeStructSystemType.EDS, 'Telemetry Parameter')
                  ],
                  nodeCode: 'Telemetering',
                  systemCategory: 'base',
                  no: 4,
                  level: 4,
                  parentId: '1-2-1'
                },
                {
                  nodeId: '1-2-1-5',
                  nodeTitle: '遥控指令',
                  peer: [
                    createPeer(ETypeStructSystemType.SysML, ''),
                    createPeer(ETypeStructSystemType.IDS, ''),
                    createPeer(ETypeStructSystemType.SysLink, 'Telecommand'),
                    createPeer(ETypeStructSystemType.EDS, 'Telecommand')
                  ],
                  nodeCode: 'Telecontrol',
                  systemCategory: 'base',
                  no: 5,
                  level: 4,
                  parentId: '1-2-1'
                }
              ]
            },
            {
              nodeId: '1-2-2',
              nodeTitle: '化推发动机',
              peer: [
                createPeer(ETypeStructSystemType.SysML, 'ChemicalEngine'),
                createPeer(ETypeStructSystemType.IDS, 'HuaTui'),
                createPeer(ETypeStructSystemType.SysLink, 'XFC_AB_102'),
                createPeer(ETypeStructSystemType.EDS, 'FC_AB_102')
              ],
              nodeCode: 'ChemEngine',
              systemCategory: 'base',
              no: 2,
              level: 3,
              parentId: '1-2',
              children: []
            },
            {
              nodeId: '1-2-3',
              nodeTitle: '储箱单机',
              peer: [
                createPeer(ETypeStructSystemType.SysML, 'StorageTank'),
                createPeer(ETypeStructSystemType.IDS, 'ChuXiang'),
                createPeer(ETypeStructSystemType.SysLink, 'XFC_AB_103'),
                createPeer(ETypeStructSystemType.EDS, 'FC_AB_103')
              ],
              nodeCode: 'StorageTank',
              systemCategory: 'base',
              no: 3,
              level: 3,
              parentId: '1-2',
              children: []
            }
          ]
        },
        {
          nodeId: '1-3',
          nodeTitle: '供电分系统',
          peer: [
            createPeer(ETypeStructSystemType.SysML, 'PowerSubSys'),
            createPeer(ETypeStructSystemType.IDS, 'GongDian'),
            createPeer(ETypeStructSystemType.SysLink, 'XFC_AC'),
            createPeer(ETypeStructSystemType.EDS, 'FC_AC')
          ],
          nodeCode: 'PowerSubSys',
          systemCategory: 'base',
          no: 3,
          level: 2,
          parentId: '1',
          children: [
            {
              nodeId: '1-3-1',
              nodeTitle: '太阳翼单机',
              peer: [
                createPeer(ETypeStructSystemType.SysML, 'SolarArray'),
                createPeer(ETypeStructSystemType.IDS, 'TaiYangYi'),
                createPeer(ETypeStructSystemType.SysLink, 'XFC_AC_104'),
                createPeer(ETypeStructSystemType.EDS, 'FC_AC_104')
              ],
              nodeCode: 'SolarArray',
              systemCategory: 'base',
              no: 1,
              level: 3,
              parentId: '1-3',
              children: []
            },
            {
              nodeId: '1-3-2',
              nodeTitle: '电池单机',
              peer: [
                createPeer(ETypeStructSystemType.SysML, 'Battery'),
                createPeer(ETypeStructSystemType.IDS, 'DianChi'),
                createPeer(ETypeStructSystemType.SysLink, 'XFC_AC_105'),
                createPeer(ETypeStructSystemType.EDS, 'FC_AC_105')
              ],
              nodeCode: 'Battery',
              systemCategory: 'base',
              no: 2,
              level: 3,
              parentId: '1-3',
              children: []
            },
            {
              nodeId: '1-3-3',
              nodeTitle: '电源控制器',
              peer: [
                createPeer(ETypeStructSystemType.SysML, 'PowerController'),
                createPeer(ETypeStructSystemType.IDS, 'DianYuan'),
                createPeer(ETypeStructSystemType.SysLink, 'XFC_AC_105'),
                createPeer(ETypeStructSystemType.EDS, 'FC_AC_106')
              ],
              nodeCode: 'PowerController',
              systemCategory: 'base',
              no: 3,
              level: 3,
              parentId: '1-3',
              children: []
            }
          ]
        },
        {
          nodeId: '1-4',
          nodeTitle: 'GNC分系统',
          peer: [
            createPeer(ETypeStructSystemType.SysML, 'GNC'),
            createPeer(ETypeStructSystemType.IDS, 'GNC'),
            createPeer(ETypeStructSystemType.SysLink, 'XFC_AD'),
            createPeer(ETypeStructSystemType.EDS, 'FC_AD')
          ],
          nodeCode: 'GNCSubSys',
          systemCategory: 'base',
          no: 4,
          level: 2,
          parentId: '1',
          children: []
        }
      ]
    }
    return oneNodeResult
  }
  const result = creteOneTypeStruct()
  if (tempId % 2===0) {
    result.children = []
    result.peer = []
  }
  return result
}

/**
 * --------------- * 获取EDS分系统列表接口 * --------------------
 */
interface ISysListItem {
  code: ETypeStructSystemType
  name: ETypeStructSystemType
}

interface ISysList {
  list: ISysListItem[]
}

export const getSysList = (): ISysList => {
  return {
    list: [
      {
        code: ETypeStructSystemType.IDS,
        name: ETypeStructSystemType.IDS
      },
      {
        code: ETypeStructSystemType.EDS,
        name: ETypeStructSystemType.EDS
      }
    ]
  }
}
/**
 * --------------- * 获取型号列表 * --------------------
 */
interface ICodeListItem {
  code: string
}

interface ICodeList {
  list: ICodeListItem[]
}

export const getCodeList = (): ICodeList => {
  return {
    list: [
      {
        code: 'SZ-8'
      },
      {
        code: 'SZ-10'
      }
    ]
  }
}

/**
 * --------------- * 生成结构树(参照其他系统生成) * --------------------
 */
export const createStructure = (): ITypeStruct => {
  const result = {
    nodeId: '1',
    nodeTitle: 'XX型号',
    peer: [],
    nodeCode: 'XFA-' + Random.string('upper', 10),
    systemCategory: 'base',
    no: 1,
    level: 1,
    parentId: '',
    children: [
      {
        nodeId: '1-1',
        nodeTitle: '通信分系统',
        peer: [],
        nodeCode: 'CommSubSys',
        systemCategory: 'base',
        no: 1,
        level: 2,
        parentId: '1',
        children: []
      },
      {
        nodeId: '1-2',
        nodeTitle: '推进分系统',
        peer: [],
        nodeCode: 'BoostSubSys',
        systemCategory: 'base',
        no: 2,
        level: 2,
        parentId: '1',
        children: [
          {
            nodeId: '1-2-1',
            nodeTitle: '电推发动机',
            peer: [],
            nodeCode: 'PowerEngine',
            systemCategory: 'base',
            no: 1,
            level: 3,
            parentId: '1-2',
            children: [
              {
                nodeId: '1-2-1-1',
                nodeTitle: '机械特性',
                peer: [],
                nodeCode: 'Mechanism',
                systemCategory: 'base',
                no: 1,
                level: 4,
                parentId: '1-2-1'
              },
              {
                nodeId: '1-2-1-2',
                nodeTitle: '电特性',
                peer: [],
                nodeCode: 'Electric',
                systemCategory: 'base',
                no: 2,
                level: 4,
                parentId: '1-2-1'
              },
              {
                nodeId: '1-2-1-3',
                nodeTitle: '热特性',
                peer: [],
                nodeCode: 'Thermal',
                systemCategory: 'base',
                no: 3,
                level: 4,
                parentId: '1-2-1'
              },
              {
                nodeId: '1-2-1-4',
                nodeTitle: '遥测参数',
                peer: [],
                nodeCode: 'Telemetering',
                systemCategory: 'base',
                no: 4,
                level: 4,
                parentId: '1-2-1'
              },
              {
                nodeId: '1-2-1-5',
                nodeTitle: '遥控指令',
                peer: [],
                nodeCode: 'Telecontrol',
                systemCategory: 'base',
                no: 5,
                level: 4,
                parentId: '1-2-1'
              }
            ]
          },
          {
            nodeId: '1-2-2',
            nodeTitle: '化推发动机',
            peer: [],
            nodeCode: 'ChemEngine',
            systemCategory: 'base',
            no: 2,
            level: 3,
            parentId: '1-2',
            children: []
          },
          {
            nodeId: '1-2-3',
            nodeTitle: '储箱单机',
            peer: [],
            nodeCode: 'StorageTank',
            systemCategory: 'base',
            no: 3,
            level: 3,
            parentId: '1-2',
            children: []
          }
        ]
      },
      {
        nodeId: '1-3',
        nodeTitle: '供电分系统',
        peer: [],
        nodeCode: 'PowerSubSys',
        systemCategory: 'base',
        no: 3,
        level: 2,
        parentId: '1',
        children: [
          {
            nodeId: '1-3-1',
            nodeTitle: '太阳翼单机',
            peer: [],
            nodeCode: 'SolarArray',
            systemCategory: 'base',
            no: 1,
            level: 3,
            parentId: '1-3',
            children: []
          },
          {
            nodeId: '1-3-2',
            nodeTitle: '电池单机',
            peer: [],
            nodeCode: 'Battery',
            systemCategory: 'base',
            no: 2,
            level: 3,
            parentId: '1-3',
            children: []
          },
          {
            nodeId: '1-3-3',
            nodeTitle: '电源控制器',
            peer: [],
            nodeCode: 'PowerController',
            systemCategory: 'base',
            no: 3,
            level: 3,
            parentId: '1-3',
            children: []
          }
        ]
      },
      {
        nodeId: '1-4',
        nodeTitle: 'GNC分系统',
        peer: [],
        nodeCode: 'GNCSubSys',
        systemCategory: 'base',
        no: 4,
        level: 2,
        parentId: '1',
        children: []
      }
    ]
  }
  return result
}

/**
 * --------------- * 获取节点类型 * --------------------
 */
interface INodeTypeListItem {
  code: string
  name: string
}

interface INodeTypeList {
  list: INodeTypeListItem[]
}

export const getNodeTypeList = (): INodeTypeList => {
  return {
    list: [
      {
        name: '系统级节点',
        code: 'system'
      },
      {
        name: '分系统级节点',
        code: 'subSystem'
      },
      {
        name: '单机级节点',
        code: 'equipment'
      }
    ]
  }
}

/**
 * --------------- * 结构树节点新增(型号、分系统用) * --------------------
 */
interface IAddTreeNode {
  id: string
  no: number
}
export const addTreeNode = (no: number): IAddTreeNode => {
  return {
    id: Random.id(),
    no
  }
}

/**
 * --------------- * 特性列表接口（固定值） * --------------------
 */
interface IConstantClassList {
  list: IConstantClassListItem[]
}
interface IConstantClassListItem {
  code: string
  name: string
}
export const getConstantClassList = (): IConstantClassList => {
  return {
    list: [
      {
        code: 'Mechanism',
        name: '机械特性'
      },
      {
        code: 'Electric',
        name: '电特性'
      },
      {
        code: 'Thermal',
        name: '热特性'
      },
      {
        code: 'Telemetering',
        name: '遥测参数'
      },
      {
        code: 'Telecontrol',
        name: '遥控指令'
      }
    ]
  }
}

/**
 * --------------- * 结构树单机节点新增 * --------------------
 */
export const addEquipmentNode = (no: number) => {
  return {
    id: Random.id(),
    no,
    classList: [
      { code: 'Mechanism', name: '机械特性', id: Random.id(), no: 1 },
      { code: 'Electric', name: '电特性', id: Random.id(), no: 2 },
      { code: 'Thermal', name: '热特性', id: Random.id(), no: 3 },
      { code: 'Telemetering', name: '遥测参数', id: Random.id(), no: 4 },
      { code: 'Telecontrol', name: '遥控指令', id: Random.id(), no: 5 }
    ]
  }
}

/**
 * --------------- * 结构树节点删除 * --------------------
 */
export const deleteTreeNode = () => {
  return {
    list: [
      {
        id: '42351.27567.26535.31738'
      },
      {
        id: '42351.27567.26535.31739'
      }
    ]
  }
}

/**
 * --------------- * 结构树编辑保存接口 * --------------------
 */
export const updateStructure = () => {
  return null
}
/**
 * --------------- * 获取SysML结构树（同步） * --------------------
 */
interface IBaseStructure {
  BaseNodeId: string
  nodeId: string
  nodeTitle: string
  nodeCode: string
  no: number
  level: number
  children?: IBaseStructure[]
}
interface ISysMLStructure extends IBaseStructure {}
const getSysMlStructureNode = () => {
  return {
    BaseNodeId: '1',
    nodeId: Random.id(),
    nodeTitle: '',
    nodeCode: '',
    no: 1,
    level: 1,
    children: [
      {
        BaseNodeId: '1-1',
        nodeId: Random.id(),
        nodeTitle: 'CommonSubSys',
        nodeCode: 'CommonSubSys',
        no: 1,
        level: 2,
        children: []
      },
      {
        BaseNodeId: '1-2',
        nodeId: Random.id(),
        nodeTitle: 'BoostSubSys',
        nodeCode: 'BoostSubSys',
        no: 1,
        level: 2,
        children: [
          {
            BaseNodeId: '1-2-1',
            nodeId: Random.id(),
            nodeTitle: 'PowerEngine',
            nodeCode: 'PowerEngine',
            no: 1,
            level: 3,
            children: []
          },
          {
            BaseNodeId: '1-2-2',
            nodeId: Random.id(),
            nodeTitle: 'ChemicalEngine',
            nodeCode: 'ChemicalEngine',
            no: 1,
            level: 3,
            children: []
          },
          {
            BaseNodeId: '1-2-3',
            nodeId: Random.id(),
            nodeTitle: 'StorageTank',
            nodeCode: 'StorageTank',
            no: 1,
            level: 3,
            children: []
          }
        ]
      },
      {
        BaseNodeId: '1-3',
        nodeId: Random.id(),
        nodeTitle: 'PowerSubSys',
        nodeCode: 'PowerSubSys',
        no: 1,
        level: 2,
        children: [
          {
            BaseNodeId: '1-3-1',
            nodeId: Random.id(),
            nodeTitle: 'SolarArray',
            nodeCode: 'SolarArray',
            no: 1,
            level: 3,
            children: []
          },
          {
            BaseNodeId: '1-3-2',
            nodeId: Random.id(),
            nodeTitle: 'Battery',
            nodeCode: 'Battery',
            no: 1,
            level: 3,
            children: []
          },
          {
            BaseNodeId: '1-3-3',
            nodeId: Random.id(),
            nodeTitle: 'PowerController',
            nodeCode: 'PowerController',
            no: 1,
            level: 3,
            children: []
          }
        ]
      },
      {
        BaseNodeId: '1-4',
        nodeId: Random.id(),
        nodeTitle: 'GNC',
        nodeCode: 'GNC',
        no: 1,
        level: 2,
        children: []
      }
    ]
  }
}
export const getSysMlStructure = (): ISysMLStructure => {
  return getSysMlStructureNode()
}
/**
 * --------------- * 获取IDS结构树接口（同步） * --------------------
 */
interface IIDSStructure extends IBaseStructure {}
export const getIDSStructure = (): IIDSStructure => {
  return getSysMlStructureNode()
}
/**
 * --------------- * 获取SysLink结构树接口（同步） * --------------------
 */
interface ISysLinkStructure extends IBaseStructure {}
export const getSysLinkStructure = (): ISysLinkStructure => {
  return getSysMlStructureNode()
}
/**
 * --------------- * EDS结构树接口(同步) * --------------------
 */
interface IEDSStructure extends IBaseStructure {}
export const getEDSStructure = (): IEDSStructure => {
  return getSysMlStructureNode()
}

/**
 * --------------- * 分系统列表接口 * --------------------
 */
export const getSubSystemList = () => {
  return {
    sysFlag: 'SysML',
    list: [
      {
        code: '分系统1',
        name: '分系统1'
      },
      {
        code: '分系统2',
        name: '分系统2'
      }
    ]
  }
}

/**
 * --------------- * 单机列表接口 * --------------------
 */
export const getEquipmentList = () => {
  return {
    sysFlag: 'TongXin',
    list: [
      {
        code: '单机1',
        name: '单机1'
      },
      {
        code: '单机2',
        name: '单机2'
      }
    ]
  }
}
/**
 * --------------- * 特性列表接口 * --------------------
 */
export const getClassList = () => {
  return {
    sysFlag: 'TongXin',
    list: [
      {
        code: '特性1',
        name: '特性1'
      },
      {
        code: '特性2',
        name: '特性2'
      }
    ]
  }
}
/**
 * --------------- * 编辑特性节点 * --------------------
 */

interface ICharacterListItem {
  code: string
  name: string
}
interface IEditClassNodeReq {
  parentId: string
  classList: IEditClassNodeItem[]
}

interface IEditClassNodeItem extends ICharacterListItem {
  id: string
}
export const editClassNode = (body: IEditClassNodeReq) => {
  return {
    classList: body.classList.map((item) => {
      return {
        ...item,
        id: item.id || Random.id()
      }
    })
  }
}
