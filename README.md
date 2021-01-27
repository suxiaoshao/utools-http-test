# http测试插件使用指南

## 联系方式

1. 我的个人博客[sushao'bolg](https://www.sushao.top)

2. 我的github[sushao](https://github.com/suxiaoshao)

3. 这个插件的开源地址[utools-http-test](https://github.com/suxiaoshao/utools-http-test)

4. 这是我插件在官方论坛的[帖子](https://yuanliao.info/d/1843)，这个帖子下回复我会有提醒的

## 更新


### 0.2.1

1. 修复自动删除过期的 cookie 部分的逻辑错误
2. 修复修改 cookie 页面点击修改时间页面奔溃的 bug
3. 修复代码页面显示代码阅读或者代码编写时切换标签页插件奔溃的 bug
4. 支持在 历史记录页面修改记录的名字和标签

### 0.2.0

1. 数据库更新

   本次更新将以往依靠 utools 官方的数据库迁移到了 sqlite数据库

   该数据库地址储存在  utools 目录的`utools\database\http`,下面的 `http.db` 文件

   这个目录也储存了 `setting.json` 设置文件和 `old.json` 旧数据文件

   如果想要多台机子同步的话,可以手动迁移 `utools\databse\http` 文件夹下的文件.

   * 数据迁移

     本版本不会删除之前的记录,反而把之前的数据记录在上文提到的 `old.json` 供用户查看

     当用户第一次使用版本时会将旧数据迁移至新数据库,而不用担心用户数据消失

2. 历史记录

   * http 标签

     新的数据库的支持下, `http测试插件` 实现了给 http 历史记录添加标签的功能

     在 http 保存页,即可管理 标签,右键点击标签支持删除,重命名标签

   * http 名字

     现在可以拥有多个同名的 http 历史了,再也不用向以前一样设置不同名的历史记录

     而且再次储存已经被存储的记录时,会直接修改旧纪录不会新建一个历史

   * http 历史搜索

     新的历史记录查看支持搜索和标签搜索,如下图所示

3. cookies

   新的版本将 cookies 独立出来储存在数据库, 这样多个 http 请求就能共享 cookies

   不过当用户每次进入插件时都会删除 cookie 中 max-age 和 expires 为 session的 cookie 记录和 超时的 cookie 记录

   但不会删除这两个字段其中一个合法且未超时的 cookie.当两个都存在时,以max-age 为准 (http 规范和多数浏览器遵循的规范).

   * cookie 匹配规则

     cookie 的匹配主要观察 http url是否和 cookie 的 `path` ,`domain` 两个字段是否一致

     主要参考 [mdn上的说明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)

   * cookies 管理

     在 cookies 页面支持 cookie 修改,删除,添加等功能,并且用 domain 属性分隔开

4. 多标签页

   本次更新添加了多标签页功能,支持多个标签页进行多个 http 请求,右键点击标签页就可管理标签页了,如下图

5. 支持作者

   本次更新添加了支持作者页面,可以通过支付宝或者微信支持鼓励作者,请作者喝一杯茶.

   > 注意: 支持作者并非强制或者购买,不支持作者也可享受本插件的所有功能


### 0.1.2

1. 修复中文字符错误的bug

2. 优化格式化方式

### 0.1.1

1. 代码编辑器实现响应式布局

2. responseContent的内容自动格式化，且设置为只读

### 0.1.0

1. 添加了历史记录的功能，可以把响应的request部分保存到utools的db数据库

2. 要请求后才能保存，不然是上次请求之前的或者默认的数据

3. 在历史页面可以读取或者删除历史记录

4. 下个版本加入本地储存的设置来确保隐私

### 0.0.3

1. 在response-headers页面添加了响应的status和响应时间时间显示（单位为毫秒）

2. 在response-data页面添加了response的body的Buffer的字节数

> 注:下个版本将加入历史记录

### 0.0.2

1. 添加了文件上传功能

   在request-content界面使用,name属性是上传时formData的第一个参数，
   不是文件名。

2. 添加了返回结果是content-type=image时，直接显示图片的功能，接下来可能会添加其他二进制显示。

## 使用

### 输入host、path、method

1. 在最上面的表单中可以输入这三个参数

2. 目前支持get、delete、head、options、post、put、patch这些http方法

3. host可输入完整url或者纯数字端口号,会自动解析的补全

### 添加request-headers和request-cookies

1. 支持添加这个两个参数,request-headers的优先级比request-cookies高

2. headers的name不允许重复，如果重复，以后面的为准

3. cookies支持path、domain、max-age等属性,只有当这三个属性匹配时,http连接才会带上这个cookies

4. 两个cookie的path、domain、name不允许同时相等,如果重复,以后面的为准

### request的body

1. 当method为GET、HEAD、DELETE、OPTIONS不带上body

2. 支持json、原生表单、和自定义

3. 自定义情况下，可以自行选择content-type

4. content-type-other会加在content-type后面

    ```javascript
   contentType=`${contentType}; ${contentTypeOther}`
    ```

5. headers的优先级比content-type高

### response-headers

1. 请求结束后可以查看response的headers

2. 会自动分析set-cookie，更新cookie


### response-body

1. 支持编码,会解析response的头部，自动得出编码方式，也可以设定

2. 显示支持json、xml、html等格式,会自动解析content-type，也可以设定
