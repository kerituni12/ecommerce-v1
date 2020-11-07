const Mailchimp = require("mailchimp-api-v3");
const { mailchimpConfigs } = require("@configs/constants");
const mailchimp = new Mailchimp(mailchimpConfigs.apiKey);

//Callback style
exports.getListAudience = async (req, res, next) => {
  try {
    const data = await mailchimp.get({
      path: `/lists/${mailchimpConfigs.listsId}/members?fields=members.email_address,members.merge_fields,members.status`,
    });
    if (data) console.log(data);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
