const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");


class Complain{
    #id;
    #title;
    #content;
    #topic;
    #solution;
    #idUser;
    #idAdmin;

    constructor(topic,title,content,solution){
        this.#topic = topic
        this.#title = title
        this.#content = content
        this.#solution = solution
    }

    createComplain(){

    }

}