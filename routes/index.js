module.exports = app => {
    app.use("/folder", require('./folder'))
    app.use("/file", require('./file'))
}