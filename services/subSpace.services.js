const axios = require("axios");
const _ = require("lodash");

const getReqData = async () => {
  const url = process.env.URL;
  const adminSecret = process.env.ADMIN_SECRET;

  const config = {
    headers: {
      "x-hasura-admin-secret": adminSecret,
    },
  };
  try {
    const response = await axios.get(url, config);
    const data = await response.data;
    return data;
    // const dataAnalysis = await doAnalysis(data);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getCurl = async (req, res) => {
  try {
    const data = await getReqData();
    const dataAnalysis = await doAnalysis(data);
    // console.log(dataAnalysis)
    res.json({
      "Total number of blogs.": dataAnalysis.totalBlogs,
      "The title of the longest blog.": dataAnalysis.longestTitleBlog,
      'Number of blogs with "privacy" in the title.':
        dataAnalysis.numberOfBlogsWithPrivacy,
      "unique blog titles.": dataAnalysis.uniqueTitles,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const doAnalysis = async (data) => {
  // console.log(data)
  try {
    let d = data.blogs;
    // Check the structure of data
    const totalBlogs = d.length;
    const longestTitleBlog = _.maxBy(d, "title.length");
    const blogsPrivacy = _.filter(d, (blog) =>
      blog.title?.toLowerCase().includes("privacy")
    );
    const uniqueTitles = _.uniq(_.map(d, "title"));

    return {
      totalBlogs,
      longestTitleBlog,
      numberOfBlogsWithPrivacy: blogsPrivacy.length,
      uniqueTitles,
    };
  } catch (error) {
    return error.message;
  }
};

const searching = async (req, res) => {
  try {
    const { query } = req.query;
    // console.log(query)
    const callApi = await getReqData();
    const data = callApi.blogs;

    // console.log(data)
    const newData = data.filter((blog) =>
      new RegExp(query, "i").test(blog.title)
    );
// changes
    res.json({data : newData});
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getCurl, searching };
