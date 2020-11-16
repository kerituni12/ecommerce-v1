const Order = require("../order/order.model");
const { APIError } = require("@helpers/ErrorHandler");

function sortObject(o) {
  let sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

exports.createPaymentUrl = async function (req, res, next) {
  try {
    const { _id, ...orderBody } = req.body.order;
    const order = new Order(orderBody);
    const orderData = await order.save();

    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const dateFormat = require("dateformat");

    const date = new Date();

    const createDate = dateFormat(date, "yyyymmddHHmmss");
    const orderId = dateFormat(date, "HHmmss");

    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const returnUrl = process.env.VNP_RETURN_URL;
    let vnpUrl = process.env.VNP_URL;

    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = "VND";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_OrderInfo"] = orderData._id + "";
    vnp_Params["vnp_Amount"] = orderData.totalPrice * 100;
    // vnp_Params["vnp_idOrder"] = orderData._id + "";

    vnp_Params = sortObject(vnp_Params);

    const querystring = require("qs");
    const signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

    const sha256 = require("sha256");

    const secureHash = sha256(signData);

    vnp_Params["vnp_SecureHashType"] = "SHA256";
    vnp_Params["vnp_SecureHash"] = secureHash;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
   
    //Neu muon dung Redirect thi dong dong ben duoi
    res.cookie("orderId", orderData._id + "", { maxAge: 720000 }).json({ code: "00", vnpUrl });
    //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
    // res.redirect(vnpUrl);
  } catch (err) {
    next(err);
  }
};

exports.getVnPayReturn = async function (req, res, next) {
  let vnp_Params = req.query;

  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  const tmnCode = process.env.VNP_TMNCODE;
  const secretKey = process.env.VNP_HASH_SECRET;

  const querystring = require("qs");
  const signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

  const sha256 = require("sha256");

  const checkSum = sha256(signData);

  if (secureHash === checkSum) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    try {
      const result = await Order.findOneAndUpdate(
        { _id: vnp_Params["vnp_OrderInfo"] },
        { isPaid: true },
        { new: true }
      );
      if (result === null) throw new APIError({ message: "Order not exits" });
      return res.cookie("vnpay", "success", { maxAge: 720000 }).redirect("http://localhost:3000/order");
    } catch (err) {
      next(err);
    }
  } else {
    res.cookie("vnpay", "fail", { maxAge: 720000 }).redirect("http://localhost:3000/order");
  }
};
