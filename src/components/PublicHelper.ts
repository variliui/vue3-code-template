import { ElButton } from 'element-plus'
import type { ComponentPublicInstance } from 'vue'
// 在使用自动引入elementplus组件的时候手动引入会发生样式丢失的问题，
// 因此采用此方式进行中转，即可避免此问题，
// 问题发生的原因似乎在于开发服务器的情况下,在第二次及以后刷新的时候
// 打包时 index.mjs没有被引入，从而出现了与之相关的部分样式丢失
// 尚未找到更好的解决办法，并且使用pnpm 进行安装的时候，此中转站方式
// 会发生需要ts类型注释的问题，npm安装则无此问题
export const ElButtonES: typeof ElButton = ElButton

/**
 * el-select按钮组分组类型
 */
export interface ISelectOption {
  /**
   * 分组名称
   */
  label: string
  /**
   * 选项
   */
  options: ISelectOptionModel[]
}

/**
 * el-select按钮组options类型
 */
export interface ISelectOptionModel {
  /**
   * options的值选择之后赋值给model
   */
  value: string
  /**
   * 显示在select标签中
   */
  label: string
}

/**
 * 主体内容宽度
 */
export const mainBodyWidth = '16rem'

export type refItem = Element | ComponentPublicInstance | null

export enum ELMessageList {
  CreateSuccess = '创建成功',
  CreateFail = '创建失败',
  EditSuccess = '编辑成功',
  EditFail = '编辑失败',
  DeleteSuccess = '删除成功',
  DeleteFail = '删除失败',
  ChooseModel = '请先选择模型',
  ChooseDeleteNode = '请先选择要删除的节点',
  EditPreviousNode = '请先编辑上一个节点',
  GetClassListFail = '获取选项失败'
}

/**
 * 当前所有系统的枚举
 */
export enum EBaseSystemType {
  IDS = 'IDS',
  EDS = 'EDS',
  SysML = 'SysML',
  SysLink = 'SysLink',
  Base = 'Base'
}
