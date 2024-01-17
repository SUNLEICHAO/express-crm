# CRM 客户管理系统

> CRM, 销售机会信息管理(Customer Relationship Management)

## 运行提示

1. 安装依赖

   ```bash
   npm install
   ```

2. 启动数据库，或数据库集成环境（mamp），有需要也可启动数据库管理工具（tableplus）

3. 数据库迁移，数据初始化

   ``` bash
   # 运行数据库迁移
   knex migrate:latest
   # 回滚，需要时可执行
   # knex migrate:rollback
   # 填充初始数据
   knex seed:run
   ```

4. 项目启动

   ``` bash
   npm run dev
   ```

## 路由设计

+ [预约试驾](http://localhost:3000)
  
+ [工作人员登录](http://localhost:3000/admin/login)
+ [人员管理](http://localhost:3000/admin/user)
+ [线索管理](http://localhost:3000/admin/clue)
+ [线索1查看](http://localhost:3000/admin/clue/1)

## 表设计

1. 顾客表：
   属性：id，姓名，电话，来源，创建时间，跟踪销售，状态
2. 销售人员表
   属性：id，姓名，电话，密码，角色
3. 线索表
   属性：顾客id，时间，内容
4. 销售-顾客的对应表
   属性：销售id，顾客id

## 问题

+ （易错处）模板书写时，漏写例如`<div></div>`写成了`<div><div>`
+ （问题）页面“返回”按钮，用js原生location还是用express的内容
+ （问题）views页面提交操作时（修改操作），是在文件夹controller中，直接对model修改，还是调用后台api？（路由->controller（render）-->model->view->controller（api））
+ （问题？）在controller中，某个控制器所控制的model，需要用到另一种model时：直接引入该model；还是通过接口，将数据请求过来？
  解决：应该用model，controller和model交互比较合逻辑，再调用接口，多走了一层，因为接口同样也是调mdoel。
+ （问题）req.query和req.body什么区别？
  在jQuery中，data后接的数据，可以通过req.body拿到；req.query是从请求的url中的参数拿到的。get中，data中用query拿到，post中，data中用body拿到。
+ （问题）有些数据不存在的时候，直接报bug，可以显示为空

+ （操作问题）git add 操作怎么撤回
+ controller有两种，一种是路由时调用的(主要负责render)，另一种是view中调用的(主要是api调用)
+ （样式）线索过多后，页面样式需要调整
+ （样式，已完成）线索管理页面，应该可以滚动（已解决）
+ （已完成）登录功能
+ （已完成）落地页在获取用户姓名、手机之外还需要在获取 URL中获取来源参数，例如：`http://localhost:3000?utm=baidu` ，那么需要获取浏览器地址中 utm 的参数值，baidu 。
+ 缺少一个页面，“新建用户”，信息同“用户编辑”（在用户新增页面，输入用户姓名、电话、密码、角色提交后数据能存进数据库，成功返回到用户列表页面）
+ 线索编辑页面，状态和销售可以更改
+ 权限系统

## 优化

+ 数据筛选，可以根据`获取来源`或者是`销售`筛选一下
  弹窗，弹出来，提示选择哪一种。然后进行筛选

## api调用方式

+ 注册时，post
