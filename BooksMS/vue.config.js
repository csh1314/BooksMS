module.exports = {
    /*build*/
    publicPath: process.env.NODE_ENV === "production" ? "/Books/" : "/",
    pages: {
        index: {
            entry: "./src/views/index/main.js",//配置入口js文件
            template: "./src/views/index/index.html",//主页面
            filename: "index.html",//打包后的html文件名
            title: "BooksMS"//打包后的.html中<title>标签的文本内容
        },
        login: {
            entry: "./src/views/login/login.js",
            template: "./src/views/login/login.html",
            filename: "login.html",
            title: "UserLogin"
        },
        register: {
            entry: "./src/views/register/register.js",
            template: "./src/views/register/register.html",
            filename: "register.html",
            title: "UserRegister"
        },
        admin: {
            entry: "./src/views/admin/admin.js",
            template: "./src/views/admin/admin.html",
            filename: "admin.html",
            title: "Admin"
        }
    },

    lintOnSave: false,
    devServer: {
        //build前 port: 8000,
        port: 18080,
        proxy: {
            //build前有
            '/api': {
                target: 'http://127.0.0.1:18080/BooksMS/api/',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': ''  // rewrite path
                },
            }
        }
    }
}


