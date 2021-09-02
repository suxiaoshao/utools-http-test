# http 测试插件使用指南

## 联系方式

1. 我的个人博客[sushao'bolg](https://www.sushao.top)

2. 我的 github[sushao](https://github.com/suxiaoshao)

3. 这个插件的开源地址[utools-http-test](https://github.com/suxiaoshao/utools-http-test)

4. 这是我插件在官方论坛的[帖子](https://yuanliao.info/d/1843)，这个帖子下回复我会有提醒的

## 更新

### 0.2.2

1. 数据库改进

   之前因为数据库和插件渲染 js 线程是一个,读取数据库时间太久,现在数据库运行放到 `web worker` 中运行,和渲染的 js 可以同步运行,这样避免了插件卡死.

2. 历史记录改进

   历史记录现在可以查看更多信息,包括 tag, http 方法, url, 名字

   筛选功能也获得了改进,搜索时支持名字, url

   还支持方法匹配

### 0.2.1

1. 修复自动删除过期的 cookie 部分的逻辑错误
2. 修复修改 cookie 页面点击修改时间页面奔溃的 bug
3. 修复代码页面显示代码阅读或者代码编写时切换标签页插件奔溃的 bug
4. 支持在 历史记录页面修改记录的名字和标签

### 0.2.0

1. 数据库更新

   本次更新将以往依靠 utools 官方的数据库迁移到了 sqlite 数据库

   该数据库地址储存在 utools 目录的`utools\database\http`,下面的 `http.db` 文件

   这个目录也储存了 `setting.json` 设置文件和 `old.json` 旧数据文件

   如果想要多台机子同步的话,可以手动迁移 `utools\databse\http` 文件夹下的文件.

   - 数据迁移

     本版本不会删除之前的记录,反而把之前的数据记录在上文提到的 `old.json` 供用户查看

     当用户第一次使用版本时会将旧数据迁移至新数据库,而不用担心用户数据消失

2. 历史记录

   - http 标签

     新的数据库的支持下, `http测试插件` 实现了给 http 历史记录添加标签的功能

     在 http 保存页,即可管理 标签,右键点击标签支持删除,重命名标签

   - http 名字

     现在可以拥有多个同名的 http 历史了,再也不用向以前一样设置不同名的历史记录

     而且再次储存已经被存储的记录时,会直接修改旧纪录不会新建一个历史

   - http 历史搜索

     新的历史记录查看支持搜索和标签搜索,如下图所示

3. cookies

   新的版本将 cookies 独立出来储存在数据库, 这样多个 http 请求就能共享 cookies

   不过当用户每次进入插件时都会删除 cookie 中 max-age 和 expires 为 session 的 cookie 记录和 超时的 cookie 记录

   但不会删除这两个字段其中一个合法且未超时的 cookie.当两个都存在时,以 max-age 为准 (http 规范和多数浏览器遵循的规范).

   - cookie 匹配规则

     cookie 的匹配主要观察 http url 是否和 cookie 的 `path` ,`domain` 两个字段是否一致

     主要参考 [mdn 上的说明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)

   - cookies 管理

     在 cookies 页面支持 cookie 修改,删除,添加等功能,并且用 domain 属性分隔开

4. 多标签页

   本次更新添加了多标签页功能,支持多个标签页进行多个 http 请求,右键点击标签页就可管理标签页了,如下图

5. 支持作者

   本次更新添加了支持作者页面,可以通过支付宝或者微信支持鼓励作者,请作者喝一杯茶.

   > 注意: 支持作者并非强制或者购买,不支持作者也可享受本插件的所有功能

### 0.1.2

1. 修复中文字符错误的 bug

2. 优化格式化方式

### 0.1.1

1. 代码编辑器实现响应式布局

2. responseContent 的内容自动格式化，且设置为只读

### 0.1.0

1. 添加了历史记录的功能，可以把响应的 request 部分保存到 utools 的 db 数据库

2. 要请求后才能保存，不然是上次请求之前的或者默认的数据

3. 在历史页面可以读取或者删除历史记录

4. 下个版本加入本地储存的设置来确保隐私

### 0.0.3

1. 在 response-headers 页面添加了响应的 status 和响应时间时间显示（单位为毫秒）

2. 在 response-data 页面添加了 response 的 body 的 Buffer 的字节数

> 注:下个版本将加入历史记录

### 0.0.2

1. 添加了文件上传功能

   在 request-content 界面使用,name 属性是上传时 formData 的第一个参数，
   不是文件名。

2. 添加了返回结果是 content-type=image 时，直接显示图片的功能，接下来可能会添加其他二进制显示。

## 使用

### 输入 host、path、method

1. 在最上面的表单中可以输入这三个参数

2. 目前支持 get、delete、head、options、post、put、patch 这些 http 方法

3. host 可输入完整 url 或者纯数字端口号,会自动解析的补全

### 添加 request-headers 和 request-cookies

1. 支持添加这个两个参数,request-headers 的优先级比 request-cookies 高

2. headers 的 name 不允许重复，如果重复，以后面的为准

3. cookies 支持 path、domain、max-age 等属性,只有当这三个属性匹配时,http 连接才会带上这个 cookies

4. 两个 cookie 的 path、domain、name 不允许同时相等,如果重复,以后面的为准

### request 的 body

1. 当 method 为 GET、HEAD、DELETE、OPTIONS 不带上 body

2. 支持 json、原生表单、和自定义

3. 自定义情况下，可以自行选择 content-type

4. content-type-other 会加在 content-type 后面

   ```javascript
   contentType = `${contentType}; ${contentTypeOther}`;
   ```

5. headers 的优先级比 content-type 高

### response-headers

1. 请求结束后可以查看 response 的 headers

2. 会自动分析 set-cookie，更新 cookie

### response-body

1. 支持编码,会解析 response 的头部，自动得出编码方式，也可以设定

2. 显示支持 json、xml、html 等格式,会自动解析 content-type，也可以设定
