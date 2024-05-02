class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          "address.city": this.queryStr.keyword,
        }
      : {};
    this.query = this.query.find(keyword);
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);

    //Removing some fields for category

    const removeFields = ["keyword", "page", "limit",'sort_option', 'posted'];
    //filter for ptice and Rating
    if (queryCopy.sort_option) {
      if (queryCopy.sort_option === "name") {
        this.query = this.query.find().sort({ [queryCopy.sort_option]: "asc" });
      } else if (queryCopy.sort_option === "low_to_high") {
        this.query = this.query.find().sort({ price: "asc" });
      } else if (queryCopy.sort_option === "high_to_low") {
        this.query = this.query.find().sort({ price: "desc" });
      } else {
        this.query = this.query.find();
      }
	}
	  if (queryCopy.posted) {
		  this.query = this.query.find().populate({
			  path: 'user',
			  match: { role: queryCopy.posted },
			  select: "role _id"
		  })
	  }
    removeFields.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //50 -10

    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
