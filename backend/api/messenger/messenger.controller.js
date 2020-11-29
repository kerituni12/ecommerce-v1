const client = require("twilio")(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const Mess = require("./messenger.model");
const User = require("../user/user.model");
const Order = require("../order/order.model");
const { randomNumber } = require("@helpers/utility");
const request = require("request");

// const PAGE_ACCESS_TOKEN =
// "EAAE12x70ZBswBAIIatIqGBjC1dfVJonE0otWKXh6OILiEPBv3w3Dvi09GvDgzI4ZAGIK0fw67U3cMg1ybPIoguuVys7wMd3ZAS7bUOxSy7uZBjm4KZCss3vc3RwAUVHU0KYZB2JoY5JmyYZChgFJm5YShlvtzFkLd8MVUCMk3Jk64V67yAyfaE7";

//Handler LoopMessage
// B1 : check mail = true -> save temp pass and request pass
// B2 : hash pass anh check with temp pass , check isadmin
// B3 : if pass = true -> login success -> reset loop = 0

function handleLoopMessage(sender_psid, received_message) {
  let response;
  Mess.findOne(
    {
      userId: sender_psid,
    },
    async function (err, mess) {
      if (mess) {
        switch (mess.loop) {
          case 1: //
            User.findOne(
              {
                phone: received_message.text,
              },
              async function (err, user) {
                if (user) {
                  response = {
                    text: "Vui lòng nhập mã otp",
                  };
                  callSendAPI(sender_psid, response);
                  try {
                    client.verify
                      .services(process.env.VERIFY_SERVICE_SID)
                      .verifications.create({
                        to: `+${received_message.text}`,
                        channel: "sms",
                      })
                      .then((data) => {
                        console.log("da chay xong");
                      });
                  } catch (err) {
                    next(err);
                  }
                  mess.loop = 2;
                  mess.tmpPhone = received_message.text;
                  if (user.role == "admin") mess.admin = 1;
                  mess.save(function (err) {
                    if (err) return console.log(err);
                  });
                } else {
                  response = {
                    text: "Số điện thoại không đúng hoặc không tồn tại",
                  };
                  callSendAPI(sender_psid, response);
                }
              }
            );
            return;

          case 2:
            if (received_message.text.length !== 6) {
              response = {
                text: "Mã OTP không hợp lệ",
              };
              callSendAPI(sender_psid, response);
              return;
            }
            try {
              client.verify
                .services(process.env.VERIFY_SERVICE_SID)
                .verificationChecks.create({
                  to: `+${mess.tmpPhone}`,
                  code: received_message.text,
                })
                .then((data) => {
                  console.log(data);
                  if (data.status === "approved") {
                    if (mess.admin) {
                      response = {
                        text: "Bạn đã đăng nhập thành công",
                      };
                      callSendAPI(sender_psid, response);
                      mess.loop = 0;
                      mess.save(function (err) {
                        if (err) return console.log(err);
                      });
                    } else {
                      response = {
                        text: "Vui lòng đăng nhập với tài khoản admin",
                      };
                      callSendAPI(sender_psid, response);
                      mess.loop = 0;
                      mess.save(function (err) {
                        if (err) return console.log(err);
                      });
                    }
                  } else {
                    response = {
                      text: "Mã OTP không hợp lệ",
                    };
                    callSendAPI(sender_psid, response);
                  }
                });
            } catch (err) {
              console.log(err);
            }

            return;

          default:
            response = {
              attachment: {
                type: "template",
                payload: {
                  template_type: "button",
                  text: "Nhấn button để login !",
                  buttons: [
                    {
                      type: "postback",
                      title: "Loop mess ",
                      payload: "login",
                    },
                  ],
                },
              },
            };
            callSendAPI(sender_psid, response);
            return;
        }
      }
    }
  );
}

/**
 * This function to handle message for event
 * @param {*} sender_psid
 * @param {*} received_message
 */
function handleMessage(sender_psid, received_message) {
  let response;

  switch (received_message.text.toLowerCase()) {
    case "biểu đồ năm nay":
      sendChart("year", sender_psid);
      return;
    case "biểu đồ hôm nay":
      sendChart("day", sender_psid);
      return;

    case "logout":
      Mess.findOneAndRemove(
        {
          userId: sender_psid,
        },
        function (err) {
          if (err) return console.log(err);
          callSendAPI(sender_psid, {
            text: "đã logout",
          });
        }
      );
      return;
    case "login":
      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Vui lòng nhấn button để đăng nhập!",
            buttons: [
              {
                type: "postback",
                title: "login",
                payload: "login",
              },
            ],
          },
        },
      };
      callSendAPI(sender_psid, response);
      return;
    default:
  }
}

function handleUserMessage(sender_psid, received_message) {
  let response;

  switch (received_message.toLowerCase().replace(/\s/gm, "")) {
    case "hi":
      response = {
        text: "Hello, Can i help you ?",
      };
      callSendAPI(sender_psid, response);
      return;
    case "hello":
      response = {
        text: "Hello, I hope you have a nice day . Can i help you ?",
      };
      callSendAPI(sender_psid, response);
      return;
    case "getcoupon":
      response = {
        text: `Hi, i give you coupon with a great shopping experience. Your coupon is ${randomNumber(6)}`,
      };
      callSendAPI(sender_psid, response);
      return;
    case "gioithieushop":
      response = {
        text:
          "Chào mừng bạn đã đến với shop. Shopsale là 1 shop giày thể thao cung cấp hàng chất lượng và giá cả sinh viên",
      };
      callSendAPI(sender_psid, response);
      return;
    case "exit":
      Mess.findOneAndRemove(
        {
          userId: sender_psid,
        },
        function (err) {
          if (err) return console.log(err);
          callSendAPI(sender_psid, {
            text: "đã exit",
          });
        }
      );
      return;
    case "get_started":
      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Welcome to shopsale. Please choose option you want to support",
            buttons: [
              {
                type: "postback",
                title: "Introduction shop ",
                payload: "gioithieushop",
              },
              {
                type: "postback",
                title: "Get coupon ",
                payload: "getcoupon",
              },
              {
                type: "web_url",
                title: "Visit shop",
                url: "http://ecommerce-v1.vercel.app/",
                webview_height_ratio: "full",
              },
            ],
          },
        },
      };
      callSendAPI(sender_psid, response);
      return;
    default:
      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Please choose option you want to support. Hope you have  a nice day .",
            buttons: [
              {
                type: "postback",
                title: "Introduction shop ",
                payload: "gioithieushop",
              },
              {
                type: "postback",
                title: "Get coupon ",
                payload: "getcoupon",
              },
              {
                type: "web_url",
                title: "Visit shop",
                url: "http://ecommerce-v1.vercel.app/",
                webview_height_ratio: "full",
              },
            ],
          },
        },
      };

      callSendAPI(sender_psid, response);
      return;
  }
}
// Start event login

function handleLogin(sender_psid) {
  response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Vui lòng nhấn button để đăng nhập",
        buttons: [
          {
            type: "postback",
            title: "login",
            payload: "login",
          },
        ],
      },
    },
  };
  callSendAPI(sender_psid, response);
  return;
}

/**
 * This is function to recive handle postback from facebook
 * @param {mess user } sender_psid
 * @param {...} received_postback
 */
function handlePostback(sender_psid, received_postback) {
  //do something
  let response;
  let payload = received_postback.payload;
  if (payload === "login") {
    response = {
      text: "Vui lòng nhập số điện thoại",
    };
    callSendAPI(sender_psid, response);
    Mess.findOne(
      {
        userId: sender_psid,
      },
      function (err, mess) {
        if (mess) {
          mess.loop = 1;
          mess.save(function (err) {
            if (err) return console.log(err);
          });
        }
      }
    );
    return;
  } else if (payload === "no") {
    // response = {
    //   'text': ' ...'
    // }
  }
}

/**
 * This is function to Send text message
 * @param {mess user for recive mess} sender_psid
 * @param {object message include text } response
 */

async function callSendAPI(
  sender_psid,
  response = {
    text: "Đây là tin nhắn mặc định",
  }
) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
      },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log("err", err);
      if (!err) {
        console.log("Mess đã được gửi!");
      } else {
        console.error("Không thể gửi mess:" + err);
      }
    }
  );
}

/**
 *
 * @param {key for select year or day} chart
 * @param {mess user for send} sender_psid
 */

async function sendChart(chart, sender_psid) {
  let response, htmlString;

  // if (chart == "year") {
  //   htmlString = await getTemplateForYear();
  // } else htmlString = await getTemplateForDay();

  // // create img with puppeteer library and send chart

  // (async () => {
  //   const browser = await puppeteer.launch({
  //     args: ["--no-sandbox"],
  //   });
  //   const page = await browser.newPage();
  //   await page.setContent(htmlString);
  //   await page.screenshot({
  //     path: "public/images/" + chart + ".png",
  //   });
  //   await browser.close();

  //   response = {
  //     attachment: {
  //       type: "image",
  //       payload: {
  //         url: "https://c465f9cd.ngrok.io/images/" + chart + ".png",
  //         is_reusable: true,
  //       },
  //     },
  //   };

  //   callSendAPI(sender_psid, response);
  //   // console.log('ben trong')
  //   return;
  // })();
  const dataImage = await getDataForChart();
  response = {
    attachment: {
      type: "image",
      payload: {
        url: dataImage,
        is_reusable: true,
      },
    },
  };
  callSendAPI(sender_psid, response);
  return;
}

async function getDataForChart() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let arr = [];
  let arr2 = [];

  try {
    // only support from 8h to 18h
    for (let i = 8; i <= 18; i++) {
      let sum1 = 0,
        sum2 = 0;
      await Order.find(function (err, orders) {
        orders.forEach((v, j) => {
          if (v.updatedAt.getMonth() == month) {
            if (v.updatedAt.getDate() == day && v.updatedAt.getHours() == i) sum1 += v.totalPrice;

            // not check day = 1 return day = 31 || 30 prev month
            if (v.updatedAt.getDate() == day - 1 && v.updatedAt.getHours() == i) sum2 += v.totalPrice;
          }
        });
      });
      arr.push(sum1);
      arr2.push(sum2);
    }
  } catch (err) {
    console.log(err);
  }

  const templateChart = `{type:%27line%27,data:{labels:[8,9,10,11,12,13,14,15,16,17,18],datasets:[{data:[${arr}],label:"hômnay",fill:false,borderColor:%27blue%27},{data:[${arr2}],label:"hômqua",fill:false,borderColor:%27yellow%27},]}}`;

  // TODO minify strim

  // const templateChart = `{
  //   type: "line",
  //   data: {
  //     labels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  //     datasets: [
  //       { data: ${arr}, label: "Ngàyhômnay", fill: false, borderColor: "blue" },
  //       {
  //         data: ${arr2},
  //         label: "Ngàyhômqua",
  //         fill: false,
  //         borderColor: "yellow",
  //       },
  //     ],
  //   },
  // }`;

  return `https://quickchart.io/chart?bkg=white&c=${templateChart}`;
}
/**
 * Exports module
 */

module.exports = {
  handleMessage: handleMessage,
  handleUserMessage: handleUserMessage,
  handleLoopMessage: handleLoopMessage,
  handlePostback: handlePostback,
  sendChart: sendChart,
  callSendAPI: callSendAPI,
  handleLogin: handleLogin,
};
