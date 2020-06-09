# http测试插件使用指南

## 联系方式

1. 我的个人博客[sushao'bolg](https://www.sushao.blog)

2. 我的github[sushao](https://github.com/suxiaoshao)

3. 这个插件的开源地址[utools-http-test](https://github.com/suxiaoshao/utools-http-test)

4. 这是我插件在官方论坛的[帖子](https://yuanliao.info/d/1843)，这个帖子下回复我会有提醒的

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
