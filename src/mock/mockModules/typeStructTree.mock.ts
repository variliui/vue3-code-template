import { SUCCESS_CODE, timeout, urlPrefix } from './helper'
import { MockMethod } from 'vite-plugin-mock'
import {
  createTypeStructTreeData,
  getTopNodeList,
  getStructureByTopNodeCode,
  getSysList,
  getCodeList,
  createStructure,
  getNodeTypeList,
  addTreeNode,
  getConstantClassList,
  addEquipmentNode,
  deleteTreeNode,
  updateStructure,
  getSysMlStructure,
  getIDSStructure,
  getSysLinkStructure,
  getEDSStructure,
  getSubSystemList,
  getEquipmentList,
  getClassList,
  editClassNode
} from '../dataSource/typeStructSource'

const mockTypeStructTreeData = [createTypeStructTreeData()]

const typeStructComparePrefix = 'resource/compare/'

export default [
  // 获取关系矩阵关系的接口
  {
    url: urlPrefix + 'searchFullTypeStruct',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: mockTypeStructTreeData
      }
    }
  },
  //1 结构树页面top选择型号列表接口
  {
    url: urlPrefix + typeStructComparePrefix + 'getTopNodeList',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE ,
        msg: '',
        data: getTopNodeList(2)
      }
    }
  },
  //2 根据选择的型号取得存在的结构树
  {
    url: urlPrefix + typeStructComparePrefix + 'getStructureByTopNodeCode',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { nodeCode } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getStructureByTopNodeCode(nodeCode)
      }
    }
  },
  //3 参考领域列表接口
  {
    url: urlPrefix + typeStructComparePrefix + 'getSysList',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getSysList()
      }
    }
  },
  //4 获取型号列表 
  // @deprecated 废弃
  {
    url: urlPrefix + typeStructComparePrefix + 'getCodeList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { sysFlag } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getCodeList()
      }
    }
  },
  //5 生成结构树(参照其他系统生成)
  {
    url: urlPrefix + typeStructComparePrefix + 'createStructure',
    method: 'post',
    timeout,
    response: ({ query }) => {
      const { modelCode } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: createStructure()
      }
    }
  },
  //6获取节点类型
  //https://www.nplmtest.cast/3dspace/resource/compare/getNodeTypeList
  {
    url: urlPrefix + typeStructComparePrefix + 'getNodeTypeList',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getNodeTypeList()
      }
    }
  },

  //7结构树节点新增(型号、分系统用)
  //https://www.nplmtest.cast/3dspace/resource/compare/addTreeNode
  {
    url: urlPrefix + typeStructComparePrefix + 'addTreeNode',
    method: 'post',
    timeout,
    response: ({ body }) => {
      //   const requestBody: {
      //     nodeType: string
      //     title: string
      //     code: string
      //     parentId: string
      //   } = body as any
      const { no } = body
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: addTreeNode(no)
      }
    }
  },

  //8特性列表接口（固定值）
  //https://www.nplmtest.cast/3dspace/resource/compare/getConstantClassList
  {
    url: urlPrefix + typeStructComparePrefix + 'getConstantClassList',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getConstantClassList()
      }
    }
  },

  //9结构树单机节点新增
  //https://www.nplmtest.cast/3dspace/resource/compare/addEquipmentNode
  {
    url: urlPrefix + typeStructComparePrefix + 'addEquipmentNode',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const { no } = body
      //   const requestBody: {
      //     classList: {
      //       code: string
      //       name: string
      //     }[]
      //     title: string
      //     code: string
      //     parentId: string
      //   } = body as any
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: addEquipmentNode(no)
      }
    }
  },

  //10 结构树节点删除
  //https://www.nplmtest.cast/3dspace/resource/compare/deleteTreeNode
  {
    url: urlPrefix + typeStructComparePrefix + 'deleteTreeNode',
    method: 'post',
    timeout,
    response: ({ body }) => {
      //   const requestBody: {
      //     classList: {
      //       code: string
      //       name: string
      //     }[]
      //     title: string
      //     code: string
      //     parentId: string
      //   } = body as any
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: deleteTreeNode()
      }
    }
  },

  //11结构树编辑保存接口
  //https://www.nplmtest.cast/3dspace/resource/compare/updateStructure
  {
    url: urlPrefix + typeStructComparePrefix + 'updateStructure',
    method: 'post',
    timeout,
    response: ({ body }) => {
      //   const requestBody: {
      //     classList: {
      //       code: string
      //       name: string
      //     }[]
      //     title: string
      //     code: string
      //     parentId: string
      //   } = body as any
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: updateStructure()
      }
    }
  },

  //12获取SysML结构树（同步）
  // https://www.nplmtest.cast/3dspace/resource/compare/getSysMlStructure
  {
    url: urlPrefix + typeStructComparePrefix + 'getSysMlStructure',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { BaseSystemId, SysMlSystemId } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getSysMlStructure()
      }
    }
  },

  //13获取IDS结构树接口（同步）
  // https://www.nplmtest.cast/3dspace/resource/compare/getIDSStructure
  {
    url: urlPrefix + typeStructComparePrefix + 'getIDSStructure',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { BaseSystemId, IDSSystemId } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getIDSStructure()
      }
    }
  },

  //14获取SysLink结构树接口(同步)
  // https://www.nplmtest.cast/3dspace/resource/compare/getSysLinkStructure
  {
    url: urlPrefix + typeStructComparePrefix + 'getSysLinkStructure',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { BaseSystemId, IDSSystemId } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getSysLinkStructure()
      }
    }
  },

  //15 EDS结构树接口(同步)
  // https://www.nplmtest.cast/3dspace/resource/compare/getEDSStructure
  {
    url: urlPrefix + typeStructComparePrefix + 'getEDSStructure',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { BaseSystemId, IDSSystemId } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getEDSStructure()
      }
    }
  },

  //16分系统列表接口
  //https://www.nplmtest.cast/3dspace/resource/compare/getSubSystemList
  {
    url: urlPrefix + typeStructComparePrefix + 'getSubSystemList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { code, sysFlag } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getSubSystemList()
      }
    }
  },

  //17 单机列表接口
  //https://www.nplmtest.cast/3dspace/resource/compare/getEquipmentList
  {
    url: urlPrefix + typeStructComparePrefix + 'getEquipmentList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { code, subSys, sysFlag } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getEquipmentList()
      }
    }
  },

  //18特性列表接口
  //https://www.nplmtest.cast/3dspace/resource/compare/getClassList
  {
    url: urlPrefix + typeStructComparePrefix + 'getClassList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { code, subSys, equipment, sysFlag } = query
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: getClassList()
      }
    }
  },

  //19编辑特性节点
  //https://www.nplmtest.cast/3dspace/resource/compare/editClassNode
  {
    url: urlPrefix + typeStructComparePrefix + 'editClassNode',
    method: 'post',
    timeout,
    response: ({ body }) => {
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: editClassNode(body as any)
      }
    }
  }
] as MockMethod[]
