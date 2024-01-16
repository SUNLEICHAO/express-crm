# CRM 客户管理系统

> CRM, 销售机会信息管理(Customer Relationship Management)

## 路由设计

+ localhost:3000 -> 预约试驾
+ localhost:3000/admin/login -> 工作人员登录
+ localhost:3000/admin/clue -> 线索管理
+ localhost:3000/admin/clue/1 -> 线索1查看
+ localhost:3000/admin/user -> 人员管理

## 表设计

1. 顾客表：
   属性：id，姓名，电话，来源，创建时间，跟踪销售，状态
2. 销售人员表
   属性：id，姓名，电话，密码，角色
3. 线索表
   属性：顾客id，时间，内容
4. 销售-顾客的对应表
   属性：销售id，顾客id

## 易错处

+ 模板书写时，漏写例如`<div></div>`写成了`<div><div>`
+ 

## 问题

+ 页面“返回”按钮，用js原生location还是用express的内容
+ git add 操作怎么撤回
