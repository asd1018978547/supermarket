var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken') //用来生成和验证token
var multiparty = require('multiparty')
const con = require('./conn')


/* GET page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* ****************************************************账号管理************************************************ */
//登录
router.post('/login', (req, res, next) => {
  let { account, password } = req.body


  var sql = `SELECT * FROM user WHERE account='${account}' AND  password='${password}'`
  con.query(sql, (err, data) => {

    if (data.length > 0) {
      //生成一个token
      var token = jwt.sign({}, 'zhs', {
        expiresIn: 60 * 60   //单位秒
      })
      res.send({
        id: data[0].id,
        userGroup: data[0].userGroup,
        avatarUrl: data[0].avatarUrl,
        account: data[0].account,
        msg: '登录成功',
        token
      })
    } else {
      res.send({
        code: 1,
        msg: '登录失败！'
      })
    }
  })
})

//添加账号
router.post('/addaccount', (req, res) => {

  let { account, password, userGroup } = req.body
  var sql = `INSERT INTO user(account,password,userGroup) VALUES('${account}','${password}','${userGroup}')`
  con.query(sql, (err, data) => {
    if (data) {
      res.send({
        msg: '添加账号成功！'
      })
    } else {
      res.send({
        msg: '添加账号失败！'
      })
    }
  })
})

//修改密码
router.post('/changepwd', (req, res) => {
  let { id, oldPwd, newPwd } = req.body

  //先验证老密码是否正确
  var sql = `SELECT * FROM user WHERE id='${id}' AND  password='${oldPwd}'`

  con.query(sql, (err, data) => {
    if (err) throw err


    if (data.length > 0) {
      var sql = `UPDATE user SET password='${newPwd}' WHERE id=${id}`
      con.query(sql, (err, data) => {
        if (err) throw err

        if (data) {
          res.send('ok')
        } else {
          res.send('fail')
        }
      })
    } else {
      res.send('密码错误！')
    }
  })
})

//删除账号
router.get('/removeaccount', (req, res) => {
  let { id } = req.query
  var sql = `DELETE FROM user WHERE id=${id}`
  con.query(sql, (err, data) => {
    if (err) throw err
    if (data) {
      res.send('删除账号成功')
    } else {
      res.send('删除账号失败')
    }
  })
})

//获取全部账号
router.get('/user', (req, res) => {
  let { currentPage, pageSize } = req.query


  var index = (currentPage - 1) * pageSize
  //(this.currentPage - 1) * this.pageSize,
  //this.currentPage * this.pageSize

  var sql = `SELECT account,id,userGroup,avatarUrl FROM user LIMIT ${index},${pageSize}`//从索引开始，找到几条条数据
  var totalsql = `SELECT COUNT(*) FROM user`

  con.query(sql, (err, data) => {
    if (err) throw err

    con.query(totalsql, (err, result) => {
      if (err) throw err
      res.send({
        data,
        total: result[0]["COUNT(*)"]
      })
    })
  })
})

//获取token
router.get('/gettoken', (req, res) => {
  jwt.verify(req.query.token, 'zhs', (err, decode) => {
    if (err) {
      //err时间已经过期或者token对象不存在
      res.send("timeout")
    } else {
      //还在有效期
      res.send('ok')
    }


  })
})




/* ****************************************************商品管理************************************************ */

//添加商品
router.get('/addgoods', (req, res) => {
  // category: "", //商品分类
  //       name: "", //商品名称
  //       salePrice: "", //商品售价
  //       marketPrice: "", //市场价
  //       stockPrice: "", //商品进价
  //       stockCount: "", //入库数量
  //       commodityWeight: "", //商品重量
  //       commodityUnit: "", //商品单位
  //       vipDiscount: "", //会员优惠
  //       promotion: "", //是否促销
  //       goodsDesc: ""//商品介绍
  let { barCode, category, name, salePrice, marketPrice, stockPrice, stockCount, commodityWeight, commodityUnit, vipDiscount, promotion, goodsDesc } = req.query



  var sql = `INSERT INTO commodity(barCode,category, name, salePrice, marketPrice, stockPrice, stockCount, commodityWeight, commodityUnit, vipDiscount, promotion, goodsDesc) VALUES('${barCode}','${category}','${name}', '${salePrice}', '${marketPrice}', '${stockPrice}', '${stockCount}', '${commodityWeight}', '${commodityUnit}', '${vipDiscount}', '${promotion}', '${goodsDesc}')`
  con.query(sql, (err, data) => {
    if (err) throw err

    if (data) {
      res.send('ok')
    } else {
      res.send('fail')
    }
  })
})


//获取商品
router.get('/goods', (req, res) => {

  let { currentPage, pageSize, keyWorld, category } = req.query

  var sql;
  var totalsql;
  var index = (currentPage - 1) * pageSize //起始索引



  if (keyWorld && keyWorld == '') {

    //进入模糊搜索
    //从索引开始，找到几条数据
    sql = `SELECT * FROM commodity WHERE name LIKE '%${keyWorld}%' && category = '${category}' LIMIT ${index}, ${pageSize} `
    totalsql = ` SELECT COUNT(*) FROM commodity WHERE name LIKE '%${keyWorld}%' && category = '${category}' `
  } else if (category != 0 && keyWorld == '') {
    //搜索单个类型的商品   商品类型不为全部商品并且没有输入关键字
    sql = `SELECT * FROM commodity WHERE category = '${category}' LIMIT ${index}, ${pageSize} `
    totalsql = ` SELECT COUNT(*) FROM commodity WHERE category = '${category}' `
  } else if (category == 0 && keyWorld != '') {
    //在全部商品里搜索单个商品
    sql = `SELECT * FROM commodity WHERE name LIKE '%${keyWorld}%' LIMIT ${index}, ${pageSize} `
    totalsql = ` SELECT COUNT(*) FROM commodity WHERE name LIKE '%${keyWorld}%' `
  } else if (category == 0 && keyWorld == '') {
    //点击了全部商品但没有输入关键字
    var sql = `SELECT * FROM commodity LIMIT ${index}, ${pageSize} `//从索引开始，找到几条数据
    totalsql = `SELECT COUNT(*) FROM commodity`
  } else {
    //普通获取
    var sql = `SELECT * FROM commodity LIMIT ${index}, ${pageSize} `//从索引开始，找到几条数据
    totalsql = `SELECT COUNT(*) FROM commodity`
  }

  //(this.currentPage - 1) * this.pageSize,
  //this.currentPage * this.pageSize

  con.query(sql, (err, data) => {


    if (err) throw err

    con.query(totalsql, (err, result) => {
      if (err) throw err
      res.send({
        data,
        total: result[0]["COUNT(*)"]
      })

    })
  })

})

//删除商品
router.get('/removegood', (req, res) => {
  let { id } = req.query
  var sql = `DELETE FROM commodity WHERE id=${id}`
  con.query(sql, (err, data) => {
    if (err) throw err
    if (data) {
      res.send('ok')
    } else {
      res.send('fail')
    }
  })
})
//更新商品
router.get('/updatagoods', (req, res) => {

  let { category, name, salePrice, marketPrice, stockPrice, stockCount, commodityWeight, commodityUnit, vipDiscount, promotion, goodsDesc, id } = req.query

  var sql = `UPDATE commodity SET category='${category}',name='${name}',salePrice='${salePrice}',marketPrice='${marketPrice}',stockPrice='${stockPrice}',stockCount='${stockCount}',commodityWeight='${commodityWeight}',commodityUnit='${commodityUnit}',vipDiscount='${vipDiscount}',promotion='${promotion}',goodsDesc='${goodsDesc}' WHERE id=${id}; `


  con.query(sql, (err, data) => {
    if (err) throw err

    if (data) {
      res.send('ok')
    } else {
      res.send('fail')
    }
  })
})

router.post('/upload', (req, res) => {
  //生成multiparty对象，并配置上传目标路径 uploadDir: 文件上传以后保存的路径
  var form = new multiparty.Form({ uploadDir: './public/images' });


  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    var obj = {};

    var filesTmp = JSON.stringify(files, null, 2);
    //只要err存在，则表示图片上传失败
    if (err) throw err

    else {
      //上传成功以后执行的代码
      // path: 'public\\userheaders\\CgmLRgBLcojO5kDYAwD85G4g.jpg'
      let path = files.file[0].path //接收到图片PATH
      path = path.replace('public\\', '')
      path = path.replace('\\', '/')


      console.log(path)
      //保存到user表对应数据的avartarURL

      let sql = `UPDATE user SET avatarUrl='${path}' WHERE id='${req.query.id}'`
      con.query(sql, (err, data) => {
        if (err) throw err

        //把完整图片地址发送给path
        res.send(path)
      })

    }
  });


})

//---------------------------------------------文件上传-------------------------------
module.exports = router;
