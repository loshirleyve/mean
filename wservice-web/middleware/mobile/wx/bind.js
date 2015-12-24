/**
 * Created by leon on 15/12/10.
 */

module.exports = function () {
    return function (req, res, next) {

        //var json = {
        //    id: 'oHc6KuIbVLNDWQp47SHKDKMYfE9Y',
        //    displayName: 'Leon',
        //    profileUrl: 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBWEiaMuo7VgBicD2BEMDwnr5iawCLarUOLoV4BZ4Dnf2fNkfE80Zr1LNQ5gJDCOLr7ibSJ2ibUlLNwnsw/0',
        //    provider: 'weixin',
        //    _raw: '{"openid":"opiJ6juS5dScQTveQnIZTBpmuQqA","nickname":"Leon","sex":1,"language":"zh_CN","city":"Shenzhen","province":"Guangdong","country":"CN","headimgurl":"http:\\/\\/wx.qlogo.cn\\/mmopen\\/ajNVdqHZLLBWEiaMuo7VgBicD2BEMDwnr5iawCLarUOLoV4BZ4Dnf2fNkfE80Zr1LNQ5gJDCOLr7ibSJ2ibUlLNwnsw\\/0","privilege":[],"unionid":"oHc6KuIbVLNDWQp47SHKDKMYfE9Y"}',
        //    _json: {
        //        openid: 'opiJ6juS5dScQTveQnIZTBpmuQqA',
        //        nickname: 'Leon',
        //        sex: 1,
        //        language: 'zh_CN',
        //        city: 'Shenzhen',
        //        province: 'Guangdong',
        //        country: 'CN',
        //        headimgurl: 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBWEiaMuo7VgBicD2BEMDwnr5iawCLarUOLoV4BZ4Dnf2fNkfE80Zr1LNQ5gJDCOLr7ibSJ2ibUlLNwnsw/0',
        //        privilege: [],
        //        unionid: 'oHc6KuIbVLNDWQp47SHKDKMYfE9Y'
        //    }
        //};
        //res.render("mobile/wx/bind", {
        //    "wxprofile": JSON.stringify(json)
        //});

        res.render("mobile/wx/bind", {
            "wxprofile": JSON.stringify(req.session.y9WxProfile)
        });


    }
};