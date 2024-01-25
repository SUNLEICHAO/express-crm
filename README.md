# CRM 客户管理系统(更新一波1.25)

> CRM, 销售机会信息管理(Customer Relationship Management)
>
> v1.0，整体功能完成
>
> v1.1，分页功能完成
>
> v1.2，部分RABC实现
>
> v1.3，代码优化



## 运行提示

1. 安装依赖

   ```bash
   npm install
   ```

2. 启动数据库或数据库集成环境（mamp），有需要也可启动数据库管理工具（tableplus）

3. 新增`.env`文件，根据`.env-example`文件提示在文件中补充信息

   ```
   # 例如
   DB_HOST = "127.0.0.1"
   DB_PORT = "3306"
   DB_NAME = "crmapp"
   DB_USER = "root"
   DB_PASSWORD = "root"
   JWT_SECRET = "sea"
   ```
4. Migrate：数据库中新建表，数据初始化

   ``` bash
   # 运行数据库迁移
   knex migrate:latest
   # 回滚，需要时可执行
   # knex migrate:rollback
   # 填充初始数据
   knex seed:run
   ```

5. 项目启动

   ``` bash
   npm start
   # 或者
   npm run dev
   ```

5. 登录信息

   管理员角色登录，账号：`13200000001`，密码:`1234`

   

## 路由设计

+ [预约试驾🔗](http://localhost:3000)
  
+ [工作人员登录🔗](http://localhost:3000/admin/login)
+ [人员管理🔗](http://localhost:3000/admin/user)
+ [线索管理🔗](http://localhost:3000/admin/clue)
+ [线索1查看🔗](http://localhost:3000/admin/clue/1)



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

+ （易出错）有些数据不存在的时候，直接报bug，解决：可以设置为空

+ （问题）页面“返回”按钮，用js原生location还是用express的内容

+ （问题）views页面提交操作时（修改操作），在文件夹controller中，直接对model修改，还是调用后台api？（路由->controller（render）-->model->view->controller（api））

+ （问题？）在controller中，某个控制器所控制的model，需要用到另一种model时：直接引入该model；还是通过接口，将数据请求过来？
  解决：应该用model，controller和model交互比较合逻辑，再调用接口，多走了一层，因为接口同样也是调mdoel。
  
+ （问题）req.query和req.body什么区别？
  
  答：在jQuery中，data后接的数据，可以通过req.body拿到；req.query是从请求的url中的参数拿到的。get中，data中用query拿到，post中，data中用body拿到。
  
+ （操作问题）git add 操作怎么撤回

+ controller有两种，一种是路由时调用的(主要负责render)，另一种是view中调用的(主要是api调用)

+ 页面跳转：`location.href = "/admin/user";`      

+ ```javascript
  // 跳转
  location.href = "/admin/user"
  // 页面重载
  location.reload()
  ```

  

**样式问题**

+ （样式）线索过多后，页面样式需要调整

+ （样式，已完成）线索管理页面，应该可以滚动（已解决）

  

## 待完成&待优化

**已完成**

+ （已完成）登录功能

+ （已完成）增加了一个nunjucks的filter：statusMap，在模板中对数据直接转换为响应的字符串。

+ （完成）权限系统

+ （已完成）落地页在获取用户姓名、手机之外还需要在获取 URL中获取来源参数，例如：`http://localhost:3000?utm=baidu` ，那么需要获取浏览器地址中 utm 的参数值，baidu 。

+ （已完成）线索编辑页面，状态和销售可以更改]

+ （已完成）缺少一个页面，“新建用户”，信息同“用户编辑”（在用户新增页面，输入用户姓名、电话、密码、角色提交后数据能存进数据库，成功返回到用户列表页面）

+ （已完成）权限判断用中间件完成

+ （bug，已解决）没有任何权限的用户登陆后，无法再跳转至登录页面，因为此时已登录，有登录token，但无访问页面的权限。解决办法：登陆时，直接提示不可以访问。

  

**待完成**

+ （优化）数据筛选，可以根据`获取来源`或者是`销售`筛选一下。弹窗，弹出来，提示选择哪一种。然后进行筛选
+ （问题）当前的权限系统的软件层已完成；设计层不完善，待构思……
+ （bug）当仅无clue权限时，默认跳转该页面会直接报错。
+ （问题）无法把权限和将要跳转的页面，一一对应，而统一管理权限。当前用的indexOf字符串判断，例如在权限列表中`['user, clue']`遍历查找，是否有元素存在于`admin/clue`中，若有，则有此权限。
+ 弹窗没有取消按钮

**待优化**

+ 数据名字要统一



## RABC权限系统

```
users 用户表（用户名字，电话，密码……）
roles 角色表（角色名称）
user_roles 用户角色关联表（用户id，角色id）
permission_groups 权限分组表（ 权限太多时候用来分组，也可以不用 ）
permissions 权限表（权限名称）
role_permissions 角色和权限关联表（角色id，权限id）
```

注：**用户表**----<用户-角色关系表>----**角色表**----<角色-权限关系表>----**权限表**



**crm项目中加入RABC权限系统**

> 用户的角色管理：在用户表的编辑中，显示该用户对应的角色。在角色项中，显示当前的角色名称。在userController.showOne中，通过用户id，在”用户-角色表“中查找用户id对应的角色id，若无，返回”暂未设定“，若存在，则返回该值。

+ 角色新增，已完成。（在系统初始化时没有赋予角色的；新建角色的时候要选角色）

+ 角色删减，已完成。
+ 角色修改，已完成。
+ 角色查找，已完成。



两种权限：user（人员管理和角色管理）；clue（线索管理）。

四种情况

+ 两个权限都有，全部权限都有。
+ 只有user权限，没有线索管理导航及无法访问该页面。
+ 只有clue权限，没有人员管理和角色管理。
+ 没有权限，无法登录系统











