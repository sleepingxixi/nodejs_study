module.exports = {
    app: {
        name: "pm2-test-server",
        script: "app.js",
        // 设置监听文件变化，进行重启。可以设置忽略监听的文件
        watch: true,
        ignore_watch: [
            "node_modules",
            "logs"
        ],
        // 设置多进程
        // instances: 4,
        // exec_mode: "cluster",
        // 重新设置日志文件的位置
        error_file: "logs/err.log",
        out_file: "logs/out.log",
        // 设置日志的格式
        log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
}